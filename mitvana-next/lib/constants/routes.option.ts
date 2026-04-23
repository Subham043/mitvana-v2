/*
 * API routes list
 */

export const api_routes = {
    auth: {
        register: '/api/v1/auth/register',
        login: '/api/v1/auth/login',
        forgot_password: '/api/v1/auth/forgot-password',
        reset_password: '/api/v1/auth/reset-password',
    },
    account: {
        get: '/api/v1/profile',
        update: '/api/v1/profile',
        update_password: '/api/v1/profile/update-password',
        verify: '/api/v1/profile/verify',
        resend_verification_code: '/api/v1/profile/resend-verification-code',
        refresh: '/api/v1/profile/refresh',
        logout: '/api/v1/profile/logout',
    },
    subscription: {
        create: "/api/v1/subscription"
    },
    product: {
        get: "/api/v1/product/published/public",
        view: "/api/v1/product/slug",
        review: {
            create: "/api/v1/product-review",
            stats: "/api/v1/product-review/product",
        }
    },
    orders: {
        paginate: "/api/v1/order/user",
        view: "/api/v1/order/user",
        cancel: "/api/v1/order/cancel",
        pdf: "/api/v1/order/pdf",
    },
    category: {
        paginate: "/api/v1/category",
    },
    cart: {
        get: "/api/v1/cart",
        post: "/api/v1/cart",
    },
    pincode: {
        check: "/api/v1/pincode/check",
    },
    address: {
        get: "/api/v1/address",
        create: "/api/v1/address",
        update: "/api/v1/address",
        delete: "/api/v1/address"
    }
} as const;