import { sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import { product } from 'src/database/schema/product.schema';
import { BaseProductEntity, IngredientEntity, base_product_select, ProductRelatedEntity, saved_percentage, saved_price, thumbnail_link, product_size_or_color_select, product_info_select, categories, product_tags, product_images, product_colors, product_faqs } from './product.entity';

export const ProductInfoSelect = (domain: string) => {
  const p2 = alias(product, 'p2');
  return {
    // base fields
    ...base_product_select,

    size_or_color: product_size_or_color_select,

    ...product_info_select,

    // ✅ saved_price
    saved_price,

    // ✅ saved_percentage
    saved_percentage,

    // thumbnail link
    thumbnail_link: thumbnail_link(domain),

    // ✅ parent_product (JOIN)
    parent_product: sql<BaseProductEntity>`
      CASE
        WHEN ${p2.id} IS NOT NULL THEN JSON_OBJECT(
          'id', ${p2.id},
          'title', ${p2.title},
          'slug', ${p2.slug},
          'sku', ${p2.sku},
          'hsn', ${p2.hsn},
          'price', ${p2.price},
          'discounted_price', ${p2.discounted_price},
          'tax', ${p2.tax},
          'stock', ${p2.stock},
          'thumbnail', ${p2.thumbnail},
          'thumbnail_link',
            CASE
              WHEN ${p2.thumbnail} IS NOT NULL
              THEN CONCAT(${domain}, ${p2.thumbnail})
              ELSE NULL
            END
        )
        ELSE NULL
      END
    `.as('parent_product'),

    // ✅ categories
    categories,

    // ✅ colors
    colors: product_colors,

    // ✅ ingredients
    ingredients: sql<IngredientEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', col.id,
            'title', col.title
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
    related_products: sql<ProductRelatedEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', rp.id,
            'title', rp.title,
            'slug', rp.slug,
            'thumbnail', rp.thumbnail,
            'thumbnail_link',
              CASE
                WHEN rp.thumbnail IS NOT NULL
                THEN CONCAT(${domain}, rp.thumbnail)
                ELSE NULL
              END
          ) AS obj
          FROM related_product rpm
          JOIN product rp ON rpm.related_product_id = rp.id
          WHERE rpm.product_id = ${product.id}
        ) t
      )
    `.as('related_products'),
  };
};