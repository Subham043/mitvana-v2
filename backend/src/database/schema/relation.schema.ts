import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { address } from './address.schema';
import { product } from './product.schema';
import { product_review } from './product_review.schema';
import { product_image } from './product_image.schema';
import { product_faq } from './product_faq.schema';
import { product_ingredient } from './product_ingredient.schema';
import { product_tag } from './product_tag.schema';
import { related_product } from './related_product.schema';
import { product_category } from './product_category.schema';
import { product_color } from './product_color.schema';
import { ingredient } from './ingredient.schema';
import { tag } from './tag.schema';
import { category } from './category.schema';
import { color } from './color.schema';
import { product_notify } from './product_notify.schema';
import { wishlist } from './wishlist.schema';
import { offer_product } from './offer_product.schema';
import { offer } from './offer.schema';

// users relations
export const usersRelations = relations(users, ({ many }) => ({
    address: many(address), // one user has many addresses
    product_review: many(product_review), // one user has many product reviews
    wishlist: many(wishlist), // one user has many wishlists
}));

// address relations
export const addressRelations = relations(address, ({ one }) => ({
    user: one(users, {
        fields: [address.user_id],
        references: [users.id],
    }), // one address belongs to one user
}));

// product relations
export const productRelations = relations(product, ({ one, many }) => ({
    parent_product: one(product, {
        fields: [product.product_selected],
        references: [product.id],
        relationName: "parent_product",
    }), // one product can have one parent product
    child_products: many(product, {
        relationName: "parent_product",
    }), // one product can have many child products

    // many-to-many through junction tables
    categories: many(product_category), // one product can have many categories
    colors: many(product_color), // one product can have many colors
    ingredients: many(product_ingredient), // one product can have many ingredients
    tags: many(product_tag), // one product can have many tags
    related_products: many(related_product, {
        relationName: "product_related",
    }), // one product can have many related products
    offer: many(offer_product), // one product can have many offers

    // direct FK tables
    product_faqs: many(product_faq), // one product can have many faqs
    product_reviews: many(product_review), // one product can have many reviews
    product_images: many(product_image), // one product can have many images
    wishlists: many(wishlist), // one product can have many wishlists
    product_notifies: many(product_notify), // one product can have many notifications
}));

// product review relations
export const productReviewRelations = relations(product_review, ({ one }) => ({
    product: one(product, {
        fields: [product_review.product_id],
        references: [product.id],
    }), // one product review belongs to one product
    user: one(users, {
        fields: [product_review.user_id],
        references: [users.id],
    }), // one product review belongs to one user
}));

// product image relations
export const productImageRelations = relations(product_image, ({ one }) => ({
    product: one(product, {
        fields: [product_image.product_id],
        references: [product.id],
    }), // one product image belongs to one product
}));

// product faq relations
export const productFaqRelations = relations(product_faq, ({ one }) => ({
    product: one(product, {
        fields: [product_faq.product_id],
        references: [product.id],
    }), // one product faq belongs to one product
}));

// product ingredient relations
export const productIngredientRelations = relations(product_ingredient, ({ one }) => ({
    product: one(product, {
        fields: [product_ingredient.product_id],
        references: [product.id],
    }), // one product ingredient belongs to one product
    ingredient: one(ingredient, {
        fields: [product_ingredient.ingredient_id],
        references: [ingredient.id],
    }), // one product ingredient belongs to one ingredient
}));

// product tag relations
export const productTagRelations = relations(product_tag, ({ one }) => ({
    product: one(product, {
        fields: [product_tag.product_id],
        references: [product.id],
    }), // one product tag belongs to one product
    tag: one(tag, {
        fields: [product_tag.tag_id],
        references: [tag.id],
    }), // one product tag belongs to one tag
}));

// related product relations
export const relatedProductRelations = relations(related_product, ({ one }) => ({
    product: one(product, {
        fields: [related_product.product_id],
        references: [product.id],
        relationName: "product_related",
    }), // one related product belongs to one product
    related_product: one(product, {
        fields: [related_product.related_product_id],
        references: [product.id],
    }), // one related product belongs to one related product
}));

// product category relations
export const productCategoryRelations = relations(product_category, ({ one }) => ({
    product: one(product, {
        fields: [product_category.product_id],
        references: [product.id],
    }), // one product category belongs to one product
    category: one(category, {
        fields: [product_category.category_id],
        references: [category.id],
    }), // one product category belongs to one category
}));

// product color relations
export const productColorRelations = relations(product_color, ({ one }) => ({
    product: one(product, {
        fields: [product_color.product_id],
        references: [product.id],
    }), // one product color belongs to one product
    color: one(color, {
        fields: [product_color.color_id],
        references: [color.id],
    }), // one product color belongs to one color
}));

// ingredient relations
export const ingredientRelations = relations(ingredient, ({ many }) => ({
    products: many(product_ingredient), // one ingredient can have many products
}));

// tag relations
export const tagRelations = relations(tag, ({ many }) => ({
    products: many(product_tag), // one tag can have many products
}));

// category relations
export const categoryRelations = relations(category, ({ many }) => ({
    products: many(product_category), // one category can have many products
}));

// color relations
export const colorRelations = relations(color, ({ many }) => ({
    products: many(product_color), // one color can have many products
}));

// product notify relations
export const productNotifyRelations = relations(product_notify, ({ one }) => ({
    product: one(product, {
        fields: [product_notify.product_id],
        references: [product.id],
    }), // one product notify belongs to one product
}));

// wishlist relations
export const wishlistRelations = relations(wishlist, ({ one }) => ({
    product: one(product, {
        fields: [wishlist.product_id],
        references: [product.id],
    }), // one wishlist belongs to one product
    user: one(users, {
        fields: [wishlist.user_id],
        references: [users.id],
    }), // one wishlist belongs to one user
}));

// offer product relations
export const offerProductRelations = relations(offer_product, ({ one }) => ({
    product: one(product, {
        fields: [offer_product.product_id],
        references: [product.id],
    }), // one offer product belongs to one product
    offer: one(offer, {
        fields: [offer_product.offer_id],
        references: [offer.id],
    }), // one offer product belongs to one offer
}));

// offer relations
export const offerRelations = relations(offer, ({ many }) => ({
    products: many(offer_product), // one offer can have many products
}));