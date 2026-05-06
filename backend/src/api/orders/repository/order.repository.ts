import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '../interface/order.repository.interface';
import {
  NewOrderAddressEntity,
  NewOrderCouponAppliedEntity,
  NewOrderEntity,
  NewOrderProductEntity,
  OrderInfoEntity,
  OrderListEntity,
  OrderPublicListEntity,
} from '../entity/order.entity';
import { DatabaseService } from 'src/database/database.service';
import {
  order,
  order_address,
  order_coupon_applied,
  order_product,
  order_razorpay_payment,
} from 'src/database/schema';
import {
  and,
  countDistinct,
  desc,
  eq,
  gte,
  like,
  lte,
  not,
  or,
  SQL,
  sql,
} from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { OrderFilterDto } from '../schema/order-filter.schema';
import { OrderUpdateStatusDto } from '../schema/order-update-status.schema';
import { OrderCancelDto } from '../schema/order-cancel.schema';
import { AppConfigType } from 'src/config/schema';
import { OrderPaginatedSelect } from '../entity/order-paginated.entity';
import { OrderPublicPaginatedSelect } from '../entity/order-public-paginated.entity';
import { OrderInfoSelect } from '../entity/order-info.entity';
import { CartQueryEntityType } from 'src/api/carts/entity/cart.entity';
import { HelperUtil } from 'src/utils/helper.util';
import { order_invoice } from 'src/database/schema/order_invoice.schema';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService<AppConfigType>,
  ) { }

  private getOrderPaginatedQuery() {
    return this.databaseClient.db
      .select(
        OrderPaginatedSelect(
          `${this.configService.get('APP_URL')}/uploads/`,
        ),
      )
      .from(order)
      .orderBy(desc(order.createdAt));
  }

  private getPublicOrderPaginatedQuery() {
    return this.databaseClient.db
      .select(
        OrderPublicPaginatedSelect(),
      )
      .from(order)
      .orderBy(desc(order.createdAt));
  }

  private getOrderPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(order.id) })
      .from(order);
  }

  private getOrderInfoQuery() {
    return this.databaseClient.db
      .select(
        OrderInfoSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(order)
      .limit(1);
  }

  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderInfoEntity | null> {
    const result = await this.getOrderInfoQuery().where(eq(order.id, id))
      .$withCache(cacheConfig) as unknown as OrderInfoEntity[];
    if (!result.length) return null;
    return result[0];
  }

  async getByIdAndUserId(id: string, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderInfoEntity | null> {
    const result = await this.getOrderInfoQuery().where(and(eq(order.id, id), eq(order.user_id, userId)))
      .$withCache(cacheConfig) as unknown as OrderInfoEntity[];
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = "", status?: string, payment_status?: string, from_date?: Date, to_date?: Date): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(order.id, `%${search}%`));
      searchFilters.push(like(order.orderId, `%${search}%`));
      searchFilters.push(like(order.total_price, `%${search}%`));
      searchFilters.push(like(order.sub_total_discounted_price, `%${search}%`));
      searchFilters.push(like(order.cancellation_reason, `%${search}%`));
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM users u
          WHERE u.id = ${order.user_id}
            AND (
              u.name LIKE ${`%${search}%`}
              OR u.email LIKE ${`%${search}%`}
              OR u.phone LIKE ${`%${search}%`}
            )
        )
      `);
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_razorpay_payment r
          WHERE r.order_id = ${order.id}
            AND (
              r.razorpay_order_id LIKE ${`%${search}%`}
              OR r.razorpay_payment_id LIKE ${`%${search}%`}
              OR r.status LIKE ${`%${search}%`}
            )
        )
      `);
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_product op
          WHERE op.order_id = ${order.id}
            AND (
              op.product_title LIKE ${`%${search}%`}
              OR op.product_slug LIKE ${`%${search}%`}
              OR op.product_sku LIKE ${`%${search}%`}
              OR op.product_hsn LIKE ${`%${search}%`}
              OR op.product_price LIKE ${`%${search}%`}
              OR op.product_discounted_price LIKE ${`%${search}%`}
              OR op.quantity LIKE ${`%${search}%`}
            )
        )
      `);
    }
    if (from_date) {
      filters.push(gte(order.createdAt, new Date(from_date)));
    }
    if (to_date) {
      filters.push(lte(order.createdAt, new Date(to_date)));
    }
    if (status !== undefined) {
      filters.push(eq(order.status, status));
    }
    if (payment_status !== undefined) {
      filters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_razorpay_payment r
          WHERE r.order_id = ${order.id}
            AND r.status = ${payment_status}
        )
      `);
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(
    query: PaginationQuery<OrderFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<OrderListEntity[]> {
    const { limit, offset, search, status, payment_status, from_date, to_date } = query;
    const filters = await this.filters(search, status, payment_status, from_date, to_date);
    const result = await this.getOrderPaginatedQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async getAllByUserId(userId: string, query: PaginationQuery<OrderFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderPublicListEntity[]> {
    const { limit, offset, search, status, payment_status, from_date, to_date } = query;
    const filters = await this.filters(search, status, payment_status, from_date, to_date);
    const result = await this.getPublicOrderPaginatedQuery()
      .where(and(eq(order.user_id, userId), filters))
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    query: CountQuery<OrderFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status, payment_status, from_date, to_date } = query;
    const filters = await this.filters(search, status, payment_status, from_date, to_date);
    const result = await this.getOrderPaginatedCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async countByUserId(userId: string, query: CountQuery<OrderFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, status, payment_status, from_date, to_date } = query;
    const filters = await this.filters(search, status, payment_status, from_date, to_date);
    const result = await this.getOrderPaginatedCountQuery()
      .where(and(eq(order.user_id, userId), filters))
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async cancelOrder(id: string, userId: string, dto: OrderCancelDto): Promise<OrderInfoEntity | null> {
    await this.databaseClient.db
      .update(order)
      .set({
        status: "Cancelled By user",
        cancellation_reason: dto.cancellation_reason,
      })
      .where(and(eq(order.id, id), eq(order.user_id, userId)));
    return await this.getById(id);
  }

  async updateOrderStatus(
    id: string,
    data: OrderUpdateStatusDto,
  ): Promise<OrderInfoEntity | null> {
    await this.databaseClient.db
      .update(order)
      .set({
        status: data.status,
        cancellation_reason: data.cancellation_reason ? data.cancellation_reason : null,
        is_delivered: data.status === 'Delivered' ? true : false,
        delivered_at: data.status === 'Delivered' ? new Date() : null,
      })
      .where(eq(order.id, id));
    return await this.getById(id);
  }

  async generateInvoiceNo(): Promise<string> {
    const now = new Date();
    const fy = HelperUtil.getFinancialYear(now);

    const existing = await this.databaseClient.db
      .select({ current_value: order_invoice.current_value })
      .from(order_invoice)
      .where(eq(order_invoice.financial_year, fy))
      .for("update");

    let next = 1;

    if (existing.length === 0) {
      await this.databaseClient.db.insert(order_invoice).values({
        financial_year: fy,
        current_value: 1,
      });
    } else {
      next = existing[0].current_value + 1;

      await this.databaseClient.db
        .update(order_invoice)
        .set({ current_value: next })
        .where(eq(order_invoice.financial_year, fy));
    }

    const formattedDate = `${now.getFullYear()}${(
      "0" + (now.getMonth() + 1)
    ).slice(-2)}${("0" + now.getDate()).slice(-2)}`;

    return `INV-${formattedDate}-${next.toString().padStart(3, "0")}`;
  }

  async placeOrder(userId: string, cart: CartQueryEntityType, order_note?: string): Promise<OrderInfoEntity | null> {
    const result = await this.databaseClient.db.transaction(async (tx) => {
      const data: NewOrderEntity = {
        user_id: userId,
        status: "Order Created",
        is_igst_applicable: cart.address && cart.address.pincode_info ? cart.address.pincode_info.is_igst_applicable : false,
        shipping_charges: cart.shipping_charges,
        sub_total: cart.sub_total,
        sub_total_discounted_price: cart.sub_total_discounted_price,
        discount: cart.discount,
        total_price: cart.total_price,
        is_paid: false,
        is_delivered: false,
        order_note: order_note ?? null,
      }
      const [result] = await tx.insert(order).values(data).$returningId();
      if (cart.coupon) {
        const orderCouponAppliedData: NewOrderCouponAppliedEntity = {
          order_id: result.id,
          coupon_code: cart.coupon.code,
          discount_percentage: cart.coupon.discount_percentage,
        }
        await tx.insert(order_coupon_applied).values(orderCouponAppliedData);
      }
      if (cart.address) {
        const orderAddressData: NewOrderAddressEntity = {
          order_id: result.id,
          postal_code: cart.address.postal_code,
          address: cart.address.address,
          address_2: cart.address.address_2,
          shipping_note: cart.address.shipping_note,
          city: cart.address.city,
          state: cart.address.state,
          phone_number: cart.address.phone_number,
          first_name: cart.address.first_name,
          last_name: cart.address.last_name,
          country: cart.address.country,
          company_name: cart.address.company_name,
          alternate_phone: cart.address.alternate_phone,
        }
        await tx.insert(order_address).values(orderAddressData);
      }
      const orderProductsData: NewOrderProductEntity[] = cart.products.map((item) => ({
        order_id: result.id,
        product_id: item.product.id,
        product_title: item.product.title,
        product_slug: item.product.slug,
        product_sku: item.product.sku ?? "",
        product_hsn: item.product.hsn ?? "",
        product_image: item.product.thumbnail ?? "",
        product_price: item.product.price,
        product_discounted_price: item.product.discounted_price ?? 0,
        product_tax: item.product.tax ?? 0,
        color_name: item.color?.name ?? null,
        color_code: item.color?.code ?? null,
        color_id: item.color?.id ?? null,
        quantity: item.quantity,
      }));
      await tx.insert(order_product).values(orderProductsData);

      return result;
    });
    return await this.getById(result.id);
  }

  async createRazorpayPayment(order_id: string, razorpay_order_id: string): Promise<void> {
    await this.databaseClient.db
      .insert(order_razorpay_payment)
      .values({
        order_id,
        razorpay_order_id,
        status: "Pending Payment",
      });
  }

  async markPaymentPaid(order_id: string, razorpay_payment_id: string, razorpay_signature: string, payment_data: string): Promise<void> {
    await this.databaseClient.db.transaction(async (tx) => {
      const invoiceNo = await this.generateInvoiceNo();
      await tx.update(order)
        .set({
          status: 'Order Placed',
          is_paid: true,
          paid_at: new Date(),
          invoice_no: invoiceNo,
        })
        .where(eq(order.id, order_id));
      await tx.update(order_razorpay_payment)
        .set({
          razorpay_payment_id,
          razorpay_payment_signature: razorpay_signature,
          payment_data,
          status: "Success",
        })
        .where(eq(order_razorpay_payment.order_id, order_id));
    });
  }

  async markPaymentFailed(order_id: string): Promise<void> {
    await this.databaseClient.db.transaction(async (tx) => {
      await tx.update(order)
        .set({
          status: "Payment Failed",
        })
        .where(eq(order.id, order_id));
      await tx.update(order_razorpay_payment)
        .set({
          status: "Failed",
        })
        .where(eq(order_razorpay_payment.order_id, order_id));
    });
  }

  async markPaymentCancelled(order_id: string): Promise<void> {
    await this.databaseClient.db.transaction(async (tx) => {
      await tx.update(order)
        .set({
          status: 'Payment Failed',
        })
        .where(eq(order.id, order_id));
      await tx.update(order_razorpay_payment)
        .set({
          status: "Cancelled",
        })
        .where(eq(order_razorpay_payment.order_id, order_id));
    });
  }
}
