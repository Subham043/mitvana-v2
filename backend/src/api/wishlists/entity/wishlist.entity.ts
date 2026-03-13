import { wishlist } from "src/database/schema/wishlist.schema";

export type WishlistEntity = typeof wishlist.$inferSelect
export type NewWishlistEntity = typeof wishlist.$inferInsert

export type WishlistQueryEntityType = {
    user_id: string;
    product_id: string;
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

export const WishlistQuerySelect = (domain: string) => ({
    columns: {
        product_id: true,
        user_id: true,
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
})