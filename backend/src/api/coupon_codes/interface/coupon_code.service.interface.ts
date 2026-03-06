import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { CouponCodeEntity } from "../entity/coupon_code.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { CouponCodeDto } from "../schema/coupon_code.schema";

export interface CouponCodeServiceInterface {
    getByCode(code: string): Promise<CouponCodeEntity>;
    getById(id: string): Promise<CouponCodeEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<CouponCodeEntity>>;
    createCouponCode(couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    updateCouponCode(id: string, couponCode: CouponCodeDto): Promise<CouponCodeEntity>;
    deleteCouponCode(id: string): Promise<void>;
}