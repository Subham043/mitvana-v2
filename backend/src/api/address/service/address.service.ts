import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddressServiceInterface } from '../interface/address.service.interface';
import { AddressRepositoryInterface } from '../interface/address.repository.interface';
import { ADDRESS_CACHE_KEY, ADDRESS_REPOSITORY } from '../address.constants';
import { AddressEntity } from '../entity/address.entity';
import { AddressDto } from '../schema/address.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { PincodeRepositoryInterface } from 'src/api/pincodes/interface/pincode.repository.interface';
import { PINCODE_REPOSITORY } from 'src/api/pincodes/pincode.constants';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';
import { CART_CACHE_KEY } from 'src/api/carts/cart.constants';

@Injectable()
export class IAddressService implements AddressServiceInterface {

  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepositoryInterface,
    @Inject(PINCODE_REPOSITORY) private readonly pincodeRepository: PincodeRepositoryInterface,
    private readonly cacheService: CacheService,
  ) { }

  async getByIdAndUserId(id: string, userId: string): Promise<AddressEntity> {
    const cacheKey = HelperUtil.generateCacheKey(ADDRESS_CACHE_KEY + `:u_${userId}`, { id, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const address = await this.addressRepository.getByIdAndUserId(id, userId, { autoInvalidate: true });

        if (!address) throw new NotFoundException("Address not found");

        return address;
      },
      options: {
        tags: [ADDRESS_CACHE_KEY, ADDRESS_CACHE_KEY + `:u_${userId}`, cacheKey],
      },
    });
  }

  async getAll(query: PaginationDto, userId: string): Promise<PaginationResponse<AddressEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const cacheKey = HelperUtil.generateCacheKey(ADDRESS_CACHE_KEY + `:u_${userId}`, { page, limit, offset, search, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const addresses = await this.addressRepository.getAll({ page, limit, offset, search }, userId, { autoInvalidate: true });
        const count = await this.addressRepository.count(userId, search, { autoInvalidate: true });

        return { data: addresses, meta: { page, limit, total: count, search } };
      },
      options: {
        tags: [ADDRESS_CACHE_KEY, ADDRESS_CACHE_KEY + `:u_${userId}`, cacheKey],
      },
    });
  }

  async createAddress(userId: string, address: AddressDto): Promise<AddressEntity> {
    const pincode = await this.pincodeRepository.getByPincode(address.postal_code);

    if (!pincode || !pincode.is_delivery_available) throw new CustomValidationException("we do not deliver in the provided postal code", "postal_code", "exist");

    const newAddress = await this.addressRepository.createAddress({ ...address, user_id: userId });

    if (!newAddress) throw new InternalServerErrorException('Failed to create address');

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY + `:u_${userId}`);

    return newAddress;
  }

  async updateAddress(id: string, userId: string, address: AddressDto): Promise<AddressEntity> {
    const addressById = await this.addressRepository.getByIdAndUserId(id, userId);

    if (!addressById) throw new NotFoundException("Address not found");

    const pincode = await this.pincodeRepository.getByPincode(address.postal_code);

    if (!pincode || !pincode.is_delivery_available) throw new CustomValidationException("we do not deliver in the provided postal code", "postal_code", "exist");

    const updatedAddress = await this.addressRepository.updateAddress(id, userId, address);

    if (!updatedAddress) throw new InternalServerErrorException('Failed to update address');

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY + `:u_${userId}`);

    await this.cacheService.invalidateTag(CART_CACHE_KEY + `:u_${userId}`);

    return updatedAddress;
  }

  async deleteAddress(id: string, userId: string): Promise<void> {
    const addressById = await this.addressRepository.getByIdAndUserId(id, userId);

    if (!addressById) throw new NotFoundException("Address not found");

    await this.addressRepository.deleteAddress(id, userId);

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY + `:u_${userId}`);

    await this.cacheService.invalidateTag(CART_CACHE_KEY + `:u_${userId}`);
  }
}
