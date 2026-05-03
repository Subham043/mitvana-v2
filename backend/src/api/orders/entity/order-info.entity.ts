import { sql } from 'drizzle-orm';
import { order } from 'src/database/schema/order.schema';
import { order_items, order_select, order_user, OrderAddressEntity, OrderCouponAppliedEntity, OrderShipmentWithTrackingAndCheckpointsEntity, razorpay_payment } from './order.entity';

export const OrderInfoSelect = (domain: string) => ({
  ...order_select,

  // ✅ user
  user: order_user,

  // ✅ razorpay payment
  razorpay_payment,

  // ✅ order items
  order_items: order_items(domain),

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