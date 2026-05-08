import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PincodeServiceInterface } from '../interface/pincode.service.interface';
import { PincodeRepositoryInterface } from '../interface/pincode.repository.interface';
import { PINCODE_CACHE_KEY, PINCODE_REPOSITORY } from '../pincode.constants';
import { PincodeEntity } from '../entity/pincode.entity';
import { PincodeDto } from '../schema/pincode.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PincodeUpdateStatusDto } from '../schema/pincode-update-status.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { PincodeFilterDto } from '../schema/pincode-filter.schema';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';
import { CART_CACHE_KEY } from 'src/api/carts/cart.constants';
import { ADDRESS_CACHE_KEY } from 'src/api/address/address.constants';

@Injectable()
export class IPincodeService implements PincodeServiceInterface {

  constructor(
    @Inject(PINCODE_REPOSITORY) private readonly pincodeRepository: PincodeRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async getByPincode(code: number): Promise<PincodeEntity> {
    const cacheKey = HelperUtil.generateCacheKey(PINCODE_CACHE_KEY, { code });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const pincode = await this.pincodeRepository.getByPincode(code, { autoInvalidate: true });

        if (!pincode) throw new NotFoundException("Pincode not found");

        return pincode;
      },
      options: {
        tags: [PINCODE_CACHE_KEY, cacheKey],
      },
    });
  }

  async getById(id: string): Promise<PincodeEntity> {
    const cacheKey = HelperUtil.generateCacheKey(PINCODE_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const pincode = await this.pincodeRepository.getById(id, { autoInvalidate: true });

        if (!pincode) throw new NotFoundException("Pincode not found");

        return pincode;
      },
      options: {
        tags: [PINCODE_CACHE_KEY, cacheKey],
      },
    });
  }

  async checkPincode(code: number): Promise<{ pincode: number; is_delivery_available: boolean; shipping_charges: number; }> {
    const cacheKey = HelperUtil.generateCacheKey(PINCODE_CACHE_KEY + ":check", { code });
    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const pincode = await this.pincodeRepository.checkPincode(code, { autoInvalidate: true });

        if (!pincode) throw new NotFoundException("Pincode not found");

        return pincode;
      },
      options: {
        tags: [PINCODE_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: PincodeFilterDto): Promise<PaginationResponse<PincodeEntity, PincodeFilterDto>> {
    const { page, limit, offset, search, is_igst_applicable, is_delivery_available } = normalizePagination<PincodeFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PINCODE_CACHE_KEY, { page, limit, offset, search, is_igst_applicable, is_delivery_available });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const pincodes = await this.pincodeRepository.getAll({ page, limit, offset, search, is_igst_applicable, is_delivery_available }, { autoInvalidate: true });
        const count = await this.pincodeRepository.count({ search, is_igst_applicable, is_delivery_available }, { autoInvalidate: true });
        return { data: pincodes, meta: { page, limit, total: count, search, is_igst_applicable, is_delivery_available } };
      },
      options: {
        tags: [PINCODE_CACHE_KEY, cacheKey],
      },
    });
  }

  async createPincode(pincode: PincodeDto): Promise<PincodeEntity> {
    const pincodeByCode = await this.pincodeRepository.getByPincode(pincode.pincode);

    if (pincodeByCode) throw new CustomValidationException("The pincode already exists", "pincode", "unique");

    const newPincode = await this.pincodeRepository.createPincode({ ...pincode, is_delivery_available: pincode.is_delivery_available ? pincode.is_delivery_available.toString() === "true" : false, is_igst_applicable: pincode.is_igst_applicable ? pincode.is_igst_applicable.toString() === "true" : false });

    if (!newPincode) throw new InternalServerErrorException('Failed to create pincode');

    await this.cacheService.invalidateTag(PINCODE_CACHE_KEY);

    return newPincode;
  }

  async updatePincode(id: string, pincode: PincodeDto): Promise<PincodeEntity> {
    const pincodeById = await this.pincodeRepository.getById(id);

    if (!pincodeById) throw new NotFoundException("Pincode not found");

    const pincodeByCode = await this.pincodeRepository.getByPincode(pincode.pincode);

    if (pincodeByCode && pincodeByCode.pincode !== pincodeById.pincode) throw new CustomValidationException("The pincode already exists", "pincode", "unique");

    const updatedPincode = await this.pincodeRepository.updatePincode(id, { ...pincode, is_delivery_available: pincode.is_delivery_available ? pincode.is_delivery_available.toString() === "true" : false, is_igst_applicable: pincode.is_igst_applicable ? pincode.is_igst_applicable.toString() === "true" : false });

    if (!updatedPincode) throw new InternalServerErrorException('Failed to update pincode');

    await this.cacheService.invalidateTag(PINCODE_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY);

    return updatedPincode;
  }

  async updatePincodeStatus(id: string, pincodeStatus: PincodeUpdateStatusDto): Promise<PincodeEntity> {
    const pincodeById = await this.pincodeRepository.getById(id);

    if (!pincodeById) throw new NotFoundException("Pincode not found");

    const updatedPincode = await this.pincodeRepository.updatePincode(id, { ...pincodeById, is_delivery_available: pincodeStatus.is_delivery_available ? pincodeStatus.is_delivery_available.toString() === "true" : false });

    if (!updatedPincode) throw new InternalServerErrorException('Failed to update pincode');

    await this.cacheService.invalidateTag(PINCODE_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY);

    return updatedPincode;
  }

  async deletePincode(id: string): Promise<void> {
    const pincodeById = await this.pincodeRepository.getById(id);

    if (!pincodeById) throw new NotFoundException("Pincode not found");

    await this.pincodeRepository.deletePincode(id);

    await this.cacheService.invalidateTag(PINCODE_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(ADDRESS_CACHE_KEY);
  }

  async exportPincodes(query: PincodeFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Pincodes',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Pincode', key: 'pincode', width: 30 },
        { header: 'Shipping Charges', key: 'shipping_charges', width: 30 },
        { header: 'Is Delivery Available', key: 'is_delivery_available', width: 30 },
        { header: 'Is IGST Applicable', key: 'is_igst_applicable', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.pincodeRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          is_igst_applicable: query.is_igst_applicable,
          is_delivery_available: query.is_delivery_available,
        })
      },

      mapRow: (pincode) => ({
        id: pincode.id,
        pincode: pincode.pincode,
        shipping_charges: pincode.shipping_charges,
        is_delivery_available: pincode.is_delivery_available,
        is_igst_applicable: pincode.is_igst_applicable,
        createdAt: pincode.createdAt?.toISOString(),
        updatedAt: pincode.updatedAt?.toISOString(),
      }),
    })
  }
}
