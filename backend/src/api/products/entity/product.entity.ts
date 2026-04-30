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
