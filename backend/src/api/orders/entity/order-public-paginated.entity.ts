import { sql } from 'drizzle-orm';
import { order } from 'src/database/schema/order.schema';
import { order_select, order_user, razorpay_payment } from './order.entity';

export const OrderPublicPaginatedSelect = () => ({
  ...order_select,

  // ✅ user
  user: order_user,

  // ✅ razorpay payment
  razorpay_payment,

  //total_order_products
  total_order_products: sql<number>`
    (
      SELECT COUNT(*) FROM order_product WHERE order_id = ${order.id}
    )
  `.as('total_order_products'),
});