export class UserResetPasswordRequestEvent {
    name: string;
    email: string;
    token: string;
    expires_at: Date;

    constructor(name: string, email: string, token: string, expires_at: Date) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.expires_at = expires_at;
    }
}

export type UserResetPasswordRequestPayload = {
    name: string;
    email: string;
    token: string;
    expires_at: Date;
}