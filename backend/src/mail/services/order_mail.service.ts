import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderPlacedPayload } from 'src/api/orders/events/order-placed';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import * as dayjs from 'dayjs';
import { OrderPdfService } from 'src/pdf/services/order.pdf.service';
import { OrderStatusUpdatedPayload } from 'src/api/orders/events/order-status-updated';
import { OrderCancelledByUserPayload } from 'src/api/orders/events/order-cancelled-by-user';

@Injectable()
export class OrderMailService {
    constructor(private readonly mailerService: MailerService, private readonly orderPdfService: OrderPdfService, private readonly configService: ConfigService<AppConfigType>) { }

    async notifyOrderPlaced(data: OrderPlacedPayload) {
        const pdfBuffer = await this.orderPdfService.generateInvoicePdfBuffer(data.order);

        const address: string[] = [];
        if (data.order.order_address?.address) address.push(data.order.order_address.address);
        if (data.order.order_address?.address_2) address.push(data.order.order_address.address_2);
        if (data.order.order_address?.city) address.push(data.order.order_address.city);
        if (data.order.order_address?.state) address.push(data.order.order_address.state);
        if (data.order.order_address?.country) address.push(data.order.order_address.country);
        if (data.order.order_address?.postal_code) address.push(data.order.order_address.postal_code.toString());

        const customer_name = data.order.order_address?.first_name && data.order.order_address?.last_name ? data.order.order_address.first_name + " " + data.order.order_address?.last_name : data.name;

        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Order Placed', // Subject line
                template: 'order_placed', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    order: {
                        orderNumber: data.order.orderId,
                        date: dayjs(data.order.createdAt).format("DD MMM YYYY, h:mm a"),
                        subtotal: data.order.sub_total_discounted_price,
                        discount: data.order.discount,
                        shipping: data.order.shipping_charges,
                        total: data.order.total_price,
                        items: data.order.order_items.map((item) => {
                            return {
                                name: item.product_title,
                                quantity: item.quantity,
                                price: item.product_discounted_price,
                                image: item.product_image ? `${this.configService.get('APP_URL', { infer: true })}/uploads/${item.product_image}` : "",
                            }
                        }),
                        address: address.length > 0 ? address.join(", ") : "N/A",
                        customer_name
                    },
                    trackUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/order/${data.order.id}`,
                    profileUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/profile`,
                    appLogoUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/logo.jpg`,
                    listImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/list.png`,
                    shippedImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/shipped.png`,
                    facebookImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/instagram.png`,
                },
                attachments: [
                    {
                        filename: `${data.order.invoice_no}.pdf`,
                        content: pdfBuffer, // Buffer from PDF generator
                        contentType: 'application/pdf',
                    },
                ]
            });
    }

    async notifyOrderStatusUpdated(data: OrderStatusUpdatedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Order Status Updated', // Subject line
                template: 'order_status_updated', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    name: data.name,
                    order: {
                        orderNumber: data.order.orderId,
                        date: dayjs(data.order.createdAt).format("DD MMM YYYY, h:mm a"),
                        status: data.order.status,
                        cancellation_reason: data.order.cancellation_reason,
                    },
                    shopUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/shop`,
                    trackUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/order/${data.order.id}`,
                    profileUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/account/profile`,
                    appLogoUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/instagram.png`,
                    shippedImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/ill_shipped.png`,
                }
            });
    }

    async notifyOrderCancelledByUser(data: OrderCancelledByUserPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Order Cancelled by User', // Subject line
                template: 'order_cancelled_by_user', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    order: {
                        orderNumber: data.order.orderId,
                        date: dayjs(data.order.createdAt).format("DD MMM YYYY, h:mm a"),
                        cancellation_reason: data.order.cancellation_reason,
                    },
                    trackUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/orders/${data.order.id}`,
                    appLogoUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/logo.jpg`,
                    facebookImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/facebook.png`,
                    twitterImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/twitter.png`,
                    instagramImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/instagram.png`,
                    shippedImgUrl: `${this.configService.get('ADMIN_URL', { infer: true })}/uploads/default/ill_shipped.png`,
                }
            });
    }
}