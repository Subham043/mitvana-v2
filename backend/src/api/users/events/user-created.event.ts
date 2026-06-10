export class UserCreatedEvent {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export type UserCreatedPayload = {
    name: string;
    email: string;
    password: string;
}