import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HeroImageServiceInterface } from '../interface/hero_image.service.interface';
import { HeroImageRepositoryInterface } from '../interface/hero_image.repository.interface';
import { HERO_IMAGE_CACHE_KEY, HERO_IMAGE_REPOSITORY } from '../hero_image.constants';
import { HeroImageEntity, UpdateHeroImageEntity } from '../entity/hero_image.entity';
import { HeroImageCreateDto } from '../schema/hero-image-create.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { FileHelperUtil } from 'src/utils/file.util';
import { HeroImageUpdateDto } from '../schema/hero-image-update.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class HeroImageService implements HeroImageServiceInterface {

  constructor(
    @Inject(HERO_IMAGE_REPOSITORY) private readonly heroImageRepository: HeroImageRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async getById(id: string): Promise<HeroImageEntity> {
    const cacheKey = HelperUtil.generateCacheKey(HERO_IMAGE_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const heroImage = await this.heroImageRepository.getById(id, { autoInvalidate: true });

        if (!heroImage) throw new NotFoundException("Hero Image not found");

        return heroImage;
      },
      options: {
        tags: [HERO_IMAGE_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<HeroImageEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);

    const cacheKey = HelperUtil.generateCacheKey(HERO_IMAGE_CACHE_KEY, { page, limit, offset, search });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const heroImages = await this.heroImageRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
        const count = await this.heroImageRepository.count(search, { autoInvalidate: true });
        return { data: heroImages, meta: { page, limit, total: count, search } };
      },
      options: {
        tags: [HERO_IMAGE_CACHE_KEY, cacheKey],
      },
    });
  }

  async createHeroImage(heroImage: HeroImageCreateDto): Promise<HeroImageEntity> {
    //save the file in uploads using FileHelperUtil and the fileTempPath
    const image = await FileHelperUtil.saveFile(heroImage.image);

    const newHeroImage = await this.heroImageRepository.createHeroImage({
      content: heroImage.content,
      image: image,
    });

    if (!newHeroImage) throw new InternalServerErrorException('Failed to create hero image');

    await this.cacheService.invalidateTag(HERO_IMAGE_CACHE_KEY);

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

    await this.cacheService.invalidateTag(HERO_IMAGE_CACHE_KEY);

    return updatedHeroImage;
  }

  async deleteHeroImage(id: string): Promise<void> {
    const heroImageById = await this.heroImageRepository.getById(id);

    if (!heroImageById) throw new NotFoundException("Hero Image not found");

    await this.heroImageRepository.deleteHeroImage(id);

    await this.cacheService.invalidateTag(HERO_IMAGE_CACHE_KEY);
  }

  async exportHeroImages(query: PaginationDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'HeroImages',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Content', key: 'content', width: 30 },
        { header: 'Image Link', key: 'image_link', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.heroImageRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
        })
      },

      mapRow: (hero_image) => ({
        id: hero_image.id,
        content: hero_image.content,
        image_link: hero_image.image_link,
        createdAt: hero_image.createdAt?.toISOString(),
        updatedAt: hero_image.updatedAt?.toISOString(),
      }),
    })
  }
}
