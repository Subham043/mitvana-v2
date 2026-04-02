import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PAYMENT_REPOSITORY, PAYMENT_SERVICE } from './payment.constant';
import { PaymentService } from './service/payment.service';
import { PaymentRepository } from './repository/payment.repository';

@Module({
    imports: [],
    controllers: [PaymentController],
    providers: [
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
export class PaymentModule { }
