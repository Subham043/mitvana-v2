import { OrderInfoEntity } from "../entity/order.entity";


export class OrderCancelledByUserEvent {
    order: OrderInfoEntity;

    constructor(order: OrderInfoEntity) {
        this.order = order;
    }
}

export type OrderCancelledByUserPayload = {
    email: string;
    order: OrderInfoEntity;
}