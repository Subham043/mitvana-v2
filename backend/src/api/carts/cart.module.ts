import { Module } from '@nestjs/common';
import { CartController } from './controller/cart.controller';
import { CART_REPOSITORY, CART_SERVICE } from './cart.constants';
import { ICartService } from './service/cart.service';
import { ICartRepository } from './repository/cart.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';
import { ADDRESS_REPOSITORY } from '../address/address.constants';
import { COUPON_CODE_REPOSITORY } from '../coupon_codes/coupon_code.constants';
import { ICouponCodeRepository } from '../coupon_codes/repository/coupon_code.repository';
import { IAddressRepository } from '../address/repository/address.repository';

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
    {
      provide: ADDRESS_REPOSITORY,
      useClass: IAddressRepository,
    },
    {
      provide: COUPON_CODE_REPOSITORY,
      useClass: ICouponCodeRepository,
    },
  ],
})
export class CartModule { }
