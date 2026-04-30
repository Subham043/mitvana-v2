import { sql } from 'drizzle-orm';
import { product } from 'src/database/schema/product.schema';
import { ProductImageEntity, TagEntity } from './product.entity';

export const PublicProductPaginatedSelect = (domain: string, userId?: string) => {
    const safeUserId = userId ?? -1;
    return {
        id: product.id,
        title: product.title,
        sub_title: product.sub_title,
        name: product.name,
        slug: product.slug,
        hsn: product.hsn,
        sku: product.sku,
        price: product.price,
        discounted_price: product.discounted_price,
        tax: product.tax,
        stock: product.stock,
        thumbnail: product.thumbnail,
        size_or_color: product.size_or_color,
        is_draft: product.is_draft,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,

        is_in_wishlist: sql<boolean>`
      EXISTS (
        SELECT 1
        FROM wishlist w
        WHERE w.product_id = ${product.id}
          AND w.user_id = ${safeUserId}
      )
    `.as('is_in_wishlist'),

        // ✅ saved_price
        saved_price: sql<number>`
      CASE
        WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
        THEN ${product.price} - ${product.discounted_price}
        ELSE 0
      END
    `.as('saved_price'),

        // ✅ saved_percentage
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

        // ✅ reviewsCount
        reviews_count: sql<number>`(
      SELECT COUNT(*)
      FROM product_review pr
      WHERE pr.product_id = ${product.id}
      AND pr.status = 'approved'
    )`.as('reviews_count'),

        // ✅ commentsCount
        comments_count: sql<number>`(
      SELECT COUNT(*)
      FROM product_review pr
      WHERE pr.product_id = ${product.id}
      AND pr.comment IS NOT NULL
      AND pr.status = 'approved'
    )`.as('comments_count'),

        // ✅ tags
        tags: sql<TagEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', t.id,
            'name', t.name
          ) AS obj
          FROM product_tag pt
          JOIN tag t ON pt.tag_id = t.id
          WHERE pt.product_id = ${sql.raw('product.id')}
        ) t
      )
    `.as('tags'),

        // ✅ images
        product_images: sql<ProductImageEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', pi.id,
            'image', pi.image,
            'image_link', (
              CASE
                WHEN pi.image IS NOT NULL
                THEN CONCAT(${domain}, pi.image)
                ELSE NULL
              END)
          ) AS obj
          FROM product_image pi
          WHERE pi.product_id = ${sql.raw('product.id')}
        ) t
      )
    `.as('product_images'),
    }
};