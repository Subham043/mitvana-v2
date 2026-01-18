import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AddressServiceInterface } from '../interface/address.service.interface';
import { AddressRepositoryInterface } from '../interface/address.repository.interface';
import { ADDRESS_REPOSITORY } from '../address.constants';
import { AddressEntity } from '../entity/address.entity';
import { AddressDto } from '../schema/address.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class IAddressService implements AddressServiceInterface {

  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepositoryInterface,
  ) { }

  async getByIdAndUserId(id: string, userId: string): Promise<AddressEntity> {
    const address = await this.addressRepository.getByIdAndUserId(id, userId, { autoInvalidate: true });

    if (!address) throw new NotFoundException("Address not found");

    return address;
  }

  async getAll(query: PaginationDto, userId: string): Promise<PaginationResponse<AddressEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const addresses = await this.addressRepository.getAll({ page, limit, offset, search }, userId, { autoInvalidate: true });
    const count = await this.addressRepository.count(userId, search, { autoInvalidate: true });
    return { data: addresses, meta: { page, limit, total: count, search } };
  }

  async createAddress(userId: string, address: AddressDto): Promise<AddressEntity> {
    const newAddress = await this.addressRepository.createAddress({ ...address, user_id: userId });

    if (!newAddress) throw new InternalServerErrorException('Failed to create address');

    return newAddress;
  }

  async updateAddress(id: string, userId: string, address: AddressDto): Promise<AddressEntity> {
    const addressById = await this.addressRepository.getByIdAndUserId(id, userId);

    if (!addressById) throw new NotFoundException("Address not found");

    const updatedAddress = await this.addressRepository.updateAddress(id, userId, address);

    if (!updatedAddress) throw new InternalServerErrorException('Failed to update address');

    return updatedAddress;
  }

  async deleteAddress(id: string, userId: string): Promise<void> {
    const addressById = await this.addressRepository.getByIdAndUserId(id, userId);

    if (!addressById) throw new NotFoundException("Address not found");

    await this.addressRepository.deleteAddress(id, userId);
  }
}
