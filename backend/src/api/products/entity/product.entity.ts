import { sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import { product } from 'src/database/schema/product.schema';

export type ProductEntity = typeof product.$inferSelect & {
  thumbnail_link?: string;
};
export type NewProductEntity = typeof product.$inferInsert & {
  related_products?: string[];
  colors?: string[];
  tags?: string[];
  ingredients?: string[];
  categories?: string[];
  faqs?: { question: string; answer: string }[];
  images?: string[];
};
export type UpdateProductEntity = Omit<
  ProductEntity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'related_products'
  | 'colors'
  | 'tags'
  | 'ingredients'
  | 'categories'
  | 'faqs'
  | 'thumbnail'
> & {
  add_related_products?: string[];
  remove_related_products?: string[];
  add_colors?: string[];
  remove_colors?: string[];
  add_tags?: string[];
  remove_tags?: string[];
  add_ingredients?: string[];
  remove_ingredients?: string[];
  add_categories?: string[];
  remove_categories?: string[];
  add_faqs?: { question: string; answer: string }[];
  update_faqs?: { question: string; answer: string; id: string }[];
  remove_faqs?: string[];
  thumbnail?: string;
  images?: string[];
};

type BaseProductEntity = {
  id: string;
  title: string;
  slug: string;
  hsn: string | null;
  sku: string | null;
  price: number;
  discounted_price: number | null;
  saved_price: number | null;
  saved_percentage: number | null;
  tax: number | null;
  stock: number | null;
  thumbnail: string | null;
  thumbnail_link: string | null;
};

type ProductCategoryEntity = {
  id: string;
  name: string;
  slug: string;
};

type ColorEntity = { id: string; name: string };
type IngredientEntity = { id: string; title: string };
type TagEntity = { id: string; name: string };

type ProductImageEntity = {
  id: string;
  image: string | null;
  image_link: string | null;
};

type ProductFaqEntity = {
  id: string;
  question: string;
  answer: string;
};

type ProductRelatedEntity = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  thumbnail_link: string | null;
};

export type ProductListEntity = BaseProductEntity & {
  sub_title: string | null;
  name: string | null;
  description: string | null;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: ProductCategoryEntity[];
};

export type ProductQueryEntityType = ProductListEntity & {
  size_or_color: string | null;
  bought_text: string | null;
  product_bought: number | null;
  og_site_name: string | null;
  how_to_use: string | null;
  features: string | null;
  meta_description: string | null;
  facebook_description: string | null;
  twitter_description: string | null;
  custom_script: string | null;
  product_selected: BaseProductEntity | null;
  related_products: ProductRelatedEntity[];
  colors: ColorEntity[];
  ingredients: IngredientEntity[];
  tags: TagEntity[];
  product_faqs: ProductFaqEntity[];
  product_images: ProductImageEntity[];
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicProductListEntity = BaseProductEntity & {
  sub_title: string | null;
  name: string | null;
  size_or_color: string | null;
  reviews_count: number;
  comments_count: number;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: TagEntity[];
  product_images: ProductImageEntity[];
};

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

export const PublicProductInfoSelect = (domain: string, userId?: string) => {
  const siblingP = alias(product, 'siblingP');
  const safeUserId = userId ?? -1;
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

    // thumbnail link
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
            'image_link', (
              CASE
                WHEN pi.image IS NOT NULL
                THEN CONCAT(${domain}, pi.image)
                ELSE NULL
              END)
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
