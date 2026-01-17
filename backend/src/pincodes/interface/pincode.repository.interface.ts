import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewPincodeEntity, UpdatePincodeEntity, PincodeEntity } from "../entity/pincode.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface PincodeRepositoryInterface {
    getByPincode(pincode: number, cacheConfig?: CustomQueryCacheConfig): Promise<PincodeEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<PincodeEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<PincodeEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createPincode(pincode: NewPincodeEntity): Promise<PincodeEntity | null>;
    updatePincode(id: string, pincode: UpdatePincodeEntity): Promise<PincodeEntity | null>;
    deletePincode(id: string): Promise<void>;
}