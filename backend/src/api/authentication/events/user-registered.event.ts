export class UserRegisteredEvent {
    id: string;
    name: string;
    email: string;
    verification_code: string;
    expires_at: Date;

    constructor(id: string, name: string, email: string, verification_code: string, expires_at: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.verification_code = verification_code;
    }
}

export type UserRegisteredPayload = {
    id: string;
    name: string;
    email: string;
    verification_code: string;
    expires_at: Date;
}