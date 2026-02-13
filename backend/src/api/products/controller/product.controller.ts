import { Controller, Post, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { ProductCreateDto, productCreateDtoValidator } from '../schema/product-create.schema';
import { ProductServiceInterface } from '../interface/product.service.interface';
import { PRODUCT_SERVICE } from '../product.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { VineMultipart } from 'src/utils/decorator/vine-multipart.decorator';
import { ProductUpdateDto, productUpdateDtoValidator } from '../schema/product-update.schema';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller({
  version: '1',
  path: 'product',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ProductServiceInterface) { }

  @Post('/')
  async createProduct(
    @VineMultipart<ProductCreateDto>(productCreateDtoValidator) productDto: ProductCreateDto,
  ) {
    return await this.productService.createProduct(productDto);
  }

  @Get('/')
  async getAllProducts(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.productService.getAll(query);
  }

  @Get('/published')
  async getAllPublishedProducts(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.productService.getAllPublished(query);
  }

  @Put('/:id')
  async updateProduct(@VineMultipart<ProductUpdateDto>(productUpdateDtoValidator) productDto: ProductUpdateDto, @Param('id') id: string) {
    return await this.productService.updateProduct(id, productDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  @Public()
  @Get('/slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productService.getBySlug(slug);
  }
}
