import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewPincodeEntity, UpdatePincodeEntity, PincodeEntity } from "../entity/pincode.entity";
import { PincodeFilterDto } from "../schema/pincode-filter.schema";

export interface PincodeRepositoryInterface {
    getByPincode(pincode: number): Promise<PincodeEntity | null>;
    getById(id: string): Promise<PincodeEntity | null>;
    getAll(query: PaginationQuery<PincodeFilterDto>): Promise<PincodeEntity[]>;
    count(query: CountQuery<PincodeFilterDto>): Promise<number>
    createPincode(pincode: NewPincodeEntity): Promise<PincodeEntity | null>;
    updatePincode(id: string, pincode: UpdatePincodeEntity): Promise<PincodeEntity | null>;
    deletePincode(id: string): Promise<void>;
    checkPincode(code: number): Promise<{ pincode: number; is_delivery_available: boolean; shipping_charges: number; }>;
}