import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryServiceInterface } from '../interface/category.service.interface';
import { CategoryRepositoryInterface } from '../interface/category.repository.interface';
import { CATEGORY_REPOSITORY } from '../category.constants';
import { CategoryEntity, UpdateCategoryEntity } from '../entity/category.entity';
import { CategoryCreateDto } from '../schema/category-create.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { FileHelperUtil } from 'src/utils/file.util';
import { CategoryUpdateDto } from '../schema/category-update.schema';

@Injectable()
export class CategoryService implements CategoryServiceInterface {

  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryInterface,
  ) { }

  async getByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getByName(name, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    return category;
  }

  async getBySlug(slug: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getBySlug(slug, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    return category;
  }

  async getById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getById(id, { autoInvalidate: true });

    if (!category) throw new NotFoundException("Category not found");

    return category;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<CategoryEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const categories = await this.categoryRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.categoryRepository.count(search, { autoInvalidate: true });
    return { data: categories, meta: { page, limit, total: count, search } };
  }

  async createCategory(category: CategoryCreateDto): Promise<CategoryEntity> {
    const categoryByName = await this.categoryRepository.getByName(category.name);

    if (categoryByName) throw new CustomValidationException("The category name already exists", "name", "unique");

    if (category.slug) {
      const categoryBySlug = await this.categoryRepository.getBySlug(category.slug);
      if (categoryBySlug) throw new CustomValidationException("The category slug already exists", "slug", "unique");
    }

    //save the file in uploads using FileHelperUtil and the fileTempPath
    const thumbnail = await FileHelperUtil.saveFile(category.thumbnail);

    const newCategory = await this.categoryRepository.createCategory({
      name: category.name,
      description: category.description,
      thumbnail: thumbnail,
      is_visible_in_navigation: category.is_visible_in_navigation ? category.is_visible_in_navigation.toString() === "true" : false,
      slug: category.slug ?? category.name.toLowerCase().replace(/ /g, '-'),
    });

    if (!newCategory) throw new InternalServerErrorException('Failed to create category');

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

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    const categoryById = await this.categoryRepository.getById(id);

    if (!categoryById) throw new NotFoundException("Category not found");

    await this.categoryRepository.deleteCategory(id);
  }
}
