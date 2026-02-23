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
    }
} as const;