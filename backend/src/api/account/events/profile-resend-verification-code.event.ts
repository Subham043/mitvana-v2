export class ProfileResendVerificationCodeEvent {
    name: string;
    email: string;
    verification_code: string;

    constructor(name: string, email: string, verification_code: string) {
        this.name = name;
        this.email = email;
        this.verification_code = verification_code;
    }
}

export type ProfileResendVerificationCodePayload = {
    name: string;
    email: string;
    verification_code: string;
}