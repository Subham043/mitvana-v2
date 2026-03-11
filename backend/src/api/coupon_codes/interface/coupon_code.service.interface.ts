import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { CouponCodeEntity } from "../entity/coupon_code.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { CouponCodeDto } from "../schema/coupon_code.schema";
import { CouponCodeStatusDto } from "../schema/coupon_code_status.schema";
import { PassThrough } from "stream";

export interface CouponCodeServiceInterface {
    getByCode(code: string): Promise<CouponCodeEntity>;
    getById(id: string): Promise<CouponCodeEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<CouponCodeEntity>>;
    createCouponCode(couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    updateCouponCode(id: string, couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    updateCouponCodeStatus(id: string, couponCodeStatus: CouponCodeStatusDto): Promise<CouponCodeEntity>;
    deleteCouponCode(id: string): Promise<void>;
    exportCouponCodes(search?: string): Promise<PassThrough>;
}