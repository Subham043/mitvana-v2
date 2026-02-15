import { coupon_code } from "src/database/schema/coupon_code.schema";

export type CouponCodeEntity = typeof coupon_code.$inferSelect
export type NewCouponCodeEntity = typeof coupon_code.$inferInsert
export type UpdateCouponCodeEntity = Omit<CouponCodeEntity, 'id' | 'createdAt' | 'updatedAt'>