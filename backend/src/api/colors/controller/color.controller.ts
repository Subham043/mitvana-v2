import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { ColorDto, colorDtoValidator } from '../schema/color.schema';
import { ColorServiceInterface } from '../interface/color.service.interface';
import { COLOR_SERVICE } from '../color.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'color',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class ColorController {
  constructor(@Inject(COLOR_SERVICE) private readonly colorService: ColorServiceInterface) { }

  @Post('/')
  async createColor(@Body(new VineValidationPipe(colorDtoValidator)) colorDto: ColorDto) {
    return await this.colorService.createColor(colorDto);
  }

  @Put('/:id')
  async updateColor(@Body(new VineValidationPipe(colorDtoValidator)) colorDto: ColorDto, @Param('id') id: string) {
    return await this.colorService.updateColor(id, colorDto);
  }

  @Delete('/:id')
  async deleteColor(@Param('id') id: string) {
    return await this.colorService.deleteColor(id);
  }

  @Get('/:id')
  @Public()
  async getColor(@Param('id') id: string) {
    return await this.colorService.getById(id);
  }

  @Get('/')
  @Public()
  async getAllColors(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.colorService.getAll(query);
  }
}
