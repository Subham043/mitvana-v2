import { offer } from "src/database/schema/offer.schema";

export type OfferEntity = typeof offer.$inferSelect
export type NewOfferEntity = typeof offer.$inferInsert & { products?: string[] }
export type UpdateOfferEntity = Omit<OfferEntity, 'id' | 'products' | 'createdAt' | 'updatedAt'> & { add_products?: string[], remove_products?: string[] };


export type OfferQueryEntityType = {
    id: string;
    title: string;
    description: string | null;
    discount_percentage: number;
    min_cart_value: number | null;
    max_discount: number | null;
    createdAt: Date;
    updatedAt: Date;
    products: {
        product: {
            id: string;
            title: string;
            slug: string;
        }
    }[];
}

export const OfferQuerySelect = () => ({
    columns: {
        id: true,
        title: true,
        description: true,
        discount_percentage: true,
        min_cart_value: true,
        max_discount: true,
        createdAt: true,
        updatedAt: true,
    },
    with: {
        products: {
            with: {
                product: {
                    columns: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                }
            }
        },
    },
})