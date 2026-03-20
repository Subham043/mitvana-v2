import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { ProductReviewDto, productReviewDtoValidator } from '../schema/product_review.schema';
import { ProductReviewServiceInterface } from '../interface/product_review.service.interface';
import { PRODUCT_REVIEW_SERVICE } from '../product_review.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { ProductReviewApprovalDto, productReviewApprovalDtoValidator } from '../schema/product-review-approval.schema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller({
  version: '1',
  path: 'product-review',
})
@Verified()
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
export class ProductReviewController {
  constructor(@Inject(PRODUCT_REVIEW_SERVICE) private readonly productReviewService: ProductReviewServiceInterface) { }

  @Post('/')
  async createProductReview(@Body(new VineValidationPipe(productReviewDtoValidator)) productReviewDto: ProductReviewDto, @GetCurrentUser() user: JwtPayload) {
    return await this.productReviewService.createProductReview(user.id, productReviewDto);
  }

  @Role("ADMIN")
  @Put('/:id')
  async updateProductReview(@Body(new VineValidationPipe(productReviewApprovalDtoValidator)) productReviewDto: ProductReviewApprovalDto, @Param('id') id: string) {
    return await this.productReviewService.updateProductReviewStatus(id, productReviewDto);
  }

  @Role("ADMIN")
  @Delete('/:id')
  async deleteProductReview(@Param('id') id: string) {
    return await this.productReviewService.deleteProductReview(id);
  }

  @Role("ADMIN")
  @Get('/:id')
  async getProductReview(@Param('id') id: string) {
    return await this.productReviewService.getById(id);
  }

  @Role("ADMIN")
  @Get('/')
  async getAllProductReviews(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.productReviewService.getAll(query);
  }

  @Get('/user')
  async getAllProductReviewsByUserId(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto, @GetCurrentUser() user: JwtPayload) {
    return await this.productReviewService.getAllByUserId(query, user.id);
  }

  @Public()
  @Get('/approved')
  async getAllApprovedProductReviews(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.productReviewService.getAllApproved(query);
  }
}
