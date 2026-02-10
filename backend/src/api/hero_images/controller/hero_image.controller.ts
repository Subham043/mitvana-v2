import { Controller, Post, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { HeroImageCreateDto, heroImageCreateDtoValidator } from '../schema/hero-image-create.schema';
import { HeroImageServiceInterface } from '../interface/hero_image.service.interface';
import { HERO_IMAGE_SERVICE } from '../hero_image.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { VineMultipart } from 'src/utils/decorator/vine-multipart.decorator';
import { HeroImageUpdateDto, heroImageUpdateDtoValidator } from '../schema/hero-image-update.schema';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'hero-image',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class HeroImageController {
  constructor(@Inject(HERO_IMAGE_SERVICE) private readonly heroImageService: HeroImageServiceInterface) { }

  @Post('/')
  async createHeroImage(
    @VineMultipart<HeroImageCreateDto>(heroImageCreateDtoValidator) heroImageDto: HeroImageCreateDto,
  ) {
    return await this.heroImageService.createHeroImage(heroImageDto);
  }

  @Put('/:id')
  async updateHeroImage(@VineMultipart<HeroImageUpdateDto>(heroImageUpdateDtoValidator) heroImageDto: HeroImageUpdateDto, @Param('id') id: string) {
    return await this.heroImageService.updateHeroImage(id, heroImageDto);
  }

  @Delete('/:id')
  async deleteHeroImage(@Param('id') id: string) {
    return await this.heroImageService.deleteHeroImage(id);
  }

  @Get('/:id')
  @Public()
  async getHeroImage(@Param('id') id: string) {
    return await this.heroImageService.getById(id);
  }

  @Get('/')
  @Public()
  async getAllHeroImages(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.heroImageService.getAll(query);
  }
}
