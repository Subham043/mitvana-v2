import { sql } from 'drizzle-orm';
import { cart_product, color, product, users } from 'src/database/schema';
import { cart } from 'src/database/schema/cart.schema';

export type CartEntity = typeof cart.$inferSelect;
export type NewCartEntity = typeof cart.$inferInsert;

type CartProductType = {
  quantity: number;
  total_price_per_product: number;
  product: {
    id: string;
    title: string;
    slug: string;
    sku: string | null;
    hsn: string | null;
    price: number;
    discounted_price: number | null;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;
  };
  color: {
    id: string;
    name: string;
    code: string;
  } | null;
};

type CartUserType = {
  id: string;
  name: string;
  email: string;
};

type CouponCodeType = {
  id: string;
  code: string;
  discount_percentage: number;
  min_cart_value: number;
  maximum_redemptions: number;
  times_redeemed: number;
  expiration_date: Date;
  is_draft: boolean;
}

type AddressType = {
  id: string;
  address: string | null;
  address_2: string | null;
  shipping_note: string | null;
  city: string | null;
  state: string | null;
  phone_number: string | null;
  first_name: string | null;
  last_name: string | null;
  postal_code: number;
  address_type: string | null;
  country: string | null;
  company_name: string | null;
  alternate_phone: string | null;
  pincode_info: {
    shipping_charges: number;
    is_delivery_available: boolean;
  } | null;
}

export type CartQueryEntityType = {
  user_id: string;
  is_mail_sent: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: CartProductType[];
  user: CartUserType;
  sub_total: number;
  shipping_charges: number;
  discount: number;
  total_price: number;
  coupon: CouponCodeType | null;
  address: AddressType | null;
};

