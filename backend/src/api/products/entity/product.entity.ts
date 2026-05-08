import { sql } from 'drizzle-orm';
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

export type BaseProductEntity = {
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

export type ProductCategoryEntity = {
  id: string;
  name: string;
  slug: string;
};

export type ColorEntity = { id: string; name: string };
export type IngredientEntity = { id: string; title: string };
export type TagEntity = { id: string; name: string };

export type ProductImageEntity = {
  id: string;
  image: string | null;
  image_link: string | null;
};

export type ProductFaqEntity = {
  id: string;
  question: string;
  answer: string;
};

export type ProductRelatedEntity = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  thumbnail_link: string | null;
};

export type ProductListEntity = BaseProductEntity & {
  sub_title: string | null;
  name: string | null;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  categories: ProductCategoryEntity[];
};

export type ProductQueryEntityType = ProductListEntity & {
  description: string | null;
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
  published_at: Date | null;
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


export const saved_price = sql<number>`
  CASE
    WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
    THEN ${product.price} - ${product.discounted_price}
    ELSE 0
  END
`.as('saved_price')

export const saved_percentage = sql<number>`
  CASE
    WHEN ${product.price} IS NOT NULL AND ${product.discounted_price} IS NOT NULL
    THEN ROUND(((${product.price} - ${product.discounted_price}) / ${product.price}) * 100, 2)
    ELSE 0
  END
`.as('saved_percentage')

export const thumbnail_link = (domain: string) => sql<string>`
  CASE
    WHEN ${product.thumbnail} IS NOT NULL
    THEN CONCAT(${domain}, ${product.thumbnail})
    ELSE NULL
  END
`.as('thumbnail_link')

export const base_product_select = {
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
  is_draft: product.is_draft,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
}

export const product_size_or_color_select = product.size_or_color;

export const product_info_select = {
  description: product.description,
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
}

export const categories = sql<ProductCategoryEntity[]>`
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
`.as('categories')

export const product_reviews_count = sql<number>`(
  SELECT COUNT(*)
  FROM product_review pr
  WHERE pr.product_id = ${product.id}
  AND pr.status = 'approved'
)`.as('reviews_count')

export const product_comments_count = sql<number>`(
  SELECT COUNT(*)
  FROM product_review pr
  WHERE pr.product_id = ${product.id}
  AND pr.comment IS NOT NULL
  AND pr.status = 'approved'
)`.as('comments_count')

export const product_tags = sql<TagEntity[]>`
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
`.as('tags')

export const product_images = (domain: string) => sql<ProductImageEntity[]>`
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
`.as('product_images')

export const is_in_wishlist_select = (safeUserId: string | -1) => sql<boolean>`
  EXISTS (
    SELECT 1
    FROM wishlist w
    WHERE w.product_id = ${product.id}
      AND w.user_id = ${safeUserId}
  )
`.as('is_in_wishlist')

export const product_colors = sql<ColorEntity[]>`
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
`.as('colors')

export const product_faqs = sql<ProductFaqEntity[]>`
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
`.as('product_faqs')