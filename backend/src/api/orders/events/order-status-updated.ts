import { OrderInfoEntity } from "../entity/order.entity";


export class OrderStatusUpdatedEvent {
    order: OrderInfoEntity;

    constructor(order: OrderInfoEntity) {
        this.order = order;
    }
}

export type OrderStatusUpdatedPayload = {
    email: string;
    name: string;
    order: OrderInfoEntity;
}