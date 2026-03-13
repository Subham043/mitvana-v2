import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { WishlistDto, wishlistDtoValidator } from '../schema/wishlist.schema';
import { WishlistServiceInterface } from '../interface/wishlist.service.interface';
import { WISHLIST_SERVICE } from '../wishlist.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'wishlist',
})
@Verified()
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard)
export class WishlistController {
  constructor(@Inject(WISHLIST_SERVICE) private readonly addressService: WishlistServiceInterface) { }

  @Post('/')
  async createWishlist(@Body(new VineValidationPipe(wishlistDtoValidator)) addressDto: WishlistDto, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.createWishlist(user.id, addressDto);
  }

  @Delete('/:productId')
  async deleteWishlist(@Param('productId') productId: string, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.deleteWishlist(productId, user.id);
  }

  @Get('/')
  async getAllWishlists(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto, @GetCurrentUser() user: JwtPayload) {
    return await this.addressService.getAllByUserId(query, user.id);
  }
}
