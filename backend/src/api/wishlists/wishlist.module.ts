import { Module } from '@nestjs/common';
import { WishlistController } from './controller/wishlist.controller';
import { WISHLIST_REPOSITORY, WISHLIST_SERVICE } from './wishlist.constants';
import { IWishlistService } from './service/wishlist.service';
import { IWishlistRepository } from './repository/wishlist.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';

@Module({
  imports: [],
  controllers: [WishlistController],
  providers: [
    {
      provide: WISHLIST_SERVICE,
      useClass: IWishlistService,
    },
    {
      provide: WISHLIST_REPOSITORY,
      useClass: IWishlistRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class WishlistModule { }
