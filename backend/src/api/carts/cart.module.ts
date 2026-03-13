import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CART_REPOSITORY, CART_SERVICE } from './cart.constants';
import { ICartService } from './service/cart.service';
import { ICartRepository } from './repository/cart.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    {
      provide: CART_SERVICE,
      useClass: ICartService,
    },
    {
      provide: CART_REPOSITORY,
      useClass: ICartRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class CartModule { }
