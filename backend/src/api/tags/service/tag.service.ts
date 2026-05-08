import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TagServiceInterface } from '../interface/tag.service.interface';
import { TagRepositoryInterface } from '../interface/tag.repository.interface';
import { TAG_CACHE_KEY, TAG_REPOSITORY } from '../tag.constants';
import { TagEntity } from '../entity/tag.entity';
import { TagDto } from '../schema/tag.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';
import { PRODUCT_CACHE_KEY } from 'src/api/products/product.constants';

@Injectable()
export class ITagService implements TagServiceInterface {

  constructor(
    @Inject(TAG_REPOSITORY) private readonly tagRepository: TagRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async getByName(name: string): Promise<TagEntity> {
    const cacheKey = HelperUtil.generateCacheKey(TAG_CACHE_KEY, { name });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const tag = await this.tagRepository.getByName(name, { autoInvalidate: true });

        if (!tag) throw new NotFoundException("Tag not found");

        return tag;
      },
      options: {
        tags: [TAG_CACHE_KEY, cacheKey],
      },
    });
  }

  async getById(id: string): Promise<TagEntity> {
    const cacheKey = HelperUtil.generateCacheKey(TAG_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const tag = await this.tagRepository.getById(id, { autoInvalidate: true });

        if (!tag) throw new NotFoundException("Tag not found");

        return tag;
      },
      options: {
        tags: [TAG_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<TagEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);

    const cacheKey = HelperUtil.generateCacheKey(TAG_CACHE_KEY, { page, limit, offset, search });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const tags = await this.tagRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
        const count = await this.tagRepository.count(search, { autoInvalidate: true });

        return { data: tags, meta: { page, limit, total: count, search } };
      },
      options: {
        tags: [TAG_CACHE_KEY, cacheKey],
      },
    });
  }

  async createTag(tag: TagDto): Promise<TagEntity> {
    const tagByName = await this.tagRepository.getByName(tag.name);

    if (tagByName) throw new CustomValidationException("The tag name already exists", "name", "unique");

    const newTag = await this.tagRepository.createTag(tag);

    if (!newTag) throw new InternalServerErrorException('Failed to create tag');

    await this.cacheService.invalidateTag(TAG_CACHE_KEY);

    return newTag;
  }

  async updateTag(id: string, tag: TagDto): Promise<TagEntity> {
    const tagById = await this.tagRepository.getById(id);

    if (!tagById) throw new NotFoundException("Tag not found");

    const tagByName = await this.tagRepository.getByName(tag.name);

    if (tagByName && tagByName.name !== tagById.name) throw new CustomValidationException("The tag name already exists", "name", "unique");

    const updatedTag = await this.tagRepository.updateTag(id, tag);

    if (!updatedTag) throw new InternalServerErrorException('Failed to update tag');

    await this.cacheService.invalidateTag(TAG_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    return updatedTag;
  }

  async deleteTag(id: string): Promise<void> {
    const tagById = await this.tagRepository.getById(id);

    if (!tagById) throw new NotFoundException("Tag not found");

    await this.tagRepository.deleteTag(id);

    await this.cacheService.invalidateTag(TAG_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);
  }

  async exportTags(query: PaginationDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Tags',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.tagRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
        })
      },

      mapRow: (tag) => ({
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt?.toISOString(),
        updatedAt: tag.updatedAt?.toISOString(),
      }),
    })
  }
}
