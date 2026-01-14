import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewTagEntity, UpdateTagEntity, TagEntity } from "../entity/tag.entity";

export interface TagRepositoryInterface {
    getByName(name: string): Promise<TagEntity | null>;
    getById(id: string): Promise<TagEntity | null>;
    getAll(query: PaginationQuery): Promise<TagEntity[]>;
    count(search?: string): Promise<number>
    createTag(tag: NewTagEntity): Promise<TagEntity | null>;
    updateTag(id: string, tag: UpdateTagEntity): Promise<TagEntity | null>;
    deleteTag(id: string): Promise<void>;
}