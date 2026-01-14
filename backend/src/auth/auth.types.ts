export type JwtPayload = {
    id: string;
    name: string;
    email: string;
    is_blocked: boolean;
    is_admin: boolean;
    is_verified: boolean;
}

export type Token = {
    access_token: string;
    refresh_token: string;
};

export type JwtRefreshPayload = JwtPayload & { refreshToken: string };