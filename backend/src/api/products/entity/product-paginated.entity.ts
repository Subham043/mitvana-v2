import { sql } from 'drizzle-orm';
import { product } from 'src/database/schema/product.schema';
import { ProductCategoryEntity } from './product.entity';

export const ProductPaginatedSelect = (domain: string) => ({
    id: product.id,
    title: product.title,
    sub_title: product.sub_title,
    name: product.name,
    slug: product.slug,
    hsn: product.hsn,
    sku: product.sku,
    description: product.description,
    price: product.price,
    discounted_price: product.discounted_price,
    tax: product.tax,
    stock: product.stock,
    thumbnail: product.thumbnail,
    is_draft: product.is_draft,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,

    // ✅ saved_price
    saved_price: sql<number>`
      CASE
        WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
        THEN ${product.price} - ${product.discounted_price}
        ELSE 0
      END
    `.as('saved_price'),

    // ✅ saved_percentage in 2 decimals
    saved_percentage: sql<number>`
      CASE
        WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
        THEN ROUND(((${product.price} - ${product.discounted_price}) / ${product.price}) * 100, 2)
        ELSE 0
      END
    `.as('saved_percentage'),

    // ✅ thumbnail_link
    thumbnail_link: sql<string>`
      CASE
        WHEN ${product.thumbnail} IS NOT NULL
        THEN CONCAT(${domain}, ${product.thumbnail})
        ELSE NULL
      END
    `.as('thumbnail_link'),

    // ✅ categories
    categories: sql<ProductCategoryEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', c.id,
            'name', c.name,
            'slug', c.slug
          ) AS obj
          FROM product_category pc
          JOIN category c ON pc.category_id = c.id
          WHERE pc.product_id = ${sql.raw('product.id')}
        ) t
      )
    `.as('categories'),
});