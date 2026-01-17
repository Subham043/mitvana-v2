import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { NewPincodeEntity, PincodeEntity, UpdatePincodeEntity } from "../entity/pincode.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";

export interface PincodeServiceInterface {
    getByPincode(pincode: number): Promise<PincodeEntity>;
    getById(id: string): Promise<PincodeEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<PincodeEntity>>;
    createPincode(pincode: NewPincodeEntity): Promise<PincodeEntity>;
    updatePincode(id: string, pincode: UpdatePincodeEntity): Promise<PincodeEntity>;
    deletePincode(id: string): Promise<void>;
}