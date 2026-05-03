import { base_product_select, is_in_wishlist_select, product_comments_count, product_images, product_reviews_count, product_size_or_color_select, product_tags, saved_percentage, saved_price, thumbnail_link } from './product.entity';

export const PublicProductPaginatedSelect = (domain: string, userId?: string) => {
  const safeUserId = userId ?? -1;
  return {
    ...base_product_select,

    size_or_color: product_size_or_color_select,

    is_in_wishlist: is_in_wishlist_select(safeUserId),

    // ✅ saved_price
    saved_price,

    // ✅ saved_percentage
    saved_percentage,

    // ✅ thumbnail_link
    thumbnail_link: thumbnail_link(domain),

    // ✅ reviewsCount
    reviews_count: product_reviews_count,

    // ✅ commentsCount
    comments_count: product_comments_count,

    // ✅ tags
    tags: product_tags,

    // ✅ images
    product_images: product_images(domain),
  }
};