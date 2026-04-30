import { sql } from "drizzle-orm";
import { offer } from "src/database/schema/offer.schema";

export type OfferEntity = typeof offer.$inferSelect
export type NewOfferEntity = typeof offer.$inferInsert & { products?: string[] }
export type UpdateOfferEntity = Omit<OfferEntity, 'id' | 'products' | 'createdAt' | 'updatedAt'> & { add_products?: string[], remove_products?: string[] };

export type ProductType = {
  id: string;
  title: string;
  slug: string;
}

export type OfferQueryEntityType = {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number;
  min_cart_value: number | null;
  max_discount: number | null;
  is_draft: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: ProductType[];
}

export const OfferSelect = {
  id: offer.id,
  title: offer.title,
  description: offer.description,
  discount_percentage: offer.discount_percentage,
  min_cart_value: offer.min_cart_value,
  max_discount: offer.max_discount,
  is_draft: offer.is_draft,
  createdAt: offer.createdAt,
  updatedAt: offer.updatedAt,

  // ✅ products
  products: sql<ProductType[]>`
    (
      SELECT COALESCE(JSON_ARRAYAGG(obj), JSON_ARRAY())
      FROM (
        SELECT DISTINCT JSON_OBJECT(
          'id', c.id,
          'title', c.title,
          'slug', c.slug
        ) AS obj
        FROM offer_product op
        JOIN product c ON op.product_id = c.id
        WHERE op.offer_id = ${sql.raw('offer.id')}
      ) t
    )
  `.as('products'),
};