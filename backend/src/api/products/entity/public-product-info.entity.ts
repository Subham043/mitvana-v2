import { sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import { product } from 'src/database/schema/product.schema';
import { BaseProductEntity, IngredientEntity, base_product_select, saved_percentage, saved_price, thumbnail_link, product_size_or_color_select, product_info_select, product_comments_count, product_reviews_count, product_tags, product_images, is_in_wishlist_select, product_colors, product_faqs } from './product.entity';

export const PublicProductInfoSelect = (domain: string, userId?: string) => {
  const siblingP = alias(product, 'siblingP');
  const safeUserId = userId ?? -1;
  return {
    // base fields
    ...base_product_select,

    size_or_color: product_size_or_color_select,

    ...product_info_select,

    is_in_wishlist: is_in_wishlist_select(safeUserId),

    // ✅ saved_price
    saved_price,

    // ✅ saved_percentage
    saved_percentage,

    // thumbnail link
    thumbnail_link: thumbnail_link(domain),

    // ✅ reviewsCount
    reviews_count: product_reviews_count,

    // ✅ commentsCount
    comments_count: product_comments_count,

    // ✅ child_products (JOIN) use p2
    // child_products: sql<BaseProductEntity[]>`
    // (
    //   SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
    //   FROM (
    //     SELECT
    //       JSON_OBJECT(
    //         'id', ${siblingP.id},
    //         'title', ${siblingP.title},
    //         'slug', ${siblingP.slug},
    //         'hsn', ${siblingP.hsn},
    //         'sku', ${siblingP.sku},
    //         'price', ${siblingP.price},
    //         'discounted_price', ${siblingP.discounted_price},
    //         'tax', ${siblingP.tax},
    //         'stock', ${siblingP.stock},
    //         'size_or_color', ${siblingP.size_or_color},
    //         'is_draft', ${siblingP.is_draft},
    //         'saved_price', (
    //         CASE
    //           WHEN ${siblingP.price} IS NOT NULL AND ${siblingP.discounted_price} IS NOT NULL
    //           THEN ${siblingP.price} - ${siblingP.discounted_price}
    //           ELSE 0
    //         END),
    //         'saved_percentage', (
    //         CASE
    //           WHEN ${siblingP.price} IS NOT NULL AND ${siblingP.discounted_price} IS NOT NULL
    //           THEN ROUND(((${siblingP.price} - ${siblingP.discounted_price}) / ${siblingP.price}) * 100, 2)
    //           ELSE 0
    //         END),
    //         'thumbnail', ${siblingP.thumbnail},
    //         'thumbnail_link', (
    //           CASE
    //             WHEN ${siblingP.thumbnail} IS NOT NULL
    //             THEN CONCAT(${domain}, ${siblingP.thumbnail})
    //             ELSE NULL
    //           END)
    //       ) AS obj
    //     FROM product ${siblingP}
    //     WHERE (
    //       CASE
    //         WHEN ${product.product_selected} IS NULL
    //         THEN ${product.id}
    //         ELSE ${product.product_selected}
    //       END
    //     )
    //     =
    //     (
    //       CASE
    //         WHEN ${siblingP.product_selected} IS NULL
    //         THEN ${siblingP.id}
    //         ELSE ${siblingP.product_selected}
    //       END
    //     )
    //     AND ${siblingP.id} != ${product.id}
    //     ORDER BY CAST(REPLACE(${siblingP.size_or_color}, 'ml', '') AS UNSIGNED) ASC
    //     -- WHERE (
    //     --   (${product.product_selected} IS NULL AND ${siblingP.product_selected} = ${product.id})
    //     --   OR
    //     --   (${product.product_selected} IS NOT NULL AND (
    //     --     ${siblingP.product_selected} = ${product.product_selected}
    //     --     OR ${siblingP.id} = ${product.product_selected}
    //     --   ))
    //     -- )
    //     -- AND ${siblingP.id} != ${product.id}
    //     -- ORDER BY CAST(REPLACE(${siblingP.size_or_color}, 'ml', '') AS UNSIGNED) ASC
    //   ) t
    // )
    // `.as('child_products'),
    child_products: sql<BaseProductEntity[]>`
    (
      SELECT 
        CASE 
          WHEN COUNT(*) <= 1 THEN JSON_ARRAY() -- ✅ no siblings/children → []
          ELSE JSON_ARRAYAGG(obj)
        END
      FROM (
        SELECT
          JSON_OBJECT(
            'id', ${siblingP.id},
            'title', ${siblingP.title},
            'slug', ${siblingP.slug},
            'hsn', ${siblingP.hsn},
            'sku', ${siblingP.sku},
            'price', ${siblingP.price},
            'discounted_price', ${siblingP.discounted_price},
            'tax', ${siblingP.tax},
            'stock', ${siblingP.stock},
            'size_or_color', ${siblingP.size_or_color},
            'is_draft', ${siblingP.is_draft},
            'saved_price', (
              CASE
                WHEN ${siblingP.price} IS NOT NULL AND ${siblingP.discounted_price} IS NOT NULL
                THEN ${siblingP.price} - ${siblingP.discounted_price}
                ELSE 0
              END
            ),
            'saved_percentage', (
              CASE
                WHEN ${siblingP.price} IS NOT NULL AND ${siblingP.discounted_price} IS NOT NULL
                THEN ROUND(((${siblingP.price} - ${siblingP.discounted_price}) / ${siblingP.price}) * 100, 2)
                ELSE 0
              END
            ),
            'is_in_wishlist', (
              EXISTS (
                SELECT 1
                FROM wishlist w
                WHERE w.product_id = ${siblingP.id}
                  AND w.user_id = ${safeUserId}
              )
            ),
            'thumbnail', ${siblingP.thumbnail},
            'thumbnail_link', (
              CASE
                WHEN ${siblingP.thumbnail} IS NOT NULL
                THEN CONCAT(${domain}, ${siblingP.thumbnail})
                ELSE NULL
              END
            )
          ) AS obj
        FROM product ${siblingP}
        WHERE
          (
            CASE
              WHEN ${product.product_selected} IS NULL
              THEN ${product.id}
              ELSE ${product.product_selected}
            END
          )
          =
          (
            CASE
              WHEN ${siblingP.product_selected} IS NULL
              THEN ${siblingP.id}
              ELSE ${siblingP.product_selected}
            END
          )
        ORDER BY CAST(REPLACE(${siblingP.size_or_color}, 'ml', '') AS UNSIGNED) ASC
      ) t
    )
    `.as('child_products'),

    // ✅ colors
    colors: product_colors,

    // ✅ ingredients
    ingredients: sql<IngredientEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', col.id,
            'title', col.title,
            'description', col.description,
            'thumbnail', col.thumbnail,
            'thumbnail_link', (
              CASE
                WHEN col.thumbnail IS NOT NULL
                THEN CONCAT(${domain}, col.thumbnail)
                ELSE NULL
              END)
          ) AS obj
          FROM product_ingredient pi
          JOIN ingredient col ON pi.ingredient_id = col.id
          WHERE pi.product_id = ${product.id}
        ) t
      )
    `.as('ingredients'),

    // ✅ tags
    tags: product_tags,

    // ✅ images
    product_images: product_images(domain),

    // ✅ faqs
    product_faqs,

    // ✅ related products
    related_products: sql<BaseProductEntity[]>`
    (
      SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
      FROM (
        SELECT DISTINCT JSON_OBJECT(
          'id', rp.id,
          'title', rp.title,
          'slug', rp.slug,
          'hsn', rp.hsn,
          'sku', rp.sku,
          'price', rp.price,
          'discounted_price', rp.discounted_price,
          'tax', rp.tax,
          'stock', rp.stock,
          'size_or_color', rp.size_or_color,
          'is_draft', rp.is_draft,
          'thumbnail', rp.thumbnail,
          'saved_price', (
          CASE
              WHEN rp.price IS NOT NULL AND rp.discounted_price IS NOT NULL
              THEN rp.price - rp.discounted_price
              ELSE 0
            END),
          'saved_percentage', (
          CASE
            WHEN rp.price IS NOT NULL AND rp.discounted_price IS NOT NULL
            THEN ROUND(((rp.price - rp.discounted_price) / rp.price) * 100, 2)
            ELSE 0
          END),
          'is_in_wishlist', (
              EXISTS (
                SELECT 1
                FROM wishlist w
                WHERE w.product_id = rp.id
                  AND w.user_id = ${safeUserId}
              )
          ),
          'thumbnail_link',(
            CASE
              WHEN rp.thumbnail IS NOT NULL
              THEN CONCAT(${domain}, rp.thumbnail)
              ELSE NULL
            END),
          'tags', (
              SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
              FROM (
                SELECT DISTINCT JSON_OBJECT(
                  'id', t.id,
                  'name', t.name
                ) AS obj
                FROM product_tag pt
                JOIN tag t ON pt.tag_id = t.id
                WHERE pt.product_id = rp.id
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
              WHERE pi.product_id = rp.id
            ) t
          ),
          'reviews_count', (
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = rp.id
            AND pr.status = 'approved'
          ),
          'comments_count', (
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = rp.id
            AND pr.comment IS NOT NULL
            AND pr.status = 'approved'
          )
        ) AS obj
        FROM related_product rpm
        JOIN product rp ON rpm.related_product_id = rp.id
        WHERE rpm.product_id = ${product.id}
      ) t
    )
  `.as('related_products'),
  };
};