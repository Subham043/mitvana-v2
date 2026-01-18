import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewAddressEntity, UpdateAddressEntity, AddressEntity } from "../entity/address.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface AddressRepositoryInterface {
    getByIdAndUserId(id: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<AddressEntity | null>;
    getAll(query: PaginationQuery, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<AddressEntity[]>;
    count(userId: string, search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createAddress(address: NewAddressEntity): Promise<AddressEntity | null>;
    updateAddress(id: string, userId: string, address: UpdateAddressEntity): Promise<AddressEntity | null>;
    deleteAddress(id: string, userId: string): Promise<void>;
}