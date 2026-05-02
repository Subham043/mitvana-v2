import { OrderInfoEntity, OrderListEntity, OrderPublicListEntity } from "../entity/order.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { OrderFilterDto } from "../schema/order-filter.schema";
import { OrderUpdateStatusDto } from "../schema/order-update-status.schema";
import { PassThrough } from "stream";
import { OrderCancelDto } from "../schema/order-cancel.schema";
import { PlaceOrderDto } from "../schema/place-order.schema";
import { VerifyOrderDto } from "../schema/verify-order.schema";
import { PaymentFailedOrderDto } from "../schema/payment-failed-order.schema";
import { PaymentCancelledOrderDto } from "../schema/payment-cancelled-order.schema";

export interface OrderServiceInterface {
    getAll(query: OrderFilterDto): Promise<PaginationResponse<OrderListEntity, OrderFilterDto>>;
    getAllByUserId(userId: string, query: OrderFilterDto): Promise<PaginationResponse<OrderPublicListEntity, OrderFilterDto>>;
    getById(id: string): Promise<OrderInfoEntity>;
    getByIdAndUserId(id: string, userId: string): Promise<OrderInfoEntity>;
    updateOrderStatus(id: string, orderStatus: OrderUpdateStatusDto): Promise<OrderInfoEntity>;
    cancelOrder(id: string, userId: string, dto: OrderCancelDto): Promise<OrderInfoEntity>;
    placeOrder(userId: string, dto: PlaceOrderDto): Promise<{ amount: number | string, key: string, razorpay_order_id: string, currency: string, receipt?: string, order_id: string }>;
    verifyPayment(dto: VerifyOrderDto): Promise<{ is_paid: boolean, order_id: string }>;
    paymentFailedOrder(dto: PaymentFailedOrderDto): Promise<{ is_paid: boolean, order_id: string }>;
    paymentCancelledOrder(dto: PaymentCancelledOrderDto): Promise<{ is_paid: boolean, order_id: string }>;
    exportOrders(query: OrderFilterDto): Promise<PassThrough>;
}