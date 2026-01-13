export type JwtPayload = {
    id: number;
    name: string;
    email: string;
    role: string;
    is_blocked: boolean;
    is_verified: boolean;
}

export type Token = {
    access_token: string;
    refresh_token: string;
};

export type JwtRefreshPayload = JwtPayload & { refreshToken: string };