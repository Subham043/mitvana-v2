import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { AddressEntity } from "../entity/address.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { AddressDto } from "../schema/address.schema";

export interface AddressServiceInterface {
    getByIdAndUserId(id: string, userId: string): Promise<AddressEntity>;
    getAll(query: PaginationDto, userId: string): Promise<PaginationResponse<AddressEntity>>;
    createAddress(userId: string, address: AddressDto): Promise<AddressEntity>;
    updateAddress(id: string, userId: string, address: AddressDto): Promise<AddressEntity>;
    deleteAddress(id: string, userId: string): Promise<void>;
}