import { sql } from 'drizzle-orm';
import { order } from 'src/database/schema/order.schema';
import { OrderProductEntity, OrderRazorpayPaymentEntity, UserType } from './order.entity';

export const OrderPaginatedSelect = (domain: string) => ({
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

    // ✅ order items
    order_items: sql<OrderProductEntity[]>`
  (
    SELECT COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'order_id', oi.order_id,
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'product_title', oi.product_title,
          'product_slug', oi.product_slug,
          'product_sku', oi.product_sku,
          'product_hsn', oi.product_hsn,
          'product_price', oi.product_price,
          'product_discounted_price', oi.product_discounted_price,
          'product_tax', oi.product_tax,
          'color_id', oi.color_id,
          'color_name', oi.color_name,
          'color_code', oi.color_code,
          'created_at', oi.created_at,
          'updated_at', oi.updated_at,
          'product_image', oi.product_image,
          'product_image_link',
            CASE
              WHEN oi.product_image IS NOT NULL
              THEN CONCAT(${domain}, oi.product_image)
              ELSE NULL
            END
        )
      ),
      JSON_ARRAY()
    )
    FROM order_product oi
    WHERE oi.order_id = ${order.id}
  )
`.as('order_items'),
});