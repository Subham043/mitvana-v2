export class SubscriptionCreatedEvent {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}

export type SubscriptionCreatedPayload = {
    email: string;
}