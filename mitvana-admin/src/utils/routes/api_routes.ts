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
  colors: {
    excel: "/api/v1/color/excel",
    paginate: "/api/v1/color",
    create: "/api/v1/color",
    update: "/api/v1/color",
    delete: "/api/v1/color",
    view: "/api/v1/color",
  },
  tags: {
    paginate: "/api/v1/tag",
    create: "/api/v1/tag",
    update: "/api/v1/tag",
    delete: "/api/v1/tag",
    view: "/api/v1/tag",
  },
  users: {
    paginate: "/api/v1/user",
    create: "/api/v1/user",
    update: "/api/v1/user",
    status: "/api/v1/user",
    delete: "/api/v1/user",
    view: "/api/v1/user",
    toggleBlock: "/api/v1/user/toggle-block",
    verify: "/api/v1/user/verify",
  },
  textEditor: {
    imageUpload: "/api/v1/admin/texteditor-image"
  }
} as const;