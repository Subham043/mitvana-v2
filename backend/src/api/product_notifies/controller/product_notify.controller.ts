import { Controller, Post, Body, Inject, Delete, Param, Get, UseGuards, Query } from '@nestjs/common';
import { ProductNotifyDto, productNotifyDtoValidator } from '../schema/product_notify.schema';
import { ProductNotifyServiceInterface } from '../interface/product_notify.service.interface';
import { PRODUCT_NOTIFY_SERVICE } from '../product_notify.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';

@Controller({
  version: '1',
  path: 'product-notify',
})
@Verified()
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class ProductNotifyController {
  constructor(@Inject(PRODUCT_NOTIFY_SERVICE) private readonly productNotifyService: ProductNotifyServiceInterface) { }

  @Post('/')
  @Recaptcha()
  @Public()
  async createProductNotify(@Body(new VineValidationPipe(productNotifyDtoValidator)) productNotifyDto: ProductNotifyDto) {
    return await this.productNotifyService.createProductNotify(productNotifyDto);
  }

  @Role("ADMIN")
  @Delete('/:id')
  async deleteProductNotify(@Param('id') id: string) {
    return await this.productNotifyService.deleteProductNotify(id);
  }

  @Role("ADMIN")
  @Get('/:id')
  async getProductNotify(@Param('id') id: string) {
    return await this.productNotifyService.getById(id);
  }

  @Role("ADMIN")
  @Get('/')
  async getAllProductNotifys(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.productNotifyService.getAll(query);
  }

}
