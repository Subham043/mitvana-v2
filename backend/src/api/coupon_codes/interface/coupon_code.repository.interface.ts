import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewCouponCodeEntity, UpdateCouponCodeEntity, CouponCodeEntity } from "../entity/coupon_code.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface CouponCodeRepositoryInterface {
    getByCode(code: string, cacheConfig?: CustomQueryCacheConfig): Promise<CouponCodeEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<CouponCodeEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<CouponCodeEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createCouponCode(couponCode: NewCouponCodeEntity): Promise<CouponCodeEntity | null>;
    updateCouponCode(id: string, couponCode: UpdateCouponCodeEntity): Promise<CouponCodeEntity | null>;
    deleteCouponCode(id: string): Promise<void>;
}