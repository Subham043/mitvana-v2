import { sql } from "drizzle-orm";
import { product } from "src/database/schema";

export type ProductEntity = typeof product.$inferSelect & { thumbnail_link?: string }
export type NewProductEntity = typeof product.$inferInsert
export type UpdateProductEntity = Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt' | 'thumbnail'> & { thumbnail?: string }

export type ProductQueryEntityType = {
    id: number;
    title: string;
    sub_title: string | null;
    name: string | null;
    slug: string;
    hsn: string | null;
    sku: string | null;
    description: string | null;
    price: number;
    discounted_price: number | null;
    tax: number | null;
    stock: number;
    thumbnail: string | null;
    thumbnail_link: string | null;   // ✅ computed field
    size_or_color: string | null;
    bought_text: string | null;
    product_bought: number | null;
    og_site_name: string | null;
    how_to_use: string | null;
    meta_description: string | null;
    facebook_description: string | null;
    twitter_description: string | null;
    custom_script: string | null;
    product_selected: {
        id: number;
        title: string;
        slug: string;
        sku: string | null;
        hsn: string | null;
        price: number;
        discounted_price: number | null;
        tax: number | null;
        stock: number;
        thumbnail: string | null;
        thumbnail_link: string | null;  // ✅ computed field
    } | null;
    related_product: {
        id: number;
        title: string;
        slug: string;
        sku: string | null;
        hsn: string | null;
        price: number;
        discounted_price: number | null;
        tax: number | null;
        stock: number;
        thumbnail: string | null;
        thumbnail_link: string | null;  // ✅ computed field
    }[];
    category: {
        id: number;
        name: string;
        slug: string;
    }[];
    color: {
        id: number;
        name: string;
    }[];
    ingredient: {
        id: number;
        name: string;
    }[];
    tag: {
        id: number;
        name: string;
    }[];
    product_image: {
        id: number;
        image: string;
        image_link: string | null;  // ✅ computed field
    }[];
    is_draft: boolean;
    created_at: Date;
    updated_at: Date;
};

export const ProductSelect = (domain: string) => ({
    columns: {
        id: true,
        title: true,
        sub_title: true,
        name: true,
        slug: true,
        hsn: true,
        sku: true,
        description: true,
        price: true,
        discounted_price: true,
        tax: true,
        stock: true,
        thumbnail: true,
        size_or_color: true,
        bought_text: true,
        product_bought: true,
        og_site_name: true,
        how_to_use: true,
        meta_description: true,
        facebook_description: true,
        twitter_description: true,
        custom_script: true,
        is_draft: true,
        created_at: true,
        updated_at: true,
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
    with: {
        product_selected: {
            columns: {
                id: true,
                title: true,
                slug: true,
                sku: true,
                hsn: true,
                price: true,
                discounted_price: true,
                tax: true,
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
        related_product: {
            columns: {
                id: true,
                title: true,
                slug: true,
                sku: true,
                hsn: true,
                price: true,
                discounted_price: true,
                tax: true,
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
        category: {
            columns: {
                id: true,
                name: true,
                slug: true,
            },
        },
        color: {
            columns: {
                id: true,
                name: true,
            },
        },
        ingredient: {
            columns: {
                id: true,
                title: true,
            },
        },
        tag: {
            columns: {
                id: true,
                name: true,
            },
        },
        product_image: {
            columns: {
                id: true,
                image: true,
            },
            extras: (fields, { sql }) => {
                return {
                    image_link: sql<string>`
                        CASE
                        WHEN ${fields.image} IS NOT NULL
                        THEN CONCAT(${domain}, ${fields.image})
                        ELSE NULL
                        END
                    `.as('image_link'),
                };
            },
        },
    },
})

export type ProductListEntity = Omit<ProductEntity, 'size_or_color' | 'bought_text' | 'product_bought' | 'og_site_name' | 'how_to_use' | 'meta_description' | 'facebook_description' | 'twitter_description' | 'custom_script' | 'product_selected'> & { thumbnail_link?: string }

export const ProductListSelect = (domain: string) => ({
    id: product.id,
    title: product.title,
    sub_title: product.sub_title,
    hsn: product.hsn,
    sku: product.sku,
    price: product.price,
    discounted_price: product.discounted_price,
    tax: product.tax,
    stock: product.stock,
    name: product.name,
    slug: product.slug,
    description: product.description,
    thumbnail: product.thumbnail,
    thumbnail_link: sql<string>`
    CASE
        WHEN ${product.thumbnail} IS NOT NULL
        THEN CONCAT(${sql.raw(`'${domain}'`)}, ${product.thumbnail})
        ELSE NULL
    END
    `,
    is_draft: product.is_draft,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
})