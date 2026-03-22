import { PincodeEntity } from "../entity/pincode.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PincodeDto } from "../schema/pincode.schema";
import { PincodeUpdateStatusDto } from "../schema/pincode-update-status.schema";
import { PassThrough } from "stream";
import { PincodeFilterDto } from "../schema/pincode-filter.schema";

export interface PincodeServiceInterface {
    getByPincode(pincode: number): Promise<PincodeEntity>;
    getById(id: string): Promise<PincodeEntity>;
    getAll(query: PincodeFilterDto): Promise<PaginationResponse<PincodeEntity, PincodeFilterDto>>;
    createPincode(pincode: PincodeDto): Promise<PincodeEntity>;
    updatePincode(id: string, pincode: PincodeDto): Promise<PincodeEntity>;
    updatePincodeStatus(id: string, pincode: PincodeUpdateStatusDto): Promise<PincodeEntity>;
    deletePincode(id: string): Promise<void>;
    exportPincodes(query: PincodeFilterDto): Promise<PassThrough>;
    checkPincode(code: number): Promise<{ pincode: number; is_delivery_available: boolean; }>;
}