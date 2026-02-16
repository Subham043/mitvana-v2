import { product } from "src/database/schema/product.schema";

export type ProductEntity = typeof product.$inferSelect & { thumbnail_link?: string }
export type NewProductEntity = typeof product.$inferInsert & { related_products?: string[], colors?: string[], tags?: string[], ingredients?: string[], categories?: string[], faqs?: { question: string, answer: string }[], images?: string[] }
export type UpdateProductEntity = Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt' | "related_products" | "colors" | "tags" | "ingredients" | "categories" | "faqs" | 'thumbnail'> & { add_related_products?: string[], remove_related_products?: string[], add_colors?: string[], remove_colors?: string[], add_tags?: string[], remove_tags?: string[], add_ingredients?: string[], remove_ingredients?: string[], add_categories?: string[], remove_categories?: string[], add_faqs?: { question: string, answer: string }[], update_faqs?: { question: string, answer: string, id: string }[], remove_faqs?: string[], thumbnail?: string, images?: string[] }

export type ProductListEntity = {
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
    categories: {
        category: {
            id: string;
            name: string;
            slug: string;
        }
    }[];
    is_draft: boolean;
    created_at: Date;
    updated_at: Date;
}

export const ProductListSelect = (domain: string) => ({
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
        categories: {
            with: {
                category: {
                    columns: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                }
            }
        },
    },
})

export type ProductQueryEntityType = ProductListEntity & {
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
        id: string;
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
    related_products: {
        related_product: {
            id: string;
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
        }
    }[];
    colors: {
        color: {
            id: string;
            name: string;
        }
    }[];
    ingredients: {
        ingredient: {
            id: string;
            title: string;
        }
    }[];
    tags: {
        tag: {
            id: string;
            name: string;
        }
    }[];
    product_faqs: {
        id: string;
        question: string;
        answer: string;
    }[];
    product_images: {
        id: string;
        image: string;
        image_link: string | null;  // ✅ computed field
    }[];
    is_draft: boolean;
    created_at: Date;
    updated_at: Date;
};

export const ProductQuerySelect = (domain: string) => ({
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
        product_selected: true,
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
        parent_product: {
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
        related_products: {
            with: {
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
                }
            }
        },
        categories: {
            with: {
                category: {
                    columns: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                }
            }
        },
        colors: {
            with: {
                color: {
                    columns: {
                        id: true,
                        name: true,
                    },
                }
            }
        },
        ingredients: {
            with: {
                ingredient: {
                    columns: {
                        id: true,
                        title: true,
                    },
                }
            }
        },
        tags: {
            with: {
                tag: {
                    columns: {
                        id: true,
                        name: true,
                    },
                }
            }
        },
        product_images: {
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
        product_faqs: {
            columns: {
                id: true,
                question: true,
                answer: true,
            },
        },
    },
})