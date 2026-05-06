import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NewProductPublishedPayload } from 'src/api/products/events/new-product-published';
import { ProductBackInStockPayload } from 'src/api/products/events/product-back-in-stock';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';

@Injectable()
export class ProductMailService {
    constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService<AppConfigType>) { }

    async notifyNewProductPublished(data: NewProductPublishedPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - New Product Published', // Subject line
                template: 'new_product_published', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    product: data.product,
                    productUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/shop/${data.product.slug}`,
                },
            });
    }

    async notifyProductBackInStock(data: ProductBackInStockPayload) {
        return await this.mailerService
            .sendMail({
                to: data.email, // list of receivers
                subject: 'Mitvana - Product Back In Stock', // Subject line
                template: 'product_back_in_stock', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                context: {
                    // Data to be sent to template engine.
                    product: data.product,
                    productUrl: `${this.configService.get('CLIENT_URL', { infer: true })}/shop/${data.product.slug}`,
                },
            });
    }
}