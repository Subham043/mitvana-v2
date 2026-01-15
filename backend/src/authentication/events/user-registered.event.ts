export class UserRegisteredEvent {
    id: string;
    name: string;
    email: string;
    verification_code: string;

    constructor(id: string, name: string, email: string, verification_code: string) {
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
}