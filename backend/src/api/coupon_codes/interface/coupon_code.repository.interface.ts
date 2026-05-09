import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewCouponCodeEntity, UpdateCouponCodeEntity, CouponCodeEntity } from "../entity/coupon_code.entity";
import { CouponCodeFilterDto } from "../schema/coupon-code-filter.schema";

export interface CouponCodeRepositoryInterface {
    getByCode(code: string): Promise<CouponCodeEntity | null>;
    getById(id: string): Promise<CouponCodeEntity | null>;
    getAll(query: PaginationQuery<CouponCodeFilterDto>): Promise<CouponCodeEntity[]>;
    count(query: CountQuery<CouponCodeFilterDto>): Promise<number>
    createCouponCode(couponCode: NewCouponCodeEntity): Promise<CouponCodeEntity | null>;
    updateCouponCode(id: string, couponCode: UpdateCouponCodeEntity): Promise<CouponCodeEntity | null>;
    deleteCouponCode(id: string): Promise<void>;
    incrementTimesRedeemed(code: string): Promise<void>;
}