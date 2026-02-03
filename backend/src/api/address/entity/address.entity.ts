import { address } from "src/database/schema";

export type AddressEntity = typeof address.$inferSelect
export type NewAddressEntity = typeof address.$inferInsert
export type UpdateAddressEntity = Omit<NewAddressEntity, 'id' | 'createdAt' | 'updatedAt' | 'user_id'>