import { Injectable } from "@nestjs/common";
import { BluedartServiceInterface } from "../interface/bluedart.service.interface";
import { ConfigService } from "@nestjs/config";
import { AppConfigType } from "src/config/schema";
import axios, { AxiosInstance } from "axios";
import { OrderInfoEntity } from "src/api/orders/entity/order.entity";
import * as dayjs from "dayjs";


@Injectable()
export class IBluedartService implements BluedartServiceInterface {

    private bluedartClient: AxiosInstance;

    constructor(
        private configService: ConfigService<AppConfigType>,
    ) {
        this.bluedartClient = axios.create({
            baseURL: "https://app.eshipz.com/api",
            headers: {
                'Content-Type': 'application/json',
                "X-API-TOKEN": this.configService.get('SHIPPING_API_TOKEN'),
            },
        });
    }

    async createShipment(data: OrderInfoEntity) {
        return await this.bluedartClient.post('/v1/create-shipments', {
            billing: {
                paid_by: "shipper",
            },
            vendor_id: "7605015210",
            description: "Blue Dart",
            purpose: "commercial",
            slug: "bluedart",
            order_source: "api",
            parcel_contents: "Beauty Products",
            is_document: false,
            service_type: "Ground",
            customer_reference: data.orderId,
            invoice_number: data.invoice_no,
            invoice_date: dayjs(data.createdAt).format("DD/MM/YYYY"),
            is_cod: false,
            collect_on_delivery: { amount: 0, currency: "INR" },
            shipment: {
                ship_from: {
                    contact_name: "Mitvana Stores",
                    company_name: "Matxin Labs Pvt Ltd",
                    street1: "No. L-21, F-4, Sector- 14",
                    street2: "Jeevan Bhima Nagar",
                    city: "Bengaluru",
                    state: "KA",
                    postal_code: "560075",
                    phone: "9113076157",
                    email: "info@matxinlabs.com",
                    tax_id: "29AAHCM0834C1ZP",
                    country: "IN",
                    type: "business",
                },
                ship_to: {
                    contact_name: data.order_address ? (data.order_address.first_name + " " + data.order_address.last_name) : "",
                    company_name: data.order_address?.company_name,
                    street1: data.order_address?.address,
                    street2: data.order_address?.address_2,
                    city: data.order_address?.city,
                    state: data.order_address?.state,
                    postal_code: data.order_address?.pincode?.pincode,
                    phone: data.order_address?.phone_number,
                    country: "IN",
                    type: "residential",
                },
                return_to: {
                    contact_name: "Mitvana Stores",
                    company_name: "Matxin Labs Pvt Ltd",
                    street1: "No. L-21, F-4, Sector- 14",
                    street2: "Jeevan Bhima Nagar",
                    city: "Bengaluru",
                    state: "KA",
                    postal_code: "560075",
                    phone: "9113076157",
                    email: "info@matxinlabs.com",
                    tax_id: "29AAHCM0834C1ZP",
                    country: "IN",
                    type: "business",
                },
                is_reverse: false,
                is_to_pay: false,
                parcels: [
                    {
                        description: "PVC - QR code sticker_1000",
                        box_type: "custom",
                        quantity: 1,
                        weight: {
                            value: 4.6,
                            unit: "kg",
                        },
                        dimension: {
                            width: 23,
                            height: 15,
                            length: 26,
                            unit: "cm",
                        },
                        items: data.order_items.map((item) => ({
                            description: item.product_title || "Default description",
                            origin_country: "IN",
                            quantity: item.quantity || 1,
                            price: {
                                amount: item.product_discounted_price || item.product_price || 0,
                                currency: "INR",
                            },
                            weight: {
                                value: 0,
                                unit: "kg",
                                // value: item.weight || 0,
                                // unit: item.weightUnit || "kg",
                            },
                        })),
                    },
                ],
            },
            gst_invoices: [
                {
                    invoice_number: data.invoice_no,
                    invoice_date: dayjs(data.createdAt).format("DD/MM/YYYY"),
                    invoice_value: data.total_price.toFixed(2),
                },
            ],
        })
    }
    async trackShipment(track_id: string) {
        return await this.bluedartClient.post('/v2/trackings', { track_id })
    }
}