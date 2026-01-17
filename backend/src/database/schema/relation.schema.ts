import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { reset_password } from './reset_password.schema';
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

export const usersRelations = relations(users, ({ one, many }) => ({
    reset_password: one(reset_password, {
        fields: [users.id],
        references: [reset_password.user_id],
    }),
    address: many(address),
    product_review: many(product_review),
    wishlist: many(wishlist),
}));

export const resetPasswordRelations = relations(reset_password, ({ one }) => ({
    user: one(users, {
        fields: [reset_password.user_id],
        references: [users.id],
    }),
}));

export const addressRelations = relations(address, ({ one }) => ({
    user: one(users, {
        fields: [address.user_id],
        references: [users.id],
    }),
}));

export const productRelations = relations(product, ({ one, many }) => ({
    product_selected: one(product, {
        fields: [product.product_selected],
        references: [product.id],
    }),
    category: many(category),
    color: many(color),
    ingredient: many(ingredient),
    tag: many(tag),
    related_product: many(related_product),
    product_faq: many(product_faq),
    product_review: many(product_review),
    product_image: many(product_image),
    wishlist: many(wishlist),
    offer: many(offer),
    product_notify: many(product_notify),
}));

export const productReviewRelations = relations(product_review, ({ one }) => ({
    product: one(product, {
        fields: [product_review.product_id],
        references: [product.id],
    }),
    user: one(users, {
        fields: [product_review.user_id],
        references: [users.id],
    }),
}));

export const productImageRelations = relations(product_image, ({ one }) => ({
    product: one(product, {
        fields: [product_image.product_id],
        references: [product.id],
    }),
}));

export const productFaqRelations = relations(product_faq, ({ one }) => ({
    product: one(product, {
        fields: [product_faq.product_id],
        references: [product.id],
    }),
}));

export const productIngredientRelations = relations(product_ingredient, ({ one }) => ({
    product: one(product, {
        fields: [product_ingredient.product_id],
        references: [product.id],
    }),
    ingredient: one(ingredient, {
        fields: [product_ingredient.ingredient_id],
        references: [ingredient.id],
    }),
}));

export const productTagRelations = relations(product_tag, ({ one }) => ({
    product: one(product, {
        fields: [product_tag.product_id],
        references: [product.id],
    }),
    tag: one(tag, {
        fields: [product_tag.tag_id],
        references: [tag.id],
    }),
}));

export const relatedProductRelations = relations(related_product, ({ one }) => ({
    product: one(product, {
        fields: [related_product.product_id],
        references: [product.id],
    }),
    related_product: one(product, {
        fields: [related_product.related_product_id],
        references: [product.id],
    }),
}));

export const ProductCategoryRelations = relations(product_category, ({ one }) => ({
    product: one(product, {
        fields: [product_category.product_id],
        references: [product.id],
    }),
    category: one(category, {
        fields: [product_category.category_id],
        references: [category.id],
    }),
}));

export const productColorRelations = relations(product_color, ({ one }) => ({
    product: one(product, {
        fields: [product_color.product_id],
        references: [product.id],
    }),
    color: one(color, {
        fields: [product_color.color_id],
        references: [color.id],
    }),
}));

export const ingredientRelations = relations(ingredient, ({ many }) => ({
    product_ingredient: many(product_ingredient),
}));

export const tagRelations = relations(tag, ({ many }) => ({
    product_tag: many(product_tag),
}));

export const categoryRelations = relations(category, ({ many }) => ({
    product_category: many(product_category),
}));

export const colorRelations = relations(color, ({ many }) => ({
    product_color: many(product_color),
}));

export const productNotifyRelations = relations(product_notify, ({ one }) => ({
    product: one(product, {
        fields: [product_notify.product_id],
        references: [product.id],
    }),
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
    product: one(product, {
        fields: [wishlist.product_id],
        references: [product.id],
    }),
    user: one(users, {
        fields: [wishlist.user_id],
        references: [users.id],
    }),
}));

export const offerProductRelations = relations(offer_product, ({ one }) => ({
    product: one(product, {
        fields: [offer_product.product_id],
        references: [product.id],
    }),
    offer: one(offer, {
        fields: [offer_product.offer_id],
        references: [offer.id],
    }),
}));

export const offerRelations = relations(offer, ({ many }) => ({
    product: many(product),
}));