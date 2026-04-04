import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { ORDER_REPOSITORY, ORDER_SERVICE } from './order.constant';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { PdfModule } from 'src/pdf/pdf.module';

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
    ],
})
export class OrderModule { }
