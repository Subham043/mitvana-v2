import { Controller, Post, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { CategoryCreateDto, categoryCreateDtoValidator } from '../schema/category-create.schema';
import { CategoryServiceInterface } from '../interface/category.service.interface';
import { CATEGORY_SERVICE } from '../category.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { VineMultipart } from 'src/utils/decorator/vine-multipart.decorator';
import { CategoryUpdateDto, categoryUpdateDtoValidator } from '../schema/category-update.schema';

@Controller({
  version: '1',
  path: 'category',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class CategoryController {
  constructor(@Inject(CATEGORY_SERVICE) private readonly categoryService: CategoryServiceInterface) { }

  @Post('/')
  async createCategory(
    @VineMultipart<CategoryCreateDto>(categoryCreateDtoValidator) categoryDto: CategoryCreateDto,
  ) {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Put('/:id')
  async updateCategory(@VineMultipart<CategoryUpdateDto>(categoryUpdateDtoValidator) categoryDto: CategoryUpdateDto, @Param('id') id: string) {
    return await this.categoryService.updateCategory(id, categoryDto);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }

  @Get('/:id')
  @Public()
  async getCategory(@Param('id') id: string) {
    return await this.categoryService.getById(id);
  }

  @Get('/slug/:slug')
  @Public()
  async getCategoryBySlug(@Param('slug') slug: string) {
    return await this.categoryService.getBySlug(slug);
  }

  @Get('/')
  @Public()
  async getAllCategories(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.categoryService.getAll(query);
  }
}
