import { sql } from 'drizzle-orm';
import { order_address, order_coupon_applied, order_product, order_razorpay_payment, order_shipment, order_shipment_check_points, order_shipment_tracking_nos } from 'src/database/schema';
import { order } from 'src/database/schema/order.schema';

export type OrderEntity = typeof order.$inferSelect;
export type NewOrderEntity = typeof order.$inferInsert;
export type NewOrderCouponAppliedEntity = typeof order_coupon_applied.$inferInsert;
export type NewOrderAddressEntity = typeof order_address.$inferInsert;
export type NewOrderProductEntity = typeof order_product.$inferInsert;
export type UpdateOrderEntity = Omit<
  OrderEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UserType = {
  id: string;
  name: string;
  email: string;
};

export type OrderProductEntity = typeof order_product.$inferSelect;
export type OrderRazorpayPaymentEntity = typeof order_razorpay_payment.$inferSelect;
export type OrderAddressEntity = typeof order_address.$inferSelect;
export type OrderCouponAppliedEntity = typeof order_coupon_applied.$inferSelect;
export type OrderShipmentEntity = typeof order_shipment.$inferSelect;
export type OrderShipmentCheckPointsEntity = typeof order_shipment_check_points.$inferSelect;
export type OrderShipmentTrackingNosEntity = typeof order_shipment_tracking_nos.$inferSelect;

export type OrderShipmentWithTrackingAndCheckpointsEntity = OrderShipmentEntity & {
  tracking_numbers: OrderShipmentTrackingNosEntity[];
  shipment_checkpoints: OrderShipmentCheckPointsEntity[];
};

export type OrderListEntity = OrderEntity & {
  user: UserType | null;
  razorpay_payment: OrderRazorpayPaymentEntity | null;
  order_items: OrderProductEntity[];
};

export type OrderInfoEntity = OrderListEntity & {
  order_address: OrderAddressEntity & {
    pincode: {
      pincode: string;
      shipping_charges: number;
    } | null;
  } | null;
  coupon: OrderCouponAppliedEntity | null;
  shipment: OrderShipmentWithTrackingAndCheckpointsEntity | null;
};

export type OrderPublicListEntity = OrderEntity & {
  user: UserType | null;
  razorpay_payment: OrderRazorpayPaymentEntity | null;
  total_order_products: number;
};

export const order_select = {
  id: order.id,
  orderId: order.orderId,
  user_id: order.user_id,
  status: order.status,
  invoice_no: order.invoice_no,
  shipping_charges: order.shipping_charges,
  is_igst_applicable: order.is_igst_applicable,
  total_price: order.total_price,
  sub_total_discounted_price: order.sub_total_discounted_price,
  sub_total: order.sub_total,
  discount: order.discount,
  cancellation_reason: order.cancellation_reason,
  order_note: order.order_note,
  payment_method: order.payment_method,
  is_paid: order.is_paid,
  paid_at: order.paid_at,
  is_delivered: order.is_delivered,
  delivered_at: order.delivered_at,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
}

export const order_user = sql<UserType | null>`
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
`.as('user')

export const razorpay_payment = sql<OrderRazorpayPaymentEntity | null>`
  (
    SELECT 
      CASE 
        WHEN r.order_id IS NULL THEN NULL
        ELSE JSON_OBJECT(
          'order_id', r.order_id,
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
`.as('razorpay_payment')

export const order_items = (domain: string) => sql<OrderProductEntity[]>`
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
`.as('order_items')