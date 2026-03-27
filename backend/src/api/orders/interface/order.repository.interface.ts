import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { OrderInfoEntity, OrderListEntity } from "../entity/order.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { OrderFilterDto } from "../schema/order-filter.schema";
import { OrderUpdateStatusDto } from "../schema/order-update-status.schema";

export interface OrderRepositoryInterface {
    getAll(query: PaginationQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<OrderListEntity[]>;
    count(query: CountQuery<OrderFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<OrderInfoEntity | null>;
    updateOrderStatus(id: string, order: OrderUpdateStatusDto): Promise<OrderInfoEntity | null>;
}