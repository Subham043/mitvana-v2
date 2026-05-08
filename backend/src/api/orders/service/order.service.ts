import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderServiceInterface } from '../interface/order.service.interface';
import { OrderRepositoryInterface } from '../interface/order.repository.interface';
import { ORDER_CACHE_KEY, ORDER_CANCELLED_BY_USER_EVENT_LABEL, ORDER_PLACED_EVENT_LABEL, ORDER_REPOSITORY, ORDER_STATUS_UPDATED_EVENT_LABEL } from '../order.constant';
import { OrderInfoEntity, OrderListEntity, OrderPublicListEntity } from '../entity/order.entity';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { OrderFilterDto } from '../schema/order-filter.schema';
import { OrderUpdateStatusDto } from '../schema/order-update-status.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { OrderCancelDto } from '../schema/order-cancel.schema';
import { PlaceOrderDto } from '../schema/place-order.schema';
import { CartRepositoryInterface } from 'src/api/carts/interface/cart.repository.interface';
import { CART_CACHE_KEY, CART_REPOSITORY } from 'src/api/carts/cart.constants';
import { PAYMENT_CACHE_KEY, PAYMENT_SERVICE } from 'src/api/payments/payment.constant';
import { PaymentServiceInterface } from 'src/api/payments/interface/payment.service.interface';
import { VerifyOrderDto } from '../schema/verify-order.schema';
import { PaymentFailedOrderDto } from '../schema/payment-failed-order.schema';
import { ADDRESS_REPOSITORY } from 'src/api/address/address.constants';
import { AddressRepositoryInterface } from 'src/api/address/interface/address.repository.interface';
import { PaymentCancelledOrderDto } from '../schema/payment-cancelled-order.schema';
import { PRODUCT_CACHE_KEY, PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderPlacedEvent } from '../events/order-placed';
import { OrderStatusUpdatedEvent } from '../events/order-status-updated';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';
import { CouponCodeRepositoryInterface } from 'src/api/coupon_codes/interface/coupon_code.repository.interface';
import { COUPON_CODE_REPOSITORY } from 'src/api/coupon_codes/coupon_code.constants';
import { OrderCancelledByUserEvent } from '../events/order-cancelled-by-user';

