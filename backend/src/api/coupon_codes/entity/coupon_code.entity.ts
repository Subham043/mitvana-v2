import { coupon_code } from "src/database/schema/coupon_code.schema";

export type CouponCodeEntity = typeof coupon_code.$inferSelect
export type NewCouponCodeEntity = Omit<typeof coupon_code.$inferInsert, 'times_redeemed'>
export type UpdateCouponCodeEntity = Omit<CouponCodeEntity, 'id' | 'times_redeemed' | 'createdAt' | 'updatedAt'>