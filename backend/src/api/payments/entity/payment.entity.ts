import { sql } from 'drizzle-orm';
import { order_razorpay_payment } from 'src/database/schema';

export type UserType = {
  id: string;
  name: string;
  email: string;
};

export type OrderRazorpayPaymentEntity = typeof order_razorpay_payment.$inferSelect;

export type PaymentListEntity = OrderRazorpayPaymentEntity & {
  order: {
    orderId: string;
    total_price: number;
    user: UserType | null;
  } | null;
}

export const PaymentListSelect = () => ({
  order_id: order_razorpay_payment.order_id,
  razorpay_order_id: order_razorpay_payment.razorpay_order_id,
  razorpay_payment_id: order_razorpay_payment.razorpay_payment_id,
  status: order_razorpay_payment.status,
  createdAt: order_razorpay_payment.createdAt,
  updatedAt: order_razorpay_payment.updatedAt,

  order: sql<PaymentListEntity["order"] | null>`
  (
    SELECT 
      CASE 
        WHEN o.id IS NULL THEN NULL
        ELSE JSON_OBJECT(
          'orderId', o.orderId,
          'total_price', o.total_price,

          'user',
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
            WHERE u.id = o.user_id
            LIMIT 1
          )
        )
      END
    FROM \`order\` o
    WHERE o.id = ${order_razorpay_payment.order_id}
    LIMIT 1
  )
  `.as('order'),
});
