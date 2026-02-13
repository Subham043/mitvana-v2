import { pincode } from "src/database/schema";

export type PincodeEntity = typeof pincode.$inferSelect
export type NewPincodeEntity = typeof pincode.$inferInsert
export type UpdatePincodeEntity = Partial<NewPincodeEntity>