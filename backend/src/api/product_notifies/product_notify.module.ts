import { Module } from '@nestjs/common';
import { ProductNotifyController } from './controller/product_notify.controller';
import { PRODUCT_NOTIFY_REPOSITORY, PRODUCT_NOTIFY_SERVICE } from './product_notify.constants';
import { IProductNotifyService } from './service/product_notify.service';
import { IProductNotifyRepository } from './repository/product_notify.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';

@Module({
  imports: [],
  controllers: [ProductNotifyController],
  providers: [
    {
      provide: PRODUCT_NOTIFY_SERVICE,
      useClass: IProductNotifyService,
    },
    {
      provide: PRODUCT_NOTIFY_REPOSITORY,
      useClass: IProductNotifyRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class ProductNotifyModule { }
