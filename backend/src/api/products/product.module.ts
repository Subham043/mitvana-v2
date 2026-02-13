import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { PRODUCT_REPOSITORY, PRODUCT_SERVICE } from './product.constants';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule { }
