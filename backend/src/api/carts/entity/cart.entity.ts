import { DBQueryConfig } from "drizzle-orm";
import { SchemaWithRelations } from "src/database/database.service";
import { cart } from "src/database/schema/cart.schema";

export type CartEntity = typeof cart.$inferSelect
export type NewCartEntity = typeof cart.$inferInsert

export type CartQueryEntityType = {
    user_id: string;
    is_mail_sent: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: {
        quantity: number;
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
        color: {
            id: string;
            name: string;
            code: string;
        } | null;
    }[];
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const CartQuerySelect = (domain: string) => ({
    columns: {
        user_id: true,
        is_mail_sent: true,
        createdAt: true,
        updatedAt: true,
    },
    with: {
        products: {
            columns: {
                quantity: true,
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
                color: {
                    columns: {
                        id: true,
                        name: true,
                        code: true,
                    },
                },
            }
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
    SchemaWithRelations["cart"]>