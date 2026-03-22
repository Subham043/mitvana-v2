import { sql } from 'drizzle-orm';
import { product, users } from 'src/database/schema';
import { wishlist } from 'src/database/schema/wishlist.schema';

export type WishlistEntity = typeof wishlist.$inferSelect;
export type NewWishlistEntity = typeof wishlist.$inferInsert;

type ProductType = {
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

export type UserType = {
    id: string;
    name: string;
    email: string;
};

export type WishlistQueryEntityType = {
    user_id: string;
    product_id: string;
    createdAt: Date;
    updatedAt: Date;
    product: ProductType;
    user: UserType;
};

export const WishlistSelect = (domain: string) => ({
    user_id: wishlist.user_id,
    product_id: wishlist.product_id,
    createdAt: wishlist.createdAt,
    updatedAt: wishlist.updatedAt,

    product: sql<ProductType>`
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
          END
        `.as('product'),

    user: sql<UserType>`
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
