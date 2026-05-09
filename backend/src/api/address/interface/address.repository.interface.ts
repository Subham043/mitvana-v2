import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewAddressEntity, UpdateAddressEntity, AddressEntity } from "../entity/address.entity";

export interface AddressRepositoryInterface {
    getByIdAndUserId(id: string, userId: string): Promise<AddressEntity | null>;
    getAll(query: PaginationQuery, userId: string): Promise<AddressEntity[]>;
    count(userId: string, search?: string): Promise<number>
    createAddress(address: NewAddressEntity): Promise<AddressEntity | null>;
    updateAddress(id: string, userId: string, address: UpdateAddressEntity): Promise<AddressEntity | null>;
    deleteAddress(id: string, userId: string): Promise<void>;
}