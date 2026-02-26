/*
 * API routes list
 */

export const api_routes = {
    auth: {
        register: '/api/v1/user/register',
        login: '/api/v1/user/login',
        logout: '/api/v1/user/logout',
        forgot_password: '/api/v1/user/request-password-reset',
        reset_password: '/api/v1/user/reset-password',
    },
    account: {
        get: '/api/v1/user/profile',
        update: '/api/v1/user/profile',
        update_password: '/api/v1/user/change-password',
    },
    address: {
        get: "/api/v1/user/address",
        create: "/api/v1/user/address",
        update: "/api/v1/user/address",
        delete: "/api/v1/user/address"
    }
} as const;