import { NewTagEntity, TagEntity, UpdateTagEntity } from "../entity/tag.entity";

export interface TagServiceInterface {
    getByName(name: string): Promise<TagEntity>;
    getById(id: string): Promise<TagEntity>;
    getAll(): Promise<TagEntity[]>;
    createTag(tag: NewTagEntity): Promise<TagEntity>;
    updateTag(id: string, tag: UpdateTagEntity): Promise<TagEntity>;
    deleteTag(id: string): Promise<void>;
}