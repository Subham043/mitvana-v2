import { OrderInfoEntity, OrderListEntity } from "../entity/order.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { OrderFilterDto } from "../schema/order-filter.schema";

export interface OrderServiceInterface {
    getAll(query: OrderFilterDto): Promise<PaginationResponse<OrderListEntity, OrderFilterDto>>;
    getById(id: string): Promise<OrderInfoEntity>;
}