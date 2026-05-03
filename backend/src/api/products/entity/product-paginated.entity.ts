import { base_product_select, categories, saved_percentage, saved_price, thumbnail_link } from './product.entity';

export const ProductPaginatedSelect = (domain: string) => ({
  ...base_product_select,

  // ✅ saved_price
  saved_price,

  // ✅ saved_percentage in 2 decimals
  saved_percentage,

  // ✅ thumbnail_link
  thumbnail_link: thumbnail_link(domain),

  // ✅ categories
  categories,
});