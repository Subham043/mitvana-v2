import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { NewCouponCodeEntity, CouponCodeEntity, UpdateCouponCodeEntity } from "../entity/coupon_code.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";

export interface CouponCodeServiceInterface {
    getByCode(code: string): Promise<CouponCodeEntity>;
    getById(id: string): Promise<CouponCodeEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<CouponCodeEntity>>;
    createCouponCode(couponCode: NewCouponCodeEntity): Promise<CouponCodeEntity>;
    updateCouponCode(id: string, couponCode: UpdateCouponCodeEntity): Promise<CouponCodeEntity>;
    deleteCouponCode(id: string): Promise<void>;
}