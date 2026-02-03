import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { NewColorEntity, ColorEntity, UpdateColorEntity } from "../entity/color.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";

export interface ColorServiceInterface {
    getById(id: string): Promise<ColorEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<ColorEntity>>;
    createColor(color: NewColorEntity): Promise<ColorEntity>;
    updateColor(id: string, color: UpdateColorEntity): Promise<ColorEntity>;
    deleteColor(id: string): Promise<void>;
}