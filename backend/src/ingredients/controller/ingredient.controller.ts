import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { IngredientCreateDto, ingredientCreateDtoValidator } from '../schema/ingredient-create.schema';
import { IngredientServiceInterface } from '../interface/ingredient.service.interface';
import { INGREDIENT_SERVICE } from '../ingredient.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { VineMultipart } from 'src/utils/decorator/vine-multipart.decorator';
import { IngredientUpdateDto, ingredientUpdateDtoValidator } from '../schema/ingredient-update.schema';

@Controller({
  version: '1',
  path: 'ingredient',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class IngredientController {
  constructor(@Inject(INGREDIENT_SERVICE) private readonly ingredientService: IngredientServiceInterface) { }

  @Post('/')
  async createIngredient(
    @VineMultipart<IngredientCreateDto>(ingredientCreateDtoValidator) ingredientDto: IngredientCreateDto,
  ) {
    return await this.ingredientService.createIngredient(ingredientDto);
  }

  @Put('/:id')
  async updateIngredient(@VineMultipart<IngredientUpdateDto>(ingredientUpdateDtoValidator) ingredientDto: IngredientUpdateDto, @Param('id') id: string) {
    return await this.ingredientService.updateIngredient(id, ingredientDto);
  }

  @Delete('/:id')
  async deleteIngredient(@Param('id') id: string) {
    return await this.ingredientService.deleteIngredient(id);
  }

  @Get('/:id')
  @Public()
  async getIngredient(@Param('id') id: string) {
    return await this.ingredientService.getById(id);
  }

  @Get('/')
  @Public()
  async getAllIngredients(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.ingredientService.getAll(query);
  }
}
