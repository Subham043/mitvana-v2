export class ProfileResendVerificationCodeEvent {
    name: string;
    email: string;
    verification_code: string;
    expires_at: Date;

    constructor(name: string, email: string, verification_code: string, expires_at: Date) {
        this.name = name;
        this.email = email;
        this.verification_code = verification_code;
        this.expires_at = expires_at;
    }
}

export type ProfileResendVerificationCodePayload = {
    name: string;
    email: string;
    verification_code: string;
    expires_at: Date;
}