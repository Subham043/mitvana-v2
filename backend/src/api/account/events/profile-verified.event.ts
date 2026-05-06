export class ProfileVerifiedEvent {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

export type ProfileVerifiedPayload = {
    name: string;
    email: string;
}