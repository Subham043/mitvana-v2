import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CouponCodeServiceInterface } from '../interface/coupon_code.service.interface';
import { CouponCodeRepositoryInterface } from '../interface/coupon_code.repository.interface';
import { COUPON_CODE_REPOSITORY } from '../coupon_code.constants';
import { CouponCodeEntity } from '../entity/coupon_code.entity';
import { CouponCodeDto } from '../schema/coupon_code.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';

@Injectable()
export class ICouponCodeService implements CouponCodeServiceInterface {

  constructor(
    @Inject(COUPON_CODE_REPOSITORY) private readonly couponCodeRepository: CouponCodeRepositoryInterface,
  ) { }

  async getByCode(code: string): Promise<CouponCodeEntity> {
    const couponCode = await this.couponCodeRepository.getByCode(code, { autoInvalidate: true });

    if (!couponCode) throw new NotFoundException("Coupon code not found");

    return couponCode;
  }

  async getById(id: string): Promise<CouponCodeEntity> {
    const couponCode = await this.couponCodeRepository.getById(id, { autoInvalidate: true });

    if (!couponCode) throw new NotFoundException("Coupon code not found");

    return couponCode;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<CouponCodeEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const couponCodes = await this.couponCodeRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.couponCodeRepository.count(search, { autoInvalidate: true });
    return { data: couponCodes, meta: { page, limit, total: count, search } };
  }

  async createCouponCode(couponCode: CouponCodeDto): Promise<CouponCodeEntity> {
    const couponCodeByCode = await this.couponCodeRepository.getByCode(couponCode.code);

    if (couponCodeByCode) throw new CustomValidationException("The coupon code already exists", "code", "unique");

    const newCouponCode = await this.couponCodeRepository.createCouponCode(couponCode);

    if (!newCouponCode) throw new InternalServerErrorException('Failed to create coupon code');

    return newCouponCode;
  }

  async updateCouponCode(id: string, couponCode: CouponCodeDto): Promise<CouponCodeEntity> {
    const couponCodeById = await this.couponCodeRepository.getById(id);

    if (!couponCodeById) throw new NotFoundException("Coupon code not found");

    const couponCodeByCode = await this.couponCodeRepository.getByCode(couponCode.code);

    if (couponCodeByCode && couponCodeByCode.code !== couponCodeById.code) throw new CustomValidationException("The coupon code already exists", "code", "unique");

    const updatedCouponCode = await this.couponCodeRepository.updateCouponCode(id, couponCode);

    if (!updatedCouponCode) throw new InternalServerErrorException('Failed to update coupon code');

    return updatedCouponCode;
  }

  async deleteCouponCode(id: string): Promise<void> {
    const couponCodeById = await this.couponCodeRepository.getById(id);

    if (!couponCodeById) throw new NotFoundException("Coupon code not found");

    await this.couponCodeRepository.deleteCouponCode(id);
  }
}
