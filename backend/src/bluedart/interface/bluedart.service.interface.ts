import { AxiosResponse } from "axios";
import { OrderInfoEntity } from "src/api/orders/entity/order.entity";

export interface BluedartServiceInterface {
    createShipment(data: OrderInfoEntity): Promise<AxiosResponse>;
    trackShipment(track_id: string): Promise<AxiosResponse>;
}