import { order_items, order_select, order_user, razorpay_payment } from './order.entity';

export const OrderPaginatedSelect = (domain: string) => ({
  ...order_select,

  // ✅ user
  user: order_user,

  // ✅ razorpay payment
  razorpay_payment,

  // ✅ order items
  order_items: order_items(domain),
});