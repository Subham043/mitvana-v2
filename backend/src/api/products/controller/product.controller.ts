import { Controller, Post, Inject, Delete, Param, Get, Put, UseGuards, Query, Body, Patch, Res } from '@nestjs/common';
import { ProductCreateDto, productCreateDtoValidator } from '../schema/product-create.schema';
import { ProductServiceInterface } from '../interface/product.service.interface';
import { PRODUCT_SERVICE } from '../product.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { VineMultipart } from 'src/utils/decorator/vine-multipart.decorator';
import { ProductUpdateDto, productUpdateDtoValidator } from '../schema/product-update.schema';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { ProductUpdateStatusDto, productUpdateStatusDtoValidator } from '../schema/product-update-status.schema';
import { FastifyReply } from 'fastify';
import { ProductFilterDto, productFilterDtoValidator } from '../schema/product-filter.schema';

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
  async getAllProducts(@Query(new VineValidationPipe(productFilterDtoValidator)) query: ProductFilterDto) {
    return await this.productService.getAll(query);
  }

  @Get('/published')
  async getAllPublishedProducts(@Query(new VineValidationPipe(productFilterDtoValidator)) query: ProductFilterDto) {
    return await this.productService.getAllPublished(query);
  }

  @Public()
  @Get('/published/public')
  async getAllPublishedProductsForPublic(@Query(new VineValidationPipe(productFilterDtoValidator)) query: ProductFilterDto) {
    return await this.productService.getAllPublishedForPublic(query);
  }

  @Patch('/status/:id')
  async updateProductStatus(@Body(new VineValidationPipe(productUpdateStatusDtoValidator)) productUpdateStatusDto: ProductUpdateStatusDto, @Param('id') id: string) {
    return await this.productService.updateProductStatus(id, productUpdateStatusDto);
  }

  @Put('/:id')
  async updateProduct(@VineMultipart<ProductUpdateDto>(productUpdateDtoValidator) productDto: ProductUpdateDto, @Param('id') id: string) {
    return await this.productService.updateProduct(id, productDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Delete('/:id/image/:imageId')
  async deleteProductImage(@Param('id') id: string, @Param('imageId') imageId: string) {
    return await this.productService.deleteProductImage(id, imageId);
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  @Get('/slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productService.getBySlug(slug);
  }

  @Public()
  @Get('/slug/:slug/public')
  async getProductBySlugForPublic(@Param('slug') slug: string) {
    return await this.productService.getBySlugForPublic(slug);
  }

  @Get('/export')
  async export(@Query(new VineValidationPipe(productFilterDtoValidator)) query: ProductFilterDto, @Res() reply: FastifyReply) {
    const stream = await this.productService.exportProducts(query)

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="products.xlsx"',
    )

    return reply.send(stream)
  }
}
