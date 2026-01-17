import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { PincodeDto, pincodeDtoValidator } from '../schema/pincode.schema';
import { PincodeServiceInterface } from '../interface/pincode.service.interface';
import { PINCODE_SERVICE } from '../pincode.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { ValidNumberParamPipe } from 'src/utils/pipes/valid-number-param.pipe';

@Controller({
  version: '1',
  path: 'pincode',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class PincodeController {
  constructor(@Inject(PINCODE_SERVICE) private readonly pincodeService: PincodeServiceInterface) { }

  @Post('/')
  async createPincode(@Body(new VineValidationPipe(pincodeDtoValidator)) pincodeDto: PincodeDto) {
    return await this.pincodeService.createPincode(pincodeDto);
  }

  @Put('/:id')
  async updatePincode(@Body(new VineValidationPipe(pincodeDtoValidator)) pincodeDto: PincodeDto, @Param('id') id: string) {
    return await this.pincodeService.updatePincode(id, pincodeDto);
  }

  @Delete('/:id')
  async deletePincode(@Param('id') id: string) {
    return await this.pincodeService.deletePincode(id);
  }

  @Get('/:id')
  async getPincode(@Param('id') id: string) {
    return await this.pincodeService.getById(id);
  }

  @Get('/code/:pincode')
  @Public()
  async getPincodeByCode(@Param('pincode', ValidNumberParamPipe) pincode: number) {
    return await this.pincodeService.getByPincode(pincode);
  }

  @Get('/')
  async getAllPincodes(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.pincodeService.getAll(query);
  }
}
