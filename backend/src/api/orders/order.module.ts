import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { ORDER_REPOSITORY, ORDER_SERVICE } from './order.constant';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { PdfModule } from 'src/pdf/pdf.module';
import { CART_REPOSITORY } from '../carts/cart.constants';
import { ICartRepository } from '../carts/repository/cart.repository';
import { PAYMENT_REPOSITORY, PAYMENT_SERVICE } from '../payments/payment.constant';
import { PaymentService } from '../payments/service/payment.service';
import { PaymentRepository } from '../payments/repository/payment.repository';
import { ADDRESS_REPOSITORY } from '../address/address.constants';
import { IAddressRepository } from '../address/repository/address.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';
import { BullModule } from '@nestjs/bullmq';
import { ORDER_MAIL_QUEUE } from 'src/queue/queue.constants';
import { OrderPlacedListener } from './listeners/order-placed.listener';
import { OrderStatusUpdatedListener } from './listeners/order-status-updated.listener';
import { COUPON_CODE_REPOSITORY } from '../coupon_codes/coupon_code.constants';
import { ICouponCodeRepository } from '../coupon_codes/repository/coupon_code.repository';

@Module({
    imports: [
        PdfModule,
        BullModule.registerQueue({
            name: ORDER_MAIL_QUEUE,
        }),
    ],
    controllers: [OrderController],
    providers: [
        {
            provide: ORDER_SERVICE,
            useClass: OrderService,
        },
        {
            provide: ORDER_REPOSITORY,
            useClass: OrderRepository,
        },
        {
            provide: CART_REPOSITORY,
            useClass: ICartRepository,
        },
        {
            provide: PAYMENT_SERVICE,
            useClass: PaymentService,
        },
        {
            provide: PAYMENT_SERVICE,
            useClass: PaymentService,
        },
        {
            provide: PAYMENT_REPOSITORY,
            useClass: PaymentRepository,
        },
        {
            provide: ADDRESS_REPOSITORY,
            useClass: IAddressRepository,
        },
        {
            provide: PRODUCT_REPOSITORY,
            useClass: ProductRepository,
        },
        {
            provide: COUPON_CODE_REPOSITORY,
            useClass: ICouponCodeRepository,
        },
        OrderPlacedListener,
        OrderStatusUpdatedListener,
    ],
})
export class OrderModule { }
