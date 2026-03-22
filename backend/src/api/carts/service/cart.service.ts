import { Inject, Injectable } from '@nestjs/common';
import { CartServiceInterface } from '../interface/cart.service.interface';
import { CartRepositoryInterface } from '../interface/cart.repository.interface';
import { CART_REPOSITORY } from '../cart.constants';
import { CartQueryEntityType } from '../entity/cart.entity';
import { CartDto } from '../schema/cart.schema';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';

@Injectable()
export class ICartService implements CartServiceInterface {

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
  ) { }

  async getByUserId(userId: string): Promise<CartQueryEntityType | null> {
    return await this.cartRepository.getByUserId(userId, { autoInvalidate: true });
  }

  async createCart(userId: string, wishlist: CartDto): Promise<CartQueryEntityType | null> {
    const product = await this.productRepository.getById(wishlist.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product cannot be added to cart", "is_draft", "not_draft");

    const newCart = await this.cartRepository.createCart(userId, wishlist);

    return newCart;
  }

  async deleteCart(productId: string, userId: string): Promise<void> {
    await this.cartRepository.deleteCart(productId, userId);
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartRepository.clearCart(userId);
  }
}