@Injectable()
export class OrderService implements OrderServiceInterface {

  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepositoryInterface,
    @Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryInterface,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: PaymentServiceInterface,
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    @Inject(COUPON_CODE_REPOSITORY) private readonly couponCodeRepository: CouponCodeRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
    private readonly cacheService: CacheService,
  ) { }

  async getAll(query: OrderFilterDto): Promise<PaginationResponse<OrderListEntity, OrderFilterDto>> {
    const { page, limit, offset, search, status, payment_status, from_date, to_date } = normalizePagination<OrderFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(ORDER_CACHE_KEY, { page, limit, offset, search, status, payment_status, from_date, to_date });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const orders = await this.orderRepository.getAll({ page, limit, offset, search, status, payment_status, from_date, to_date }, { autoInvalidate: true });
        const count = await this.orderRepository.count({ search, status, payment_status, from_date, to_date }, { autoInvalidate: true });

        return { data: orders, meta: { page, limit, total: count, search, status, payment_status, from_date, to_date } };

      },
      options: {
        tags: [ORDER_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAllByUserId(userId: string, query: OrderFilterDto): Promise<PaginationResponse<OrderPublicListEntity, OrderFilterDto>> {
    const { page, limit, offset, search, status, payment_status, from_date, to_date } = normalizePagination<OrderFilterDto>(query);

    const cacheKey = HelperUtil.generateCacheKey(ORDER_CACHE_KEY + `:all:u_${userId}`, { page, limit, offset, search, status, payment_status, from_date, to_date, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const orders = await this.orderRepository.getAllByUserId(userId, { page, limit, offset, search, status, payment_status, from_date, to_date }, { autoInvalidate: true });
        const count = await this.orderRepository.countByUserId(userId, { search, status, payment_status, from_date, to_date }, { autoInvalidate: true });

        return { data: orders, meta: { page, limit, total: count, search, status, payment_status, from_date, to_date } };

      },
      options: {
        tags: [ORDER_CACHE_KEY, ORDER_CACHE_KEY + `:u_${userId}`, cacheKey],
      },
    });
  }

  async getById(id: string): Promise<OrderInfoEntity> {
    const cacheKey = HelperUtil.generateCacheKey(ORDER_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const order = await this.orderRepository.getById(id, { autoInvalidate: true });

        if (!order) throw new NotFoundException("Order not found");

        return order;

      },
      options: {
        tags: [ORDER_CACHE_KEY, cacheKey],
      },
    });
  }

  async getByIdAndUserId(id: string, userId: string): Promise<OrderInfoEntity> {
    const cacheKey = HelperUtil.generateCacheKey(ORDER_CACHE_KEY + `:id:u_${userId}`, { id, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const order = await this.orderRepository.getByIdAndUserId(id, userId, { autoInvalidate: true });

        if (!order) throw new NotFoundException("Order not found");

        return order;

      },
      options: {
        tags: [ORDER_CACHE_KEY, ORDER_CACHE_KEY + `:id:u_${userId}`, cacheKey],
      },
    });
  }

  async updateOrderStatus(id: string, data: OrderUpdateStatusDto): Promise<OrderInfoEntity> {
    const orderById = await this.orderRepository.getById(id);

    if (!orderById) throw new NotFoundException("Order not found");

    const updatedOrder = await this.orderRepository.updateOrderStatus(id, data);

    if (!updatedOrder) throw new InternalServerErrorException('Failed to update order');

    this.eventEmitter.emit(ORDER_STATUS_UPDATED_EVENT_LABEL, new OrderStatusUpdatedEvent(updatedOrder));

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    return updatedOrder;
  }

  async cancelOrder(id: string, userId: string, dto: OrderCancelDto): Promise<OrderInfoEntity> {
    const orderById = await this.orderRepository.getByIdAndUserId(id, userId);

    if (!orderById) throw new NotFoundException("Order not found");

    if (orderById.status === 'Payment Failed' || orderById.status === 'Cancelled by Admin' || orderById.status === 'Cancelled By user' || orderById.status === 'Refunded' || orderById.status === 'Failed' || orderById.status === 'Delivered' || orderById.status === 'Dispatched') throw new BadRequestException("Order is already cancelled or failed");

    const updatedOrder = await this.orderRepository.cancelOrder(id, userId, dto);

    if (!updatedOrder) throw new InternalServerErrorException('Failed to cancel order');

    this.eventEmitter.emit(ORDER_STATUS_UPDATED_EVENT_LABEL, new OrderStatusUpdatedEvent(updatedOrder));

    this.eventEmitter.emit(ORDER_CANCELLED_BY_USER_EVENT_LABEL, new OrderCancelledByUserEvent(updatedOrder));

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    return updatedOrder;
  }

  async placeOrder(userId: string, dto: PlaceOrderDto): Promise<{ amount: number | string, key: string, razorpay_order_id: string, currency: string, receipt?: string, order_id: string }> {
    const address = await this.addressRepository.getByIdAndUserId(dto.address_id, userId);

    if (!address) throw new BadRequestException("Address not found");

    if (address.id !== dto.address_id) throw new BadRequestException("Invalid Address");

    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart) throw new NotFoundException("Cart not found");

    if (cart.products.length === 0) throw new BadRequestException("Cart is empty");

    const productsInStock = await this.productRepository.checkIdsStockExists(cart.products.map((p) => ({
      id: p.product.id,
      quantity: p.quantity,
    })));

    if (productsInStock.some(p => !p.in_stock)) throw new BadRequestException("Some products are out of stock");

    if (dto.coupon_code) {
      const coupon = await this.couponCodeRepository.getByCode(dto.coupon_code);
      if (!coupon) throw new BadRequestException(`Coupon ${dto.coupon_code} not found!`);
      if (coupon.is_draft) throw new BadRequestException(`Coupon ${dto.coupon_code} is not active!`);
      if (coupon.times_redeemed >= coupon.maximum_redemptions) throw new BadRequestException(`Coupon ${dto.coupon_code} is used up!`);
      if (new Date(coupon.expiration_date) < new Date()) throw new BadRequestException(`Coupon ${dto.coupon_code} is expired!`);
      if (coupon.min_cart_value > cart.sub_total) throw new BadRequestException(`Minimum cart value should be ${coupon.min_cart_value}!`);
    }


    const order = await this.orderRepository.placeOrder(userId, cart, dto.order_note);

    if (!order) throw new InternalServerErrorException('Failed to place order');

    if (order.is_paid || order.razorpay_payment !== null) throw new BadRequestException("Payment already exists for this order");

    const razorpayOrder = await this.paymentService.generateRazorpayOrder(order.id, order.total_price);

    if (!razorpayOrder) throw new InternalServerErrorException('Failed to generate razorpay order');

    await this.orderRepository.createRazorpayPayment(order.id, razorpayOrder.id);

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    await this.cacheService.invalidateTag(PAYMENT_CACHE_KEY);

    return {
      amount: razorpayOrder.amount,
      key: razorpayOrder.key,
      razorpay_order_id: razorpayOrder.id,
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      order_id: order.id,
    };
  }

  async verifyPayment(dto: VerifyOrderDto): Promise<{ is_paid: boolean, order_id: string }> {
    const order = await this.orderRepository.getById(dto.order_id);

    if (!order) throw new NotFoundException("Order not found");

    if (order.is_paid || (order.razorpay_payment && order.razorpay_payment.status !== 'Pending Payment')) throw new BadRequestException("Payment already exists for this order");

    if (order.razorpay_payment && dto.razorpay_order_id !== order.razorpay_payment.razorpay_order_id) throw new BadRequestException("Invalid payment ");

    const verified = await this.paymentService.verifyRazorpayPayment(dto);

    if (!verified) throw new BadRequestException("Payment verification failed");

    const paymentDataInfo = await this.paymentService.getRazorpayPaymentInfo({ razorpay_payment_id: dto.razorpay_payment_id });

    if (!paymentDataInfo) throw new BadRequestException("Payment data not found");

    if (paymentDataInfo.status !== 'captured') throw new BadRequestException("Payment is not captured");

    if (Number(paymentDataInfo.amount) !== Math.round(order.total_price * 100)) throw new BadRequestException("Payment amount does not match");

    await this.orderRepository.markPaymentPaid(order.id, dto.razorpay_payment_id, dto.razorpay_signature, JSON.stringify(paymentDataInfo));

    await this.productRepository.bulkDeductProductStock(order.order_items.map((product) => ({
      id: product.product_id,
      quantity: product.quantity,
    })));

    await this.cartRepository.clearCart(order.user_id);

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    await this.cacheService.invalidateTag(PAYMENT_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    const updatedOrder = await this.orderRepository.getById(dto.order_id);

    if (!updatedOrder) throw new NotFoundException("Order not found");

    this.eventEmitter.emit(ORDER_PLACED_EVENT_LABEL, new OrderPlacedEvent(updatedOrder));

    return { is_paid: true, order_id: dto.order_id }
  }

  async paymentFailedOrder(dto: PaymentFailedOrderDto): Promise<{ is_paid: boolean, order_id: string }> {
    const order = await this.orderRepository.getById(dto.order_id);

    if (!order) throw new NotFoundException("Order not found");

    if (order.is_paid || (order.razorpay_payment && order.razorpay_payment.status !== 'Pending Payment')) throw new BadRequestException("Payment already exists for this order");

    if (order.razorpay_payment && dto.razorpay_order_id !== order.razorpay_payment.razorpay_order_id) throw new BadRequestException("Invalid payment ");

    await this.orderRepository.markPaymentFailed(order.id);

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    await this.cacheService.invalidateTag(PAYMENT_CACHE_KEY);

    const updatedOrder = await this.orderRepository.getById(dto.order_id);

    if (!updatedOrder) throw new NotFoundException("Order not found");

    this.eventEmitter.emit(ORDER_STATUS_UPDATED_EVENT_LABEL, new OrderStatusUpdatedEvent(updatedOrder))

    return { is_paid: false, order_id: dto.order_id }
  }

  async paymentCancelledOrder(dto: PaymentCancelledOrderDto): Promise<{ is_paid: boolean, order_id: string }> {
    const order = await this.orderRepository.getById(dto.order_id);

    if (!order) throw new NotFoundException("Order not found");

    if (order.is_paid || (order.razorpay_payment && order.razorpay_payment.status !== 'Pending Payment')) throw new BadRequestException("Payment already exists for this order");

    if (order.razorpay_payment && dto.razorpay_order_id !== order.razorpay_payment.razorpay_order_id) throw new BadRequestException("Invalid payment ");

    await this.orderRepository.markPaymentCancelled(order.id);

    await this.cacheService.invalidateTag(ORDER_CACHE_KEY);

    await this.cacheService.invalidateTag(PAYMENT_CACHE_KEY);

    const updatedOrder = await this.orderRepository.getById(dto.order_id);

    if (!updatedOrder) throw new NotFoundException("Order not found");

    this.eventEmitter.emit(ORDER_STATUS_UPDATED_EVENT_LABEL, new OrderStatusUpdatedEvent(updatedOrder))

    return { is_paid: false, order_id: dto.order_id }
  }

  async exportOrders(query: OrderFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Orders',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Order Id', key: 'order_id', width: 30 },
        { header: 'Invoice Number', key: 'invoice_no', width: 30 },
        { header: 'Products', key: 'products', width: 30 },
        { header: 'Sub Total', key: 'sub_total', width: 30 },
        { header: 'Discount', key: 'discount', width: 30 },
        { header: 'Sub Total Discounted', key: 'sub_total_discounted', width: 30 },
        { header: 'Shipping Charges', key: 'shipping_charges', width: 30 },
        { header: 'Total Price', key: 'total_price', width: 30 },
        { header: 'Is IGST Applicable', key: 'is_igst_applicable', width: 30 },
        { header: 'Status', key: 'status', width: 30 },
        { header: 'Cancellation Reason', key: 'cancellation_reason', width: 30 },
        { header: 'Payment Method', key: 'payment_method', width: 30 },
        { header: 'Paid At', key: 'paid_at', width: 30 },
        { header: 'Is Delivered', key: 'is_delivered', width: 10 },
        { header: 'Delivered At', key: 'delivered_at', width: 10 },
        { header: 'User ID', key: 'user_id', width: 20 },
        { header: 'User Name', key: 'name', width: 20 },
        { header: 'User Email', key: 'email', width: 20 },
        { header: 'Payment Status', key: 'razorpay_status', width: 20 },
        { header: 'Razorpay Order ID', key: 'razorpay_order_id', width: 20 },
        { header: 'Razorpay Payment ID', key: 'razorpay_payment_id', width: 20 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.orderRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          status: query.status,
          payment_status: query.payment_status,
        })
      },

      mapRow: (order) => ({
        id: order.id,
        orderId: order.orderId,
        invoice_no: order.invoice_no,
        status: order.status,
        shipping_charges: order.shipping_charges,
        is_igst_applicable: order.is_igst_applicable,
        sub_total: order.sub_total,
        discount: order.discount,
        sub_total_discounted: order.sub_total_discounted_price,
        total_price: order.total_price,
        cancellation_reason: order.cancellation_reason,
        payment_method: order.payment_method,
        is_paid: order.is_paid,
        paid_at: order.paid_at,
        is_delivered: order.is_delivered,
        delivered_at: order.delivered_at,
        user_id: order.user_id,
        name: order.user ? order.user.name : "",
        email: order.user ? order.user.email : "",
        razorpay_status: order.razorpay_payment ? order.razorpay_payment.status : "",
        razorpay_order_id: order.razorpay_payment ? order.razorpay_payment.razorpay_order_id : "",
        razorpay_payment_id: order.razorpay_payment ? order.razorpay_payment.razorpay_payment_id : "",
        products: order.order_items.map(item => item.product_title).join(", "),
        createdAt: order.createdAt?.toISOString(),
        updatedAt: order.updatedAt?.toISOString(),
      }),
    })
  }
}
