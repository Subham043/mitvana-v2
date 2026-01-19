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
  pincode: { link: "/pincode", name: "Pincode" },
  dashboard: { link: "/", name: "Dashboard" },
} as const;