export const CartSelect = (domain: string) => ({
  user_id: cart.user_id,
  is_mail_sent: cart.is_mail_sent,
  createdAt: cart.createdAt,
  updatedAt: cart.updatedAt,

  // ✅ user
  coupon: sql<CouponCodeType | null>`
      (
        SELECT 
          CASE 
            WHEN c.code IS NULL THEN NULL
            ELSE JSON_OBJECT(
              'id', c.id,
              'code', c.code,
              'discount_percentage', c.discount_percentage,
              'min_cart_value', c.min_cart_value,
              'maximum_redemptions', c.maximum_redemptions,
              'times_redeemed', c.times_redeemed,
              'expiration_date', c.expiration_date,
              'is_draft', c.is_draft
            )
          END
        FROM coupon_code c
        WHERE c.code = ${cart.coupon_code}
        AND c.is_draft = false
        AND c.expiration_date > NOW()
        AND c.times_redeemed < c.maximum_redemptions
        -- ✅ enforce min cart value
        AND c.min_cart_value <= (
          SELECT COALESCE(SUM(
            cp.quantity * COALESCE(p.discounted_price, p.price)
          ), 0)
          FROM cart_product cp
          JOIN product p ON p.id = cp.product_id
          WHERE cp.cart_user_id = ${cart.user_id}
        )
        LIMIT 1
      )
    `.as('coupon'),

  address: sql<AddressType | null>`
    (
      SELECT 
        CASE 
          WHEN a.id IS NULL THEN NULL
          ELSE JSON_OBJECT(
            'id', a.id,
            'address', a.address,
            'address_2', a.address_2,
            'shipping_note', a.shipping_note,
            'city', a.city,
            'state', a.state,
            'phone_number', a.phone_number,
            'first_name', a.first_name,
            'last_name', a.last_name,
            'postal_code', a.postal_code,
            'pincode_info', (
              SELECT JSON_OBJECT(
                'shipping_charges', p.shipping_charges,
                'is_delivery_available', p.is_delivery_available
              )
              FROM pincode p
              WHERE p.pincode = a.postal_code
              LIMIT 1
            ),
            'address_type', a.address_type,
            'country', a.country,
            'company_name', a.company_name,
            'alternate_phone', a.alternate_phone
          )
        END
      FROM address a
      WHERE a.id = ${cart.address_id}
      AND a.user_id = ${cart.user_id}
      LIMIT 1
    )`,


  // ✅ products array
  products: sql<CartProductType[]>`
      COALESCE(
        JSON_ARRAYAGG(
          CASE
            WHEN ${product.id} IS NOT NULL THEN
              JSON_OBJECT(
                'quantity', ${cart_product.quantity},
                'total_price_per_product', ${cart_product.quantity} * COALESCE(${product.discounted_price}, ${product.price}),

                'product',
                  CASE
                    WHEN ${product.id} IS NULL THEN NULL
                    ELSE JSON_OBJECT(
                      'id', ${product.id},
                      'title', ${product.title},
                      'slug', ${product.slug},
                      'sku', ${product.sku},
                      'hsn', ${product.hsn},
                      'price', ${product.price},
                      'discounted_price', ${product.discounted_price},
                      'stock', ${product.stock},
                      'thumbnail', ${product.thumbnail},
                      'thumbnail_link',
                        CASE
                          WHEN ${product.thumbnail} IS NOT NULL
                          THEN CONCAT(${domain}, ${product.thumbnail})
                          ELSE NULL
                        END
                    )
                  END,

                'color',
                  CASE
                    WHEN ${color.id} IS NULL THEN NULL
                    ELSE JSON_OBJECT(
                      'id', ${color.id},
                      'name', ${color.name},
                      'code', ${color.code}
                    )
                  END
              )
          END
        ),
        JSON_ARRAY()
      )
    `.as('products'),

  sub_total: sql<number>`
    COALESCE(
      SUM(
        CASE
          WHEN ${product.id} IS NOT NULL THEN
            ${cart_product.quantity} *
            COALESCE(${product.discounted_price}, ${product.price})
          ELSE 0
        END
      ),
      0
    )
  `.as('sub_total'),

  //shipping_charges
  shipping_charges: sql<number>`
    CASE
      WHEN (
        SELECT COALESCE(SUM(
          cp.quantity * COALESCE(p.discounted_price, p.price)
        ), 0)
        FROM cart_product cp
        JOIN product p ON p.id = cp.product_id
        WHERE cp.cart_user_id = ${cart.user_id}
      ) >= (
        SELECT s.min_cart_value_for_free_shipping
        FROM setting s
        LIMIT 1
      )
      THEN 0
      ELSE COALESCE((
        SELECT p.shipping_charges
        FROM pincode p
        JOIN address a ON a.postal_code = p.pincode
        WHERE a.id = ${cart.address_id}
        LIMIT 1
      ), 0)
    END
  `.as('shipping_charges'),

  //discount = sub_total - discount
  discount: sql<number>`
    COALESCE((
      (
        SELECT COALESCE(SUM(
          cp.quantity * COALESCE(p.discounted_price, p.price)
        ), 0)
        FROM cart_product cp
        JOIN product p ON p.id = cp.product_id
        WHERE cp.cart_user_id = ${cart.user_id}
      ) * (
        SELECT c.discount_percentage
        FROM coupon_code c
        WHERE c.code = ${cart.coupon_code}
        AND c.is_draft = false
        AND c.expiration_date > NOW()
        AND c.times_redeemed < c.maximum_redemptions
        AND c.min_cart_value <= (
          SELECT COALESCE(SUM(
            cp.quantity * COALESCE(p.discounted_price, p.price)
          ), 0)
          FROM cart_product cp
          JOIN product p ON p.id = cp.product_id
          WHERE cp.cart_user_id = ${cart.user_id}
        )
        LIMIT 1
      ) / 100
    ), 0)
  `.as('discount'),

  //total_price = (sub_total + shipping_charges) - coupon_discount
  total_price: sql<number>`
  (
    -- sub_total
    COALESCE(
      SUM(
        CASE
          WHEN ${product.id} IS NOT NULL THEN
            ${cart_product.quantity} *
            COALESCE(${product.discounted_price}, ${product.price})
          ELSE 0
        END
      ),
      0
    )

    +

    -- shipping (free shipping logic)
    CASE
      WHEN (
        SELECT COALESCE(SUM(
          cp.quantity * COALESCE(p.discounted_price, p.price)
        ), 0)
        FROM cart_product cp
        JOIN product p ON p.id = cp.product_id
        WHERE cp.cart_user_id = ${cart.user_id}
      ) >= (
        SELECT s.min_cart_value_for_free_shipping
        FROM setting s
        LIMIT 1
      )
      THEN 0
      ELSE COALESCE((
        SELECT p.shipping_charges
        FROM pincode p
        JOIN address a ON a.postal_code = p.pincode
        WHERE a.id = ${cart.address_id}
        LIMIT 1
      ), 0)
    END

    -

    -- coupon discount
    COALESCE((
      (
        SELECT COALESCE(SUM(
          cp.quantity * COALESCE(p.discounted_price, p.price)
        ), 0)
        FROM cart_product cp
        JOIN product p ON p.id = cp.product_id
        WHERE cp.cart_user_id = ${cart.user_id}
      ) * (
        SELECT c.discount_percentage
        FROM coupon_code c
        WHERE c.code = ${cart.coupon_code}
        AND c.is_draft = false
        AND c.expiration_date > NOW()
        AND c.times_redeemed < c.maximum_redemptions
        AND c.min_cart_value <= (
          SELECT COALESCE(SUM(
            cp.quantity * COALESCE(p.discounted_price, p.price)
          ), 0)
          FROM cart_product cp
          JOIN product p ON p.id = cp.product_id
          WHERE cp.cart_user_id = ${cart.user_id}
        )
        LIMIT 1
      ) / 100
    ), 0)
  )
  `.as('total_price'),


  // ✅ user object
  user: sql<CartUserType>`
      CASE
        WHEN ${users.id} IS NULL THEN NULL
        ELSE JSON_OBJECT(
          'id', ${users.id},
          'name', ${users.name},
          'email', ${users.email}
        )
      END
    `.as('user'),
});
