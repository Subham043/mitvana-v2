import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IngredientServiceInterface } from '../interface/ingredient.service.interface';
import { IngredientRepositoryInterface } from '../interface/ingredient.repository.interface';
import { INGREDIENT_REPOSITORY } from '../ingredient.constants';
import { IngredientEntity, UpdateIngredientEntity } from '../entity/ingredient.entity';
import { IngredientCreateDto } from '../schema/ingredient-create.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { FileHelperUtil } from 'src/utils/file.util';
import { IngredientUpdateDto } from '../schema/ingredient-update.schema';

@Injectable()
export class IngredientService implements IngredientServiceInterface {

  constructor(
    @Inject(INGREDIENT_REPOSITORY) private readonly ingredientRepository: IngredientRepositoryInterface,
  ) { }

  async getByTitle(title: string): Promise<IngredientEntity> {
    const ingredient = await this.ingredientRepository.getByTitle(title);

    if (!ingredient) throw new NotFoundException("Ingredient not found");

    return ingredient;
  }

  async getById(id: string): Promise<IngredientEntity> {
    const ingredient = await this.ingredientRepository.getById(id);

    if (!ingredient) throw new NotFoundException("Ingredient not found");

    return ingredient;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<IngredientEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const ingredients = await this.ingredientRepository.getAll({ page, limit, offset, search });
    const count = await this.ingredientRepository.count(search);
    return { data: ingredients, meta: { page, limit, total: count, search } };
  }

  async createIngredient(ingredient: IngredientCreateDto): Promise<IngredientEntity> {
    const ingredientByTitle = await this.ingredientRepository.getByTitle(ingredient.title);

    if (ingredientByTitle) throw new CustomValidationException("The ingredient title already exists", "title", "unique");

    //save the file in uploads using FileHelperUtil and the fileTempPath
    const thumbnail = await FileHelperUtil.saveFile(ingredient.thumbnail);

    const newIngredient = await this.ingredientRepository.createIngredient({
      title: ingredient.title,
      description: ingredient.description,
      thumbnail: thumbnail,
    });

    if (!newIngredient) throw new InternalServerErrorException('Failed to create ingredient');

    return newIngredient;
  }

  async updateIngredient(id: string, ingredient: IngredientUpdateDto): Promise<IngredientEntity> {
    const ingredientById = await this.ingredientRepository.getById(id);

    if (!ingredientById) throw new NotFoundException("Ingredient not found");

    const ingredientByTitle = await this.ingredientRepository.getByTitle(ingredient.title);

    if (ingredientByTitle && ingredientByTitle.title !== ingredientById.title) throw new CustomValidationException("The ingredient title already exists", "title", "unique");

    const data: UpdateIngredientEntity = {
      title: ingredient.title,
      description: ingredient.description,
    }
    if (ingredient.thumbnail) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const thumbnail = await FileHelperUtil.saveFile(ingredient.thumbnail);
      data.thumbnail = thumbnail;
    }

    const updatedIngredient = await this.ingredientRepository.updateIngredient(id, data);

    if (!updatedIngredient) throw new InternalServerErrorException('Failed to update ingredient');

    return updatedIngredient;
  }

  async deleteIngredient(id: string): Promise<void> {
    const ingredientById = await this.ingredientRepository.getById(id);

    if (!ingredientById) throw new NotFoundException("Ingredient not found");

    await this.ingredientRepository.deleteIngredient(id);
  }
}
