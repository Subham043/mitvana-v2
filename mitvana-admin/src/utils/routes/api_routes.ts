/*
 * API routes list
 */

export const api_routes = {
  auth: {
    login: "/api/v1/auth/login",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
  },
  profile: {
    get: "/api/v1/profile",
    update: "/api/v1/profile",
    updatePassword: "/api/v1/profile/update-password",
    verify: "/api/v1/profile/verify",
    resendVerificationCode: "/api/v1/profile/resend-verification-code",
    refresh: "/api/v1/profile/refresh",
    logout: "/api/v1/profile/logout",
  },
  faq: {
    excel: "/api/v1/admin/faqs/excel",
    paginate: "/api/v1/admin/faqs/paginate",
    create: "/api/v1/admin/faqs/create",
    update: "/api/v1/admin/faqs/update",
    status: "/api/v1/admin/faqs/status",
    delete: "/api/v1/admin/faqs/delete",
    view: "/api/v1/admin/faqs/view",
  },
  textEditor: {
    imageUpload: "/api/v1/admin/texteditor-image"
  }
} as const;