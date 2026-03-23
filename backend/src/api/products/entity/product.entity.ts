import { sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';
import { category } from 'src/database/schema';
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
    related_products: BaseProductEntity[];
    colors: ColorEntity[];
    ingredients: IngredientEntity[];
    tags: TagEntity[];
    product_faqs: ProductFaqEntity[];
    product_images: ProductImageEntity[];
    is_draft: boolean;
    createdAt: Date;
    updatedAt: Date;
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

    // ✅ thumbnail_link
    thumbnail_link: sql<string>`
      CASE
        WHEN ${product.thumbnail} IS NOT NULL
        THEN CONCAT(${domain}, ${product.thumbnail})
        ELSE NULL
      END
    `.as('thumbnail_link'),

    // ✅ categories array (no wrapper)
    categories: sql<ProductCategoryEntity[]>`
      CASE
    WHEN COUNT(${category.id}) = 0 THEN JSON_ARRAY()
    ELSE JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', ${category.id},
        'name', ${category.name},
        'slug', ${category.slug}
      )
    )
  END
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

        // thumbnail link
        thumbnail_link: sql<string>`
      CASE
        WHEN ${product.thumbnail} IS NOT NULL
        THEN CONCAT(${domain}, ${product.thumbnail})
        ELSE NULL
      END
    `.as('thumbnail_link'),

        // ✅ parent_product (JOIN)
        parent_product: sql`
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
        categories: sql`
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
        colors: sql`
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
        ingredients: sql`
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
        tags: sql`
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
        product_images: sql`
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

        // ✅ related products
        related_products: sql`
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
