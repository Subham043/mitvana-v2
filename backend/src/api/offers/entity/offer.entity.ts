import { sql } from "drizzle-orm";
import { product } from "src/database/schema";
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

  products: sql<ProductType[]>`
      CASE
      WHEN COUNT(${product.id}) = 0 THEN JSON_ARRAY()
      ELSE JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', ${product.id},
                'title', ${product.title},
                'slug', ${product.slug}
            )
          )
        END
    `.as('products'),
};