/*
 * Page routes list
 */
export const page_routes = {
  profile: { link: "/profile", name: "Profile" },
  login: { link: "/login", name: "Login" },
  forgot_password: { link: "/forgot-password", name: "Forgot Password" },
  reset_password: { link: "/reset-password", name: "Reset Password" },
  users: { link: "/users", name: "Users" },
  colors: { link: "/colors", name: "Colors" },
  tags: { link: "/tags", name: "Tags" },
  subscriptions: { link: "/subscriptions", name: "Subscriptions" },
  pincode: { link: "/pincode", name: "Pincodes" },
  categories: { link: "/categories", name: "Categories" },
  heroImage: { link: "/hero-image", name: "Hero Images" },
  ingredients: { link: "/ingredients", name: "Ingredients" },
  couponCodes: { link: "/coupon-codes", name: "Coupon Codes" },
  offers: { link: "/offers", name: "Offers" },
  settings: { link: "/settings", name: "Settings" },
  edit_product: { link: "/products/edit/", name: "Edit Product" },
  clone_product: { link: "/products/clone/", name: "Clone Product" },
  add_product: { link: "/products/add", name: "Add Product" },
  products: { link: "/products", name: "Products" },
  dashboard: { link: "/", name: "Dashboard" },
} as const;