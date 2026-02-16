import { Module } from '@nestjs/common';
import { OfferController } from './controller/offer.controller';
import { OFFER_REPOSITORY, OFFER_SERVICE } from './offer.constants';
import { IOfferService } from './service/offer.service';
import { IOfferRepository } from './repository/offer.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';

@Module({
  imports: [],
  controllers: [OfferController],
  providers: [
    {
      provide: OFFER_SERVICE,
      useClass: IOfferService,
    },
    {
      provide: OFFER_REPOSITORY,
      useClass: IOfferRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class OfferModule { }
