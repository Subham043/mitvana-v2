/*
 * API routes list
 */

export const api_routes = {
    auth: {
        register: '/api/v1/auth/register',
        login: '/api/v1/user/login',
        logout: '/api/v1/auth/logout',
        forgot_password: '/api/v1/auth/forgot-password',
        reset_password: '/api/v1/auth/reset-password',
    },
} as const;