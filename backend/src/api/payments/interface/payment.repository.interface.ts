import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { PaymentListEntity } from "../entity/payment.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { PaymentFilterDto } from "../schema/payment-filter.schema";

export interface PaymentRepositoryInterface {
    getAll(query: PaginationQuery<PaymentFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<PaymentListEntity[]>;
    count(query: CountQuery<PaymentFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>;
}