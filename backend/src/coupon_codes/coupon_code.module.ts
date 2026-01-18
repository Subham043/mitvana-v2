import { Module } from '@nestjs/common';
import { CouponCodeController } from './controller/coupon_code.controller';
import { COUPON_CODE_REPOSITORY, COUPON_CODE_SERVICE } from './coupon_code.constants';
import { ICouponCodeService } from './service/coupon_code.service';
import { ICouponCodeRepository } from './repository/coupon_code.repository';

@Module({
  imports: [],
  controllers: [CouponCodeController],
  providers: [
    {
      provide: COUPON_CODE_SERVICE,
      useClass: ICouponCodeService,
    },
    {
      provide: COUPON_CODE_REPOSITORY,
      useClass: ICouponCodeRepository,
    },
  ],
})
export class CouponCodeModule { }
