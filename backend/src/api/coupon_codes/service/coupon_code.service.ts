import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CouponCodeServiceInterface } from '../interface/coupon_code.service.interface';
import { CouponCodeRepositoryInterface } from '../interface/coupon_code.repository.interface';
import { COUPON_CODE_REPOSITORY } from '../coupon_code.constants';
import { CouponCodeEntity } from '../entity/coupon_code.entity';
import { CouponCodeDto } from '../schema/coupon_code.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { CouponCodeStatusDto } from '../schema/coupon_code_status.schema';
import { PassThrough } from 'stream';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { CouponCodeFilterDto } from '../schema/coupon-code-filter.schema';

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

  async getAll(query: CouponCodeFilterDto): Promise<PaginationResponse<CouponCodeEntity, CouponCodeFilterDto>> {
    const { page, limit, offset, search, is_draft } = normalizePagination<CouponCodeFilterDto>(query);
    const couponCodes = await this.couponCodeRepository.getAll({ page, limit, offset, search, is_draft }, { autoInvalidate: true });
    const count = await this.couponCodeRepository.count({ search, is_draft }, { autoInvalidate: true });
    return { data: couponCodes, meta: { page, limit, total: count, search, is_draft } };
  }

  async createCouponCode(couponCode: CouponCodeDto): Promise<CouponCodeEntity> {
    const couponCodeByCode = await this.couponCodeRepository.getByCode(couponCode.code);

    if (couponCodeByCode) throw new CustomValidationException("The coupon code already exists", "code", "unique");

    const newCouponCode = await this.couponCodeRepository.createCouponCode({ ...couponCode, is_draft: couponCode.is_draft ? couponCode.is_draft.toString() === "true" : false });

    if (!newCouponCode) throw new InternalServerErrorException('Failed to create coupon code');

    return newCouponCode;
  }

  async updateCouponCode(id: string, couponCode: CouponCodeDto): Promise<CouponCodeEntity> {
    const couponCodeById = await this.couponCodeRepository.getById(id);

    if (!couponCodeById) throw new NotFoundException("Coupon code not found");

    const couponCodeByCode = await this.couponCodeRepository.getByCode(couponCode.code);

    if (couponCodeByCode && couponCodeByCode.code !== couponCodeById.code) throw new CustomValidationException("The coupon code already exists", "code", "unique");

    const updatedCouponCode = await this.couponCodeRepository.updateCouponCode(id, { ...couponCode, is_draft: couponCode.is_draft ? couponCode.is_draft.toString() === "true" : false });

    if (!updatedCouponCode) throw new InternalServerErrorException('Failed to update coupon code');

    return updatedCouponCode;
  }

  async updateCouponCodeStatus(id: string, couponCodeStatus: CouponCodeStatusDto): Promise<CouponCodeEntity> {
    const couponCodeById = await this.couponCodeRepository.getById(id);

    if (!couponCodeById) throw new NotFoundException("Coupon code not found");

    const updatedCouponCode = await this.couponCodeRepository.updateCouponCode(id, { ...couponCodeById, is_draft: couponCodeStatus.is_draft ? couponCodeStatus.is_draft.toString() === "true" : false });

    if (!updatedCouponCode) throw new InternalServerErrorException('Failed to update coupon code');

    return updatedCouponCode;
  }

  async deleteCouponCode(id: string): Promise<void> {
    const couponCodeById = await this.couponCodeRepository.getById(id);

    if (!couponCodeById) throw new NotFoundException("Coupon code not found");

    await this.couponCodeRepository.deleteCouponCode(id);
  }

  async exportCouponCodes(query: CouponCodeFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'CouponCodes',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Code', key: 'code', width: 30 },
        { header: 'Discount Percentage', key: 'discount_percentage', width: 30 },
        { header: 'Minimum Cart Value', key: 'min_cart_value', width: 30 },
        { header: 'Maximum Redemptions', key: 'maximum_redemptions', width: 30 },
        { header: 'Times Redeemed', key: 'times_redeemed', width: 30 },
        { header: 'Expiration Date', key: 'expiration_date', width: 30 },
        { header: 'Is Draft', key: 'is_draft', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.couponCodeRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          is_draft: query.is_draft,
        })
      },

      mapRow: (code) => ({
        id: code.id,
        code: code.code,
        discount_percentage: code.discount_percentage,
        min_cart_value: code.min_cart_value,
        maximum_redemptions: code.maximum_redemptions,
        times_redeemed: code.times_redeemed,
        expiration_date: code.expiration_date?.toISOString(),
        is_draft: code.is_draft,
        createdAt: code.createdAt?.toISOString(),
        updatedAt: code.updatedAt?.toISOString(),
      }),
    })
  }
}
