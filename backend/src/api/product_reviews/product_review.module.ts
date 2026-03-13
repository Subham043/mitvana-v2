import { Module } from '@nestjs/common';
import { ProductReviewController } from './controller/product_review.controller';
import { PRODUCT_REVIEW_REPOSITORY, PRODUCT_REVIEW_SERVICE } from './product_review.constants';
import { IProductReviewService } from './service/product_review.service';
import { IProductReviewRepository } from './repository/product_review.repository';
import { PRODUCT_REPOSITORY } from '../products/product.constants';
import { ProductRepository } from '../products/repository/product.repository';

@Module({
  imports: [],
  controllers: [ProductReviewController],
  providers: [
    {
      provide: PRODUCT_REVIEW_SERVICE,
      useClass: IProductReviewService,
    },
    {
      provide: PRODUCT_REVIEW_REPOSITORY,
      useClass: IProductReviewRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
})
export class ProductReviewModule { }
