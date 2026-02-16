import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { OfferDto, offerDtoValidator } from '../schema/offer.schema';
import { OfferServiceInterface } from '../interface/offer.service.interface';
import { OFFER_SERVICE } from '../offer.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'offer',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class OfferController {
  constructor(@Inject(OFFER_SERVICE) private readonly offerService: OfferServiceInterface) { }

  @Post('/')
  async createOffer(@Body(new VineValidationPipe(offerDtoValidator)) offerDto: OfferDto) {
    return await this.offerService.createOffer(offerDto);
  }

  @Put('/:id')
  async updateOffer(@Body(new VineValidationPipe(offerDtoValidator)) offerDto: OfferDto, @Param('id') id: string) {
    return await this.offerService.updateOffer(id, offerDto);
  }

  @Delete('/:id')
  async deleteOffer(@Param('id') id: string) {
    return await this.offerService.deleteOffer(id);
  }

  @Get('/:id')
  async getOffer(@Param('id') id: string) {
    return await this.offerService.getById(id);
  }

  @Get('/')
  async getAllOffers(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.offerService.getAll(query);
  }
}
