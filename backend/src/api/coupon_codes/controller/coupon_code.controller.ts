import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { CouponCodeDto, couponCodeDtoValidator } from '../schema/coupon_code.schema';
import { CouponCodeServiceInterface } from '../interface/coupon_code.service.interface';
import { COUPON_CODE_SERVICE } from '../coupon_code.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';

@Controller({
  version: '1',
  path: 'coupon-code',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class CouponCodeController {
  constructor(@Inject(COUPON_CODE_SERVICE) private readonly couponCodeService: CouponCodeServiceInterface) { }

  @Post('/')
  async createCouponCode(@Body(new VineValidationPipe(couponCodeDtoValidator)) couponCodeDto: CouponCodeDto) {
    return await this.couponCodeService.createCouponCode(couponCodeDto);
  }

  @Put('/:id')
  async updateCouponCode(@Body(new VineValidationPipe(couponCodeDtoValidator)) couponCodeDto: CouponCodeDto, @Param('id') id: string) {
    return await this.couponCodeService.updateCouponCode(id, couponCodeDto);
  }

  @Delete('/:id')
  async deleteCouponCode(@Param('id') id: string) {
    return await this.couponCodeService.deleteCouponCode(id);
  }

  @Get('/:id')
  async getCouponCode(@Param('id') id: string) {
    return await this.couponCodeService.getById(id);
  }

  @Get('/code/:code')
  @Public()
  async getCouponCodeByCode(@Param('code') code: string) {
    return await this.couponCodeService.getByCode(code);
  }

  @Get('/')
  async getAllCouponCodes(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.couponCodeService.getAll(query);
  }
}
