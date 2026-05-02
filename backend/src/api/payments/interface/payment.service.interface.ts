import { PaymentListEntity } from "../entity/payment.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PaymentFilterDto } from "../schema/payment-filter.schema";
import { PassThrough } from "stream";
import { Orders } from "razorpay/dist/types/orders";
import { Payments } from "razorpay/dist/types/payments";
import { VerifyRazorpayPaymentDto } from "../schema/verify-payment.schema";
import { GetRazorpayPaymentInfoDto } from "../schema/get-payment-info.schema";

export interface PaymentServiceInterface {
    getAll(query: PaymentFilterDto): Promise<PaginationResponse<PaymentListEntity, PaymentFilterDto>>;
    generateRazorpayOrder(order_id: string, amount: number): Promise<Orders.RazorpayOrder & { key: string }>;
    verifyRazorpayPayment(dto: VerifyRazorpayPaymentDto): Promise<boolean>;
    getRazorpayPaymentInfo(dto: GetRazorpayPaymentInfoDto): Promise<Payments.RazorpayPayment>;
    exportPayments(query: PaymentFilterDto): Promise<PassThrough>;
}