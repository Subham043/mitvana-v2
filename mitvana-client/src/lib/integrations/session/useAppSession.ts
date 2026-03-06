// utils/session.ts
import type { AuthType, TokenType } from '@/lib/type'
import { useSession } from '@tanstack/react-start/server'

export type SessionData = {
    id: AuthType['id']
    email: AuthType['email']
    name: AuthType['name']
    phone: AuthType['phone']
    is_admin: AuthType['is_admin']
    is_blocked: AuthType['is_blocked']
    is_verified: AuthType['is_verified']
    access_token: TokenType['access_token']
    refresh_token: TokenType['refresh_token']
}

export function useAppSession() {
    return useSession<SessionData>({
        // Session configuration
        maxAge: 60 * 60 * 24 * 1,
        name: 'mitvana-client-session',
        sessionHeader: 'x-mitvana-session',
        password: process.env.SESSION_SECRET!, // At least 32 characters
        // Optional: customize cookie settings
        cookie: {
            //   domain: process.env.DOMAIN,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1, // 1 day
            expires: new Date(Date.now() + 60 * 60 * 24 * 1 * 1000),
        },
    })
}