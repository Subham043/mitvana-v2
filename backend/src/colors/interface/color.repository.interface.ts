import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewColorEntity, UpdateColorEntity, ColorEntity } from "../entity/color.entity";

export interface ColorRepositoryInterface {
    getById(id: string): Promise<ColorEntity | null>;
    getAll(query: PaginationQuery): Promise<ColorEntity[]>;
    count(search?: string): Promise<number>
    createColor(color: NewColorEntity): Promise<ColorEntity | null>;
    updateColor(id: string, color: UpdateColorEntity): Promise<ColorEntity | null>;
    deleteColor(id: string): Promise<void>;
}