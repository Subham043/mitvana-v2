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

@Module({
    imports: [PdfModule],
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
    ],
})
export class OrderModule { }
