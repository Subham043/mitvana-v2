import { NewTagEntity, UpdateTagEntity, TagEntity } from "../entity/tag.entity";

export interface TagRepositoryInterface {
    getByName(name: string): Promise<TagEntity | null>;
    getById(id: string): Promise<TagEntity | null>;
    getAll(): Promise<TagEntity[]>;
    createTag(tag: NewTagEntity): Promise<TagEntity | null>;
    updateTag(id: string, tag: UpdateTagEntity): Promise<TagEntity | null>;
    deleteTag(id: string): Promise<void>;
}