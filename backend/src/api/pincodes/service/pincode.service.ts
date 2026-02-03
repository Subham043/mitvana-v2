import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PincodeServiceInterface } from '../interface/pincode.service.interface';
import { PincodeRepositoryInterface } from '../interface/pincode.repository.interface';
import { PINCODE_REPOSITORY } from '../pincode.constants';
import { PincodeEntity } from '../entity/pincode.entity';
import { PincodeDto } from '../schema/pincode.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';

@Injectable()
export class IPincodeService implements PincodeServiceInterface {

  constructor(
    @Inject(PINCODE_REPOSITORY) private readonly pincodeRepository: PincodeRepositoryInterface,
  ) { }

  async getByPincode(code: number): Promise<PincodeEntity> {
    const pincode = await this.pincodeRepository.getByPincode(code, { autoInvalidate: true });

    if (!pincode) throw new NotFoundException("Pincode not found");

    return pincode;
  }

  async getById(id: string): Promise<PincodeEntity> {
    const pincode = await this.pincodeRepository.getById(id, { autoInvalidate: true });

    if (!pincode) throw new NotFoundException("Pincode not found");

    return pincode;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<PincodeEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const pincodes = await this.pincodeRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.pincodeRepository.count(search, { autoInvalidate: true });
    return { data: pincodes, meta: { page, limit, total: count, search } };
  }

  async createPincode(pincode: PincodeDto): Promise<PincodeEntity> {
    const pincodeByCode = await this.pincodeRepository.getByPincode(pincode.pincode);

    if (pincodeByCode) throw new CustomValidationException("The pincode already exists", "pincode", "unique");

    const newPincode = await this.pincodeRepository.createPincode(pincode);

    if (!newPincode) throw new InternalServerErrorException('Failed to create pincode');

    return newPincode;
  }

  async updatePincode(id: string, pincode: PincodeDto): Promise<PincodeEntity> {
    const pincodeById = await this.pincodeRepository.getById(id);

    if (!pincodeById) throw new NotFoundException("Pincode not found");

    const pincodeByCode = await this.pincodeRepository.getByPincode(pincode.pincode);

    if (pincodeByCode && pincodeByCode.pincode !== pincodeById.pincode) throw new CustomValidationException("The pincode already exists", "pincode", "unique");

    const updatedPincode = await this.pincodeRepository.updatePincode(id, pincode);

    if (!updatedPincode) throw new InternalServerErrorException('Failed to update pincode');

    return updatedPincode;
  }

  async deletePincode(id: string): Promise<void> {
    const pincodeById = await this.pincodeRepository.getById(id);

    if (!pincodeById) throw new NotFoundException("Pincode not found");

    await this.pincodeRepository.deletePincode(id);
  }
}
