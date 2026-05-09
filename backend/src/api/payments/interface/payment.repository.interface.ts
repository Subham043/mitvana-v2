import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { PaymentListEntity } from "../entity/payment.entity";
import { PaymentFilterDto } from "../schema/payment-filter.schema";

export interface PaymentRepositoryInterface {
    getAll(query: PaginationQuery<PaymentFilterDto>): Promise<PaymentListEntity[]>;
    count(query: CountQuery<PaymentFilterDto>): Promise<number>;
}