import { Controller, Post, Body, Inject, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { CartDto, cartDtoValidator } from '../schema/cart.schema';
import { CartServiceInterface } from '../interface/cart.service.interface';
import { CART_SERVICE } from '../cart.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { GetCurrentUser } from 'src/auth/decorators/get_current_user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';

@Controller({
  version: '1',
  path: 'cart',
})
@Verified()
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard)
export class CartController {
  constructor(@Inject(CART_SERVICE) private readonly cartService: CartServiceInterface) { }

  @Post('/')
  async createCart(@Body(new VineValidationPipe(cartDtoValidator)) cartDto: CartDto, @GetCurrentUser() user: JwtPayload) {
    return await this.cartService.createCart(user.id, cartDto);
  }

  @Delete('/')
  async clearCart(@GetCurrentUser() user: JwtPayload) {
    return await this.cartService.clearCart(user.id);
  }

  @Delete('/:productId')
  async deleteCart(@Param('productId') productId: string, @GetCurrentUser() user: JwtPayload) {
    return await this.cartService.deleteCart(productId, user.id);
  }

  @Get('/')
  async getCart(@GetCurrentUser() user: JwtPayload) {
    return await this.cartService.getByUserId(user.id);
  }
}
