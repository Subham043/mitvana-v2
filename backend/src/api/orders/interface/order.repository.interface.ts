import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { OrderInfoEntity, OrderListEntity, OrderPublicListEntity } from "../entity/order.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { OrderFilterDto } from "../schema/order-filter.schema";
import { OrderUpdateStatusDto } from "../schema/order-update-status.schema";
import { OrderCancelDto } from "../schema/order-cancel.schema";
import { CartQueryEntityType } from "src/api/carts/entity/cart.entity";

export interface OrderRepositoryInterface {
    getAll(query: PaginationQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<OrderListEntity[]>;
    getAllByUserId(userId: string, query: PaginationQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<OrderPublicListEntity[]>;
    count(query: CountQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>;
    countByUserId(userId: string, query: CountQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<OrderInfoEntity | null>;
    getByIdAndUserId(id: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<OrderInfoEntity | null>;
    updateOrderStatus(id: string, order: OrderUpdateStatusDto): Promise<OrderInfoEntity | null>;
    cancelOrder(id: string, userId: string, orderCancelDto: OrderCancelDto): Promise<OrderInfoEntity | null>;
    placeOrder(userId: string, cart: CartQueryEntityType, order_note?: string): Promise<OrderInfoEntity | null>;
    createRazorpayPayment(order_id: string, razorpay_order_id: string): Promise<void>;
    markPaymentPaid(order_id: string, razorpay_payment_id: string, razorpay_signature: string, payment_data: string): Promise<void>;
    markPaymentFailed(order_id: string): Promise<void>;
    markPaymentCancelled(order_id: string): Promise<void>;
    generateInvoiceNo(): Promise<string>;
}