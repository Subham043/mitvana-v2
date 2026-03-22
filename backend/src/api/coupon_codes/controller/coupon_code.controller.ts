import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query, Patch, Res } from '@nestjs/common';
import { CouponCodeDto, couponCodeDtoValidator } from '../schema/coupon_code.schema';
import { CouponCodeServiceInterface } from '../interface/coupon_code.service.interface';
import { COUPON_CODE_SERVICE } from '../coupon_code.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { CouponCodeStatusDto, couponCodeStatusDtoValidator } from '../schema/coupon_code_status.schema';
import { FastifyReply } from 'fastify';
import { CouponCodeFilterDto, couponCodeFilterDtoValidator } from '../schema/coupon-code-filter.schema';

@Controller({
  version: '1',
  path: 'coupon-code',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class CouponCodeController {
  constructor(@Inject(COUPON_CODE_SERVICE) private readonly couponCodeService: CouponCodeServiceInterface) { }

  @Post('/')
  async createCouponCode(@Body(new VineValidationPipe(couponCodeDtoValidator)) couponCodeDto: CouponCodeDto) {
    return await this.couponCodeService.createCouponCode(couponCodeDto);
  }

  @Patch('/status/:id')
  async updateCouponCodeStatus(@Body(new VineValidationPipe(couponCodeStatusDtoValidator)) couponCodeStatusDto: CouponCodeStatusDto, @Param('id') id: string) {
    return await this.couponCodeService.updateCouponCodeStatus(id, couponCodeStatusDto);
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
  async getAllCouponCodes(@Query(new VineValidationPipe(couponCodeFilterDtoValidator)) query: CouponCodeFilterDto) {
    return await this.couponCodeService.getAll(query);
  }

  @Get('/export')
  async export(@Query(new VineValidationPipe(couponCodeFilterDtoValidator)) query: CouponCodeFilterDto, @Res() reply: FastifyReply) {
    const stream = await this.couponCodeService.exportCouponCodes(query)

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="coupon_codes.xlsx"',
    )

    return reply.send(stream)
  }
}
