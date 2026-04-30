import { sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import { product } from 'src/database/schema/product.schema';
import { BaseProductEntity, ColorEntity, IngredientEntity, ProductCategoryEntity, ProductFaqEntity, ProductImageEntity, ProductRelatedEntity, TagEntity } from './product.entity';

export const ProductInfoSelect = (domain: string) => {
    const p2 = alias(product, 'p2');
    return {
        // base fields
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
        size_or_color: product.size_or_color,
        bought_text: product.bought_text,
        product_bought: product.product_bought,
        og_site_name: product.og_site_name,
        how_to_use: product.how_to_use,
        features: product.features,
        meta_description: product.meta_description,
        facebook_description: product.facebook_description,
        twitter_description: product.twitter_description,
        custom_script: product.custom_script,
        product_selected: product.product_selected,
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

        // ✅ saved_percentage
        saved_percentage: sql<number>`
        CASE
          WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
          THEN ROUND(((${product.price} - ${product.discounted_price}) / ${product.price}) * 100, 2)
          ELSE 0
        END
      `.as('saved_percentage'),

        // thumbnail link
        thumbnail_link: sql<string>`
      CASE
        WHEN ${product.thumbnail} IS NOT NULL
        THEN CONCAT(${domain}, ${product.thumbnail})
        ELSE NULL
      END
    `.as('thumbnail_link'),

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
          WHERE pc.product_id = ${product.id}
        ) t
      )
    `.as('categories'),

        // ✅ colors
        colors: sql<ColorEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', col.id,
            'name', col.name
          ) AS obj
          FROM product_color pc
          JOIN color col ON pc.color_id = col.id
          WHERE pc.product_id = ${product.id}
        ) t
      )
    `.as('colors'),

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
          WHERE pt.product_id = ${product.id}
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
      )
    `.as('product_images'),

        // ✅ faqs
        product_faqs: sql<ProductFaqEntity[]>`
      (
        SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
        FROM (
          SELECT DISTINCT JSON_OBJECT(
            'id', pf.id,
            'question', pf.question,
            'answer', pf.answer
          ) AS obj
          FROM product_faq pf
          WHERE pf.product_id = ${product.id}
        ) t
      )
    `.as('product_faqs'),

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