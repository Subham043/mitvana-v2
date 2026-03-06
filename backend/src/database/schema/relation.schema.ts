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
import { cart } from './cart.schema';
import { cart_product } from './cart_product.schema';
import { pincode } from './pincode.schema';
import { order } from './order.schema';
import { order_product } from './order_product.schema';
import { order_address } from './order_address.schema';
import { order_coupon_applied } from './order_coupon_applied.schema';
import { order_razorpay_payment } from './order_razorpay_payment.schema';
import { order_shipment_check_points } from './order_shipment_check_points.schema';
import { order_shipment_tracking_nos } from './order_shipment_tracking_nos.schema';
import { order_shipment } from './order_shipment.schema';
import { coupon_code } from './coupon_code.schema';

// users relations
export const usersRelations = relations(users, ({ many, one }) => ({
    address: many(address), // one user has many addresses
    product_review: many(product_review), // one user has many product reviews
    wishlist: many(wishlist), // one user has many wishlists
    cart: one(cart, {
        fields: [users.id],
        references: [cart.user_id],
    }), // one user has one cart
    cart_products: many(cart_product), // one user has many cart products
    orders: many(order), // one user has many cart orders
}));

// address relations
export const addressRelations = relations(address, ({ one, many }) => ({
    user: one(users, {
        fields: [address.user_id],
        references: [users.id],
    }), // one address belongs to one user
    pincode: one(pincode, {
        fields: [address.postal_code],
        references: [pincode.pincode],
    }), // one address belongs to one pincode
    orders: many(order_address)
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
    cart: many(cart_product), // one product can have many carts
    order: many(order_product), // one product can have many orders

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
    cart_products: many(cart_product), // one color can have many cart products
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

// coupon code relations
export const couponCodeRelations = relations(coupon_code, ({ many }) => ({
    orders: many(order_coupon_applied), // one coupon code can have many orders
}));

// order coupon code relations
export const orderCouponCodeRelations = relations(order_coupon_applied, ({ one }) => ({
    order: one(order, {
        fields: [order_coupon_applied.order_id],
        references: [order.id],
    }), // one order coupon code belongs to one order
    coupon_code: one(coupon_code, {
        fields: [order_coupon_applied.coupon_code],
        references: [coupon_code.code],
    }), // one order coupon code belongs to one coupon code
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

// cart relations
export const cartRelations = relations(cart, ({ many, one }) => ({
    products: many(cart_product), // one cart can have many products
    user: one(users, {
        fields: [cart.user_id],
        references: [users.id],
    }), // one cart belongs to one user
}));

// cart product relations
export const cartProductRelations = relations(cart_product, ({ one }) => ({
    cart: one(cart, {
        fields: [cart_product.cart_user_id],
        references: [cart.user_id],
    }), // one cart product belongs to one cart
    user: one(users, {
        fields: [cart_product.cart_user_id],
        references: [users.id],
    }), // one cart product belongs to one user
    product: one(product, {
        fields: [cart_product.product_id],
        references: [product.id],
    }), // one cart product belongs to one product
    color: one(color, {
        fields: [cart_product.color_id],
        references: [color.id],
    }), // one cart product belongs to one color
}));

// pincode relations
export const pincodeRelations = relations(pincode, ({ many }) => ({
    addresses: many(address), // one pincode can have many addresses
}));

//order relations
export const orderRelations = relations(order, ({ many, one }) => ({
    products: many(order_product), // one order can have many products
    user: one(users, {
        fields: [order.user_id],
        references: [users.id],
    }), // one order belongs to one user
    address: one(order_address, {
        fields: [order.id],
        references: [order_address.order_id],
    }), // one order belongs to one address
    coupon: one(order_coupon_applied, {
        fields: [order.id],
        references: [order_coupon_applied.order_id],
    }), // one order belongs to one coupon
    razorpay: one(order_razorpay_payment, {
        fields: [order.id],
        references: [order_razorpay_payment.order_id],
    }), // one order belongs to one razorpay
    shipment_check_points: many(order_shipment_check_points), //one order can have many check points
    shipment_tracking_nos: many(order_shipment_tracking_nos), //one order can have many tracking nos
    shipment: one(order_shipment, {
        fields: [order.id],
        references: [order_shipment.order_id],
    }), // one order belongs to one shipment
}));

//order product relation
export const orderProductRelations = relations(order_product, ({ one }) => ({
    product: one(product, {
        fields: [order_product.product_id],
        references: [product.id],
    }), // one order product belongs to one product
    order: one(order, {
        fields: [order_product.order_id],
        references: [order.id],
    }), // one order product belongs to one order
}))

//order address relation
export const orderAddressRelations = relations(order_address, ({ one }) => ({
    address: one(address, {
        fields: [order_address.address_id],
        references: [address.id],
    }), // one order address belongs to one address
    order: one(order, {
        fields: [order_address.order_id],
        references: [order.id],
    }), // one order address belongs to one order
}))

//order razorpay relation
export const orderRazorpayRelations = relations(order_razorpay_payment, ({ one }) => ({
    order: one(order, {
        fields: [order_razorpay_payment.order_id],
        references: [order.id],
    }), // one razorpay belongs to one order
}))

//order shipment check points relation
export const orderShipmentCheckPointsRelations = relations(order_shipment_check_points, ({ one }) => ({
    order: one(order, {
        fields: [order_shipment_check_points.order_id],
        references: [order.id],
    }), // one shipment check point belongs to one order
    shipment: one(order_shipment, {
        fields: [order_shipment_check_points.order_id],
        references: [order_shipment.order_id],
    }), // one shipment check point belongs to one shipment
}))

//order tracking nos relation
export const orderTrackingNosRelations = relations(order_shipment_tracking_nos, ({ one }) => ({
    order: one(order, {
        fields: [order_shipment_tracking_nos.order_id],
        references: [order.id],
    }), // one shipment tracking no belongs to one order
    shipment: one(order_shipment, {
        fields: [order_shipment_tracking_nos.order_id],
        references: [order_shipment.order_id],
    }), // one shipment tracking no belongs to one shipment
}))

//order shipment relation
export const orderShipmentRelations = relations(order_shipment, ({ one, many }) => ({
    order: one(order, {
        fields: [order_shipment.order_id],
        references: [order.id],
    }), // one shipment belongs to one order
    shipment_check_points: many(order_shipment_check_points), //one order can have many check points
    shipment_tracking_nos: many(order_shipment_tracking_nos), //one order can have many tracking nos
}))