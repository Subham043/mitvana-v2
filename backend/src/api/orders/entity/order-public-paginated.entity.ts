import { sql } from 'drizzle-orm';
import { order } from 'src/database/schema/order.schema';
import { OrderRazorpayPaymentEntity, UserType } from './order.entity';

export const OrderPublicPaginatedSelect = () => ({
    id: order.id,
    orderId: order.orderId,
    user_id: order.user_id,
    status: order.status,
    shipping_charges: order.shipping_charges,
    is_igst_applicable: order.is_igst_applicable,
    total_tax: order.total_tax,
    total_price: order.total_price,
    total_discounted_price: order.total_discounted_price,
    cancellation_reason: order.cancellation_reason,
    payment_method: order.payment_method,
    is_paid: order.is_paid,
    paid_at: order.paid_at,
    is_delivered: order.is_delivered,
    delivered_at: order.delivered_at,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,

    // ✅ user
    user: sql<UserType | null>`
    (
      SELECT 
        CASE 
          WHEN u.id IS NULL THEN NULL
          ELSE JSON_OBJECT(
            'id', u.id,
            'name', u.name,
            'email', u.email
          )
        END
      FROM users u
      WHERE u.id = ${order.user_id}
      LIMIT 1
    )
  `.as('user'),

    // ✅ razorpay payment
    razorpay_payment: sql<OrderRazorpayPaymentEntity | null>`
    (
      SELECT 
        CASE 
          WHEN r.order_id IS NULL THEN NULL
          ELSE JSON_OBJECT(
            'order_id', r.order_id,
            'payment_data', r.payment_data,
            'razorpay_order_id', r.razorpay_order_id,
            'razorpay_payment_id', r.razorpay_payment_id,
            'status', r.status,
            'created_at', r.created_at,
            'updated_at', r.updated_at
          )
        END
      FROM order_razorpay_payment r
      WHERE r.order_id = ${order.id}
      LIMIT 1
    )
  `.as('razorpay_payment'),

    //total_order_products
    total_order_products: sql<number>`
    (
      SELECT COUNT(*) FROM order_product WHERE order_id = ${order.id}
    )
  `.as('total_order_products'),
});