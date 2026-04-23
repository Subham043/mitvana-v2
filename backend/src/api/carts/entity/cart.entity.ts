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

export type CartQueryEntityType = {
  user_id: string;
  is_mail_sent: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: CartProductType[];
  user: CartUserType;
  total_price: number;
};

export const CartSelect = (domain: string) => ({
  user_id: cart.user_id,
  is_mail_sent: cart.is_mail_sent,
  createdAt: cart.createdAt,
  updatedAt: cart.updatedAt,

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

  total_price: sql<number>`
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
