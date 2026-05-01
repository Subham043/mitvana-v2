import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CartServiceInterface } from '../interface/cart.service.interface';
import { CartRepositoryInterface } from '../interface/cart.repository.interface';
import { CART_REPOSITORY } from '../cart.constants';
import { CartQueryEntityType } from '../entity/cart.entity';
import { CartDto } from '../schema/cart.schema';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { ApplyCouponDto } from '../schema/apply-coupon.schema';
import { SelectAddressDto } from '../schema/select-address.schema';
import { AddressRepositoryInterface } from 'src/api/address/interface/address.repository.interface';
import { CouponCodeRepositoryInterface } from 'src/api/coupon_codes/interface/coupon_code.repository.interface';
import { ADDRESS_REPOSITORY } from 'src/api/address/address.constants';
import { COUPON_CODE_REPOSITORY } from 'src/api/coupon_codes/coupon_code.constants';

@Injectable()
export class ICartService implements CartServiceInterface {

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepositoryInterface,
    @Inject(COUPON_CODE_REPOSITORY) private readonly couponCodeRepository: CouponCodeRepositoryInterface,
  ) { }

  async getByUserId(userId: string): Promise<CartQueryEntityType | null> {
    return await this.cartRepository.getByUserId(userId, { autoInvalidate: true });
  }

  async createCart(userId: string, dto: CartDto): Promise<CartQueryEntityType | null> {
    const product = await this.productRepository.getById(dto.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product cannot be added to cart", "is_draft", "not_draft");

    const oldCart = await this.cartRepository.getByUserId(userId);

    const newCart = await this.cartRepository.createCart(userId, dto);

    if (oldCart !== null && oldCart.coupon !== null && newCart !== null && newCart.coupon === null) {
      return await this.cartRepository.removeCoupon(userId);
    }

    return newCart;
  }

  async deleteCart(productId: string, userId: string): Promise<CartQueryEntityType | null> {
    const oldCart = await this.cartRepository.getByUserId(userId);
    if (!oldCart) throw new BadRequestException("Cart not found");
    const updatedCart = await this.cartRepository.deleteCart(productId, userId);
    if (oldCart.coupon !== null && updatedCart !== null && updatedCart.coupon === null) {
      return await this.cartRepository.removeCoupon(userId);
    }
    return updatedCart;
  }

  async applyCoupon(userId: string, dto: ApplyCouponDto): Promise<CartQueryEntityType | null> {
    const cart = await this.cartRepository.getByUserId(userId);
    if (!cart) throw new CustomValidationException("Cart not found", "coupon_code", "exist");
    const coupon = await this.couponCodeRepository.getByCode(dto.coupon_code);
    if (!coupon) throw new CustomValidationException("Coupon not found", "coupon_code", "exist");
    if (coupon.is_draft) throw new CustomValidationException("Coupon is not active", "coupon_code", "draft");
    if (coupon.times_redeemed >= coupon.maximum_redemptions) throw new CustomValidationException("Coupon is used up", "coupon_code", "used_up");
    if (new Date(coupon.expiration_date) < new Date()) throw new CustomValidationException("Coupon is expired", "coupon_code", "expired");
    if (coupon.min_cart_value > cart.sub_total) throw new CustomValidationException(`Minimum cart value should be ${coupon.min_cart_value}`, "coupon_code", "not_valid");
    return await this.cartRepository.applyCoupon(userId, dto.coupon_code);
  }

  async removeCoupon(userId: string): Promise<CartQueryEntityType | null> {
    const cart = await this.cartRepository.getByUserId(userId);
    if (!cart) throw new BadRequestException("Cart not found");
    return await this.cartRepository.removeCoupon(userId);
  }

  async selectAddress(userId: string, dto: SelectAddressDto): Promise<CartQueryEntityType | null> {
    const cart = await this.cartRepository.getByUserId(userId);
    if (!cart) throw new BadRequestException("Cart not found");
    const address = await this.addressRepository.getByIdAndUserId(dto.address_id, userId);
    if (!address) throw new BadRequestException("Address not found");
    return await this.cartRepository.selectAddress(userId, dto.address_id);
  }

  async clearCart(userId: string): Promise<CartQueryEntityType | null> {
    return await this.cartRepository.clearCart(userId);
  }
}
