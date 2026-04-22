import { sql } from 'drizzle-orm';
import { order_address, order_coupon_applied, order_product, order_razorpay_payment, order_shipment, order_shipment_check_points, order_shipment_tracking_nos } from 'src/database/schema';
import { order } from 'src/database/schema/order.schema';

export type OrderEntity = typeof order.$inferSelect;
export type NewOrderEntity = typeof order.$inferInsert;
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

type OrderShipmentWithTrackingAndCheckpointsEntity = OrderShipmentEntity & {
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

export const OrderInfoSelect = (domain: string) => ({
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

  // ✅ order address (object or null)
  order_address: sql<OrderAddressEntity | null>`
    (
      SELECT JSON_OBJECT(
        'order_id', oa.order_id,
        'address', oa.address,
        'address_2', oa.address_2,
        'city', oa.city,
        'state', oa.state,
        'phone_number', oa.phone_number,
        'first_name', oa.first_name,
        'last_name', oa.last_name,
        'postal_code', oa.postal_code,
        'country', oa.country,
        'company_name', oa.company_name,
        'alternate_phone', oa.alternate_phone,
        'createdAt', oa.created_at,
        'updatedAt', oa.updated_at,

        -- ✅ pincode (object or null)
        'pincode',
        (
          SELECT JSON_OBJECT(
            'pincode', p.pincode,
            'shipping_charges', p.shipping_charges
          )
          FROM pincode p
          WHERE p.pincode = oa.postal_code
        )
      )
      FROM order_address oa
      WHERE oa.order_id = ${order.id}
      LIMIT 1
    )
  `.as('order_address'),

  // ✅ coupon (object or null)
  coupon: sql<OrderCouponAppliedEntity | null>`
    (
      SELECT JSON_OBJECT(
        'order_id', oc.order_id,
        'coupon_code', oc.coupon_code,
        'discount_percentage', oc.discount_percentage,
        'createdAt', oc.created_at,
        'updatedAt', oc.updated_at
      )
      FROM order_coupon_applied oc
      WHERE oc.order_id = ${order.id}
      LIMIT 1
    )
  `.as('coupon'),

  // ✅ shipment (object or null)
  shipment: sql<OrderShipmentWithTrackingAndCheckpointsEntity | null>`
  (
    SELECT JSON_OBJECT(
      'order_id', os.order_id,
      'tracking_link', os.tracking_link,
      'expected_delivery_date', os.expected_delivery_date,
      'createdAt', os.created_at,
      'updatedAt', os.updated_at,

      -- ✅ tracking numbers (nested)
      'tracking_numbers',
      (
        SELECT COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', t.id,
              'tracking_no', t.tracking_no,
              'createdAt', t.created_at,
              'updatedAt', t.updated_at
            )
          ),
          JSON_ARRAY()
        )
        FROM order_shipment_tracking_nos t
        WHERE t.order_id = os.order_id
      ),

      -- ✅ shipment checkpoints (nested)
      'shipment_checkpoints',
      (
        SELECT COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', sc.id,
              'city', sc.city,
              'state', sc.state,
              'remark', sc.remark,
              'tag', sc.tag,
              'sub_tag', sc.sub_tag,
              'date', sc.date,
              'createdAt', sc.created_at,
              'updatedAt', sc.updated_at
            )
          ),
          JSON_ARRAY()
        )
        FROM order_shipment_check_points sc
        WHERE sc.order_id = os.order_id
      )
    )
    FROM order_shipment os
    WHERE os.order_id = ${order.id}
    LIMIT 1
  )
`.as('shipment'),
});


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