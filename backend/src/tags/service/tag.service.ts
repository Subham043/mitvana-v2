import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TagServiceInterface } from '../interface/tag.service.interface';
import { TagRepositoryInterface } from '../interface/tag.repository.interface';
import { TAG_REPOSITORY } from '../tag.constants';
import { TagEntity } from '../entity/tag.entity';
import { TagDto } from '../schema/tag.schema';
import { UniqueFieldException } from 'src/utils/validator/exception/unique.exception';

@Injectable()
export class ITagService implements TagServiceInterface {

  constructor(
    @Inject(TAG_REPOSITORY) private readonly tagRepository: TagRepositoryInterface,
  ) { }

  async getByName(name: string): Promise<TagEntity> {
    const tag = await this.tagRepository.getByName(name);

    if (!tag) throw new NotFoundException("Tag not found");

    return tag;
  }

  async getById(id: string): Promise<TagEntity> {
    const tag = await this.tagRepository.getById(id);

    if (!tag) throw new NotFoundException("Tag not found");

    return tag;
  }

  async getAll(): Promise<TagEntity[]> {
    const tags = await this.tagRepository.getAll();

    if (!tags) throw new NotFoundException("Tags not found");

    return tags;
  }

  async createTag(tag: TagDto): Promise<TagEntity> {
    const tagByName = await this.tagRepository.getByName(tag.name);

    if (tagByName) throw new UniqueFieldException("The tag name is already taken", "name");

    const newTag = await this.tagRepository.createTag(tag);

    if (!newTag) throw new InternalServerErrorException('Failed to create tag');

    return newTag;
  }

  async updateTag(id: string, tag: TagDto): Promise<TagEntity> {
    const tagById = await this.tagRepository.getById(id);

    if (!tagById) throw new NotFoundException("Tag not found");

    const tagByName = await this.tagRepository.getByName(tag.name);

    if (tagByName && tagByName.name !== tagById.name) throw new UniqueFieldException("The tag name is already taken", "name");

    const updatedTag = await this.tagRepository.updateTag(id, tag);

    if (!updatedTag) throw new InternalServerErrorException('Failed to update tag');

    return updatedTag;
  }

  async deleteTag(id: string): Promise<void> {
    const tagById = await this.tagRepository.getById(id);

    if (!tagById) throw new NotFoundException("Tag not found");

    await this.tagRepository.deleteTag(id);
  }
}
