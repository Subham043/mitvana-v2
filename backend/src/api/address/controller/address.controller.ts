import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { AddressDto, addressDtoValidator } from '../schema/address.schema';
import { AddressServiceInterface } from '../interface/address.service.interface';
import { ADDRESS_SERVICE } from '../address.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'address',
})
@Verified()
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard)
export class AddressController {
  constructor(@Inject(ADDRESS_SERVICE) private readonly addressService: AddressServiceInterface) { }

  @Post('/')
  async createAddress(@Body(new VineValidationPipe(addressDtoValidator)) addressDto: AddressDto, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.createAddress(user.id, addressDto);
  }

  @Put('/:id')
  async updateAddress(@Body(new VineValidationPipe(addressDtoValidator)) addressDto: AddressDto, @Param('id') id: string, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.updateAddress(id, user.id, addressDto);
  }

  @Delete('/:id')
  async deleteAddress(@Param('id') id: string, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.deleteAddress(id, user.id);
  }

  @Get('/:id')
  async getAddress(@Param('id') id: string, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.getByIdAndUserId(id, user.id);
  }

  @Get('/')
  async getAllAddresses(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.getAll(query, user.id);
  }
}
