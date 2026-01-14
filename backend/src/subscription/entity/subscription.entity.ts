import { subscription } from "src/database/schema";

export type SubscriptionEntity = typeof subscription.$inferSelect
export type NewSubscriptionEntity = typeof subscription.$inferInsert
export type UpdateSubscriptionEntity = Omit<SubscriptionEntity, 'id' | 'createdAt' | 'updatedAt'>