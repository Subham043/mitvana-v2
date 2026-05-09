import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { OrderInfoEntity, OrderListEntity, OrderPublicListEntity } from "../entity/order.entity";
import { OrderFilterDto } from "../schema/order-filter.schema";
import { OrderUpdateStatusDto } from "../schema/order-update-status.schema";
import { OrderCancelDto } from "../schema/order-cancel.schema";
import { CartQueryEntityType } from "src/api/carts/entity/cart.entity";

export interface OrderRepositoryInterface {
    getAll(query: PaginationQuery<OrderFilterDto>): Promise<OrderListEntity[]>;
    getAllByUserId(userId: string, query: PaginationQuery<OrderFilterDto>): Promise<OrderPublicListEntity[]>;
    count(query: CountQuery<OrderFilterDto>): Promise<number>;
    countByUserId(userId: string, query: CountQuery<OrderFilterDto>): Promise<number>;
    getById(id: string): Promise<OrderInfoEntity | null>;
    getByIdAndUserId(id: string, userId: string): Promise<OrderInfoEntity | null>;
    updateOrderStatus(id: string, order: OrderUpdateStatusDto): Promise<OrderInfoEntity | null>;
    cancelOrder(id: string, userId: string, orderCancelDto: OrderCancelDto): Promise<OrderInfoEntity | null>;
    placeOrder(userId: string, cart: CartQueryEntityType, order_note?: string): Promise<OrderInfoEntity | null>;
    createRazorpayPayment(order_id: string, razorpay_order_id: string): Promise<void>;
    markPaymentPaid(order_id: string, razorpay_payment_id: string, razorpay_signature: string, payment_data: string): Promise<void>;
    markPaymentFailed(order_id: string): Promise<void>;
    markPaymentCancelled(order_id: string): Promise<void>;
    generateInvoiceNo(): Promise<string>;
}