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