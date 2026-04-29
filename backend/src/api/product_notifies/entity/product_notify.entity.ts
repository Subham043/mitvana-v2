import { sql } from 'drizzle-orm';
import { product } from 'src/database/schema';
import { product_notify } from 'src/database/schema/product_notify.schema';

export type ProductNotifyEntity = typeof product_notify.$inferSelect;
export type NewProductNotifyEntity = typeof product_notify.$inferInsert;

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

export type ProductNotifyQueryEntityType = {
  id: string;
  email: string;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
  product: ProductType | null;
};

export const ProductNotifySelect = (domain: string) => ({
  id: product_notify.id,
  email: product_notify.email,
  product_id: product_notify.product_id,
  createdAt: product_notify.createdAt,
  updatedAt: product_notify.updatedAt,

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
        `.as('product')
});
