import { DBQueryConfig } from "drizzle-orm";
import { SchemaWithRelations } from "src/database/database.service";
import { product_review } from "src/database/schema/product_review.schema";

export type ProductReviewEntity = typeof product_review.$inferSelect
export type NewProductReviewEntity = typeof product_review.$inferInsert
export type UpdateProductReviewEntity = Omit<NewProductReviewEntity, 'id' | 'createdAt' | 'updatedAt' | 'user_id' | 'product_id'>

export type ProductReviewQueryEntityType = {
    id: string;
    rating: number;
    title: string;
    comment: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    product: {
        id: string;
        title: string;
        slug: string;
        sku: string | null;
        hsn: string | null;
        price: number;
        discounted_price: number | null;
        stock: number;
        thumbnail: string | null;
        thumbnail_link: string | null;
    };
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const ProductReviewQuerySelect = (domain: string) => ({
    columns: {
        id: true,
        rating: true,
        title: true,
        comment: true,
        status: true,
        createdAt: true,
        updatedAt: true,
    },
    with: {
        product: {
            columns: {
                id: true,
                title: true,
                slug: true,
                sku: true,
                hsn: true,
                price: true,
                discounted_price: true,
                stock: true,
                thumbnail: true,
            },
            extras: (fields, { sql }) => {
                return {
                    thumbnail_link: sql<string>`
            CASE
              WHEN ${fields.thumbnail} IS NOT NULL
              THEN CONCAT(${domain}, ${fields.thumbnail})
              ELSE NULL
            END
          `.as('thumbnail_link'),
                };
            },
        },
        user: {
            columns: {
                id: true,
                name: true,
                email: true,
            },
        },
    },
}) satisfies DBQueryConfig<'many', true, SchemaWithRelations,
    SchemaWithRelations["product_review"]>;