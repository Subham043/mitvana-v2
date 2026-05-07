import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryServiceInterface } from '../interface/category.service.interface';
import { CategoryRepositoryInterface } from '../interface/category.repository.interface';
import { CATEGORY_CACHE_KEY, CATEGORY_REPOSITORY } from '../category.constants';
import { CategoryEntity, NewCategoryEntity, UpdateCategoryEntity } from '../entity/category.entity';
import { CategoryCreateDto } from '../schema/category-create.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { FileHelperUtil } from 'src/utils/file.util';
import { CategoryUpdateDto } from '../schema/category-update.schema';
import { CategoryUpdateStatusDto } from '../schema/category-update-status.schema';
import { PassThrough } from 'stream';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { CategoryFilterDto } from '../schema/category-filter.schema';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CategoryService implements CategoryServiceInterface {

  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async getByName(name: string): Promise<CategoryEntity> {
    const cacheKey = `${CATEGORY_CACHE_KEY}:name:${name}`;
    const cachedCategory = await this.cacheService.get<CategoryEntity>(cacheKey);

    if (cachedCategory) {
      return cachedCategory;
    }

    const category = await this.categoryRepository.getByName(name, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    await this.cacheService.set(cacheKey, category, [CATEGORY_CACHE_KEY, cacheKey]);

    return category;
  }

  async getBySlug(slug: string): Promise<CategoryEntity> {
    const cacheKey = `${CATEGORY_CACHE_KEY}:slug:${slug}`;
    const cachedCategory = await this.cacheService.get<CategoryEntity>(cacheKey);

    if (cachedCategory) {
      return cachedCategory;
    }

    const category = await this.categoryRepository.getBySlug(slug, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    await this.cacheService.set(cacheKey, category, [CATEGORY_CACHE_KEY, cacheKey]);

    return category;
  }

  async getById(id: string): Promise<CategoryEntity> {
    const cacheKey = `${CATEGORY_CACHE_KEY}:id:${id}`;
    const cachedCategory = await this.cacheService.get<CategoryEntity>(cacheKey);

    if (cachedCategory) {
      return cachedCategory;
    }

    const category = await this.categoryRepository.getById(id, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    await this.cacheService.set(cacheKey, category, [CATEGORY_CACHE_KEY, cacheKey]);

    return category;
  }

  async getAll(query: CategoryFilterDto): Promise<PaginationResponse<CategoryEntity, CategoryFilterDto>> {
    const { page, limit, offset, search, is_visible_in_navigation } = normalizePagination<CategoryFilterDto>(query);
    const cacheKey = `${CATEGORY_CACHE_KEY}:all:p:${page}:l:${limit}:o:${offset}:s:${search}:v:${is_visible_in_navigation}`;
    const cachedCategories = await this.cacheService.get<PaginationResponse<CategoryEntity, CategoryFilterDto>>(cacheKey);

    if (cachedCategories) {
      return cachedCategories;
    }

    const categories = await this.categoryRepository.getAll({ page, limit, offset, search, is_visible_in_navigation }, { autoInvalidate: true });
    const count = await this.categoryRepository.count({ search, is_visible_in_navigation }, { autoInvalidate: true });
    const result = { data: categories, meta: { page, limit, total: count, search, is_visible_in_navigation } };
    await this.cacheService.set(cacheKey, result, [CATEGORY_CACHE_KEY, cacheKey]);
    return result;
  }

  async createCategory(category: CategoryCreateDto): Promise<CategoryEntity> {
    const categoryByName = await this.categoryRepository.getByName(category.name);

    if (categoryByName) throw new CustomValidationException("The category name already exists", "name", "unique");

    if (category.slug) {
      const categoryBySlug = await this.categoryRepository.getBySlug(category.slug);
      if (categoryBySlug) throw new CustomValidationException("The category slug already exists", "slug", "unique");
    }

    const data: NewCategoryEntity = {
      name: category.name,
      description: category.description,
      is_visible_in_navigation: category.is_visible_in_navigation ? category.is_visible_in_navigation.toString() === "true" : false,
      slug: category.slug ?? category.name.toLowerCase().replace(/ /g, '-'),
    }
    if (category.thumbnail) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const thumbnail = await FileHelperUtil.saveFile(category.thumbnail);
      data.thumbnail = thumbnail;
    }

    const newCategory = await this.categoryRepository.createCategory(data);

    if (!newCategory) throw new InternalServerErrorException('Failed to create category');

    await this.cacheService.invalidateTag(CATEGORY_CACHE_KEY);

    return newCategory;
  }

  async updateCategory(id: string, category: CategoryUpdateDto): Promise<CategoryEntity> {
    const categoryById = await this.categoryRepository.getById(id);

    if (!categoryById) throw new NotFoundException("Category not found");

    const categoryByName = await this.categoryRepository.getByName(category.name);

    if (categoryByName && categoryByName.name !== categoryById.name) throw new CustomValidationException("The category name already exists", "name", "unique");

    const categoryBySlug = await this.categoryRepository.getBySlug(category.slug);

    if (categoryBySlug && categoryBySlug.slug !== categoryById.slug) throw new CustomValidationException("The category slug already exists", "slug", "unique");

    const data: UpdateCategoryEntity = {
      name: category.name,
      description: category.description,
      is_visible_in_navigation: category.is_visible_in_navigation ? category.is_visible_in_navigation.toString() === "true" : false,
      slug: category.slug ?? category.name.toLowerCase().replace(/ /g, '-'),
    }
    if (category.thumbnail) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const thumbnail = await FileHelperUtil.saveFile(category.thumbnail);
      data.thumbnail = thumbnail;
    }

    const updatedCategory = await this.categoryRepository.updateCategory(id, data);

    if (!updatedCategory) throw new InternalServerErrorException('Failed to update category');

    await this.cacheService.invalidateTag(CATEGORY_CACHE_KEY);

    return updatedCategory;
  }

  async updateCategoryStatus(id: string, category: CategoryUpdateStatusDto): Promise<CategoryEntity> {
    const categoryById = await this.categoryRepository.getById(id);

    if (!categoryById) throw new NotFoundException("Category not found");

    const updatedCategory = await this.categoryRepository.updateCategory(id, { ...categoryById, thumbnail: categoryById.thumbnail ? categoryById.thumbnail : undefined, is_visible_in_navigation: category.is_visible_in_navigation ? category.is_visible_in_navigation.toString() === "true" : false });

    if (!updatedCategory) throw new InternalServerErrorException('Failed to update category');

    await this.cacheService.invalidateTag(CATEGORY_CACHE_KEY);

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryById = await this.categoryRepository.getById(id);

    if (!categoryById) throw new NotFoundException("Category not found");

    await this.categoryRepository.deleteCategory(id);

    await this.cacheService.invalidateTag(CATEGORY_CACHE_KEY);
  }

  async exportCategories(query: CategoryFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Categories',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Slug', key: 'slug', width: 30 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Thumbnail Link', key: 'thumbnail_link', width: 30 },
        { header: 'Is Visible In Navigation', key: 'is_visible_in_navigation', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.categoryRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          is_visible_in_navigation: query.is_visible_in_navigation,
        })
      },

      mapRow: (category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        thumbnail_link: category.thumbnail_link,
        is_visible_in_navigation: category.is_visible_in_navigation,
        createdAt: category.createdAt?.toISOString(),
        updatedAt: category.updatedAt?.toISOString(),
      }),
    })
  }
}
