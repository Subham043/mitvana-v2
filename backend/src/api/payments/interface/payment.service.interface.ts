import { PaymentListEntity } from "../entity/payment.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PaymentFilterDto } from "../schema/payment-filter.schema";
import { PassThrough } from "stream";

export interface PaymentServiceInterface {
    getAll(query: PaymentFilterDto): Promise<PaginationResponse<PaymentListEntity, PaymentFilterDto>>;
    exportPayments(query: PaymentFilterDto): Promise<PassThrough>;
}