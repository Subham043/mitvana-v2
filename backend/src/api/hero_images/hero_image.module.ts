import { Module } from '@nestjs/common';
import { HeroImageController } from './controller/hero_image.controller';
import { HERO_IMAGE_REPOSITORY, HERO_IMAGE_SERVICE } from './hero_image.constants';
import { HeroImageService } from './service/hero_image.service';
import { HeroImageRepository } from './repository/hero_image.repository';

@Module({
  imports: [],
  controllers: [HeroImageController],
  providers: [
    {
      provide: HERO_IMAGE_SERVICE,
      useClass: HeroImageService,
    },
    {
      provide: HERO_IMAGE_REPOSITORY,
      useClass: HeroImageRepository,
    },
  ],
})
export class HeroImageModule { }
