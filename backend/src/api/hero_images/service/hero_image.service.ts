import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HeroImageServiceInterface } from '../interface/hero_image.service.interface';
import { HeroImageRepositoryInterface } from '../interface/hero_image.repository.interface';
import { HERO_IMAGE_REPOSITORY } from '../hero_image.constants';
import { HeroImageEntity, UpdateHeroImageEntity } from '../entity/hero_image.entity';
import { HeroImageCreateDto } from '../schema/hero-image-create.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { FileHelperUtil } from 'src/utils/file.util';
import { HeroImageUpdateDto } from '../schema/hero-image-update.schema';

@Injectable()
export class HeroImageService implements HeroImageServiceInterface {

  constructor(
    @Inject(HERO_IMAGE_REPOSITORY) private readonly heroImageRepository: HeroImageRepositoryInterface,
  ) { }

  async getById(id: string): Promise<HeroImageEntity> {
    const heroImage = await this.heroImageRepository.getById(id, { autoInvalidate: true });

    if (!heroImage) throw new NotFoundException("Hero Image not found");

    return heroImage;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<HeroImageEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const heroImages = await this.heroImageRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.heroImageRepository.count(search, { autoInvalidate: true });
    return { data: heroImages, meta: { page, limit, total: count, search } };
  }

  async createHeroImage(heroImage: HeroImageCreateDto): Promise<HeroImageEntity> {
    //save the file in uploads using FileHelperUtil and the fileTempPath
    const image = await FileHelperUtil.saveFile(heroImage.image);

    const newHeroImage = await this.heroImageRepository.createHeroImage({
      content: heroImage.content,
      image: image,
    });

    if (!newHeroImage) throw new InternalServerErrorException('Failed to create hero image');

    return newHeroImage;
  }

  async updateHeroImage(id: string, heroImage: HeroImageUpdateDto): Promise<HeroImageEntity> {
    const heroImageById = await this.heroImageRepository.getById(id);

    if (!heroImageById) throw new NotFoundException("Hero Image not found");

    const data: UpdateHeroImageEntity = {
      content: heroImage.content,
    }
    if (heroImage.image) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const image = await FileHelperUtil.saveFile(heroImage.image);
      data.image = image;
    }

    const updatedHeroImage = await this.heroImageRepository.updateHeroImage(id, data);

    if (!updatedHeroImage) throw new InternalServerErrorException('Failed to update hero image');

    return updatedHeroImage;
  }

  async deleteHeroImage(id: string): Promise<void> {
    const heroImageById = await this.heroImageRepository.getById(id);

    if (!heroImageById) throw new NotFoundException("Hero Image not found");

    await this.heroImageRepository.deleteHeroImage(id);
  }
}
