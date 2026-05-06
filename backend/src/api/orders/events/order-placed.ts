import { OrderInfoEntity } from "../entity/order.entity";


export class OrderPlacedEvent {
    order: OrderInfoEntity;

    constructor(order: OrderInfoEntity) {
        this.order = order;
    }
}

export type OrderPlacedPayload = {
    email: string;
    name: string;
    order: OrderInfoEntity;
}