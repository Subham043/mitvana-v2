import { sql } from 'drizzle-orm';
import { product, users } from 'src/database/schema';
import { product_review } from 'src/database/schema/product_review.schema';

export type ProductReviewEntity = typeof product_review.$inferSelect;
export type NewProductReviewEntity = typeof product_review.$inferInsert;
export type UpdateProductReviewEntity = Omit<
    NewProductReviewEntity,
    'id' | 'createdAt' | 'updatedAt' | 'user_id' | 'product_id'
>;

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

export type ProductReviewQueryEntityType = {
    id: string;
    rating: number;
    title: string | null;
    comment: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    product: ProductType | null;
    user: UserType;
};

export const ProductReviewSelect = (domain: string) => ({
    id: product_review.id,
    rating: product_review.rating,
    title: product_review.title,
    comment: product_review.comment,
    status: product_review.status,
    createdAt: product_review.createdAt,
    updatedAt: product_review.updatedAt,

    product: sql<ProductType | null>`
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
