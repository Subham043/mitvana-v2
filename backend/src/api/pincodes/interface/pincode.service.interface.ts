import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { PincodeEntity } from "../entity/pincode.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PincodeDto } from "../schema/pincode.schema";
import { PincodeUpdateStatusDto } from "../schema/pincode-update-status.schema";

export interface PincodeServiceInterface {
    getByPincode(pincode: number): Promise<PincodeEntity>;
    getById(id: string): Promise<PincodeEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<PincodeEntity>>;
    createPincode(pincode: PincodeDto): Promise<PincodeEntity>;
    updatePincode(id: string, pincode: PincodeDto): Promise<PincodeEntity>;
    updatePincodeStatus(id: string, pincode: PincodeUpdateStatusDto): Promise<PincodeEntity>;
    deletePincode(id: string): Promise<void>;
}