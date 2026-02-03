import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { NewTagEntity, TagEntity, UpdateTagEntity } from "../entity/tag.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";

export interface TagServiceInterface {
    getByName(name: string): Promise<TagEntity>;
    getById(id: string): Promise<TagEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<TagEntity>>;
    createTag(tag: NewTagEntity): Promise<TagEntity>;
    updateTag(id: string, tag: UpdateTagEntity): Promise<TagEntity>;
    deleteTag(id: string): Promise<void>;
}