import { CouponCodeEntity } from "../entity/coupon_code.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { CouponCodeDto } from "../schema/coupon_code.schema";
import { CouponCodeStatusDto } from "../schema/coupon_code_status.schema";
import { PassThrough } from "stream";
import { CouponCodeFilterDto } from "../schema/coupon-code-filter.schema";

export interface CouponCodeServiceInterface {
    getByCode(code: string): Promise<CouponCodeEntity>;
    getById(id: string): Promise<CouponCodeEntity>;
    getAll(query: CouponCodeFilterDto): Promise<PaginationResponse<CouponCodeEntity, Omit<CouponCodeFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    createCouponCode(couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    updateCouponCode(id: string, couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    updateCouponCodeStatus(id: string, couponCodeStatus: CouponCodeStatusDto): Promise<CouponCodeEntity>;
    deleteCouponCode(id: string): Promise<void>;
    exportCouponCodes(search?: string): Promise<PassThrough>;
}