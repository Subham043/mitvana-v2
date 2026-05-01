import { OrderInfoEntity, OrderListEntity, OrderPublicListEntity } from "../entity/order.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { OrderFilterDto } from "../schema/order-filter.schema";
import { OrderUpdateStatusDto } from "../schema/order-update-status.schema";
import { PassThrough } from "stream";
import { OrderCancelDto } from "../schema/order-cancel.schema";
import { PlaceOrderDto } from "../schema/place-order.schema";
import { VerifyOrderDto } from "../schema/verify-order.schema";

export interface OrderServiceInterface {
    getAll(query: OrderFilterDto): Promise<PaginationResponse<OrderListEntity, OrderFilterDto>>;
    getAllByUserId(userId: string, query: OrderFilterDto): Promise<PaginationResponse<OrderPublicListEntity, OrderFilterDto>>;
    getById(id: string): Promise<OrderInfoEntity>;
    getByIdAndUserId(id: string, userId: string): Promise<OrderInfoEntity>;
    updateOrderStatus(id: string, orderStatus: OrderUpdateStatusDto): Promise<OrderInfoEntity>;
    cancelOrder(id: string, userId: string, dto: OrderCancelDto): Promise<OrderInfoEntity>;
    placeOrder(userId: string, dto: PlaceOrderDto): Promise<{ amount: number | string, key: string, razorpay_order_id: string, currency: string, receipt?: string }>;
    verifyPayment(dto: VerifyOrderDto): Promise<OrderInfoEntity>;
    exportOrders(query: OrderFilterDto): Promise<PassThrough>;
}