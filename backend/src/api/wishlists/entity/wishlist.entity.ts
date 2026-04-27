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
  saved_price: number | null;
  saved_percentage: number | null;
  tax: number | null;
  stock: number | null;
  size_or_color: string | null;
  is_draft: boolean;
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

export const WishlistSelect = (domain: string, userId?: string) => {
  const safeUserId = userId ?? -1;
  return {
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
            'tax', ${product.tax},
            'stock', ${product.stock},
            'size_or_color', ${product.size_or_color},
            'is_draft', ${product.is_draft},
            'saved_price', (
              CASE
                WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
                THEN ${product.price} - ${product.discounted_price}
                ELSE 0
              END
            ),
            'saved_percentage', (
              CASE
                WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
                THEN ROUND(((${product.price} - ${product.discounted_price}) / ${product.price}) * 100, 2)
                ELSE 0
              END
            ),
            'tags', (
              SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
              FROM (
                SELECT DISTINCT JSON_OBJECT(
                  'id', t.id,
                  'name', t.name
                ) AS obj
                FROM product_tag pt
                JOIN tag t ON pt.tag_id = t.id
                WHERE pt.product_id = ${product.id}
              ) t
            ),
          'product_images', (
            SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
            FROM (
              SELECT DISTINCT JSON_OBJECT(
                'id', pi.id,
                'image', pi.image,
                'image_link',
                  CASE
                    WHEN pi.image IS NOT NULL
                    THEN CONCAT(${domain}, pi.image)
                    ELSE NULL
                  END
              ) AS obj
              FROM product_image pi
              WHERE pi.product_id = ${product.id}
            ) t
          ),
          'reviews_count', (
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = ${product.id}
            AND pr.status = 'approved'
          ),
          'comments_count', (
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = ${product.id}
            AND pr.comment IS NOT NULL
            AND pr.status = 'approved'
          ),
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
  };
};
