import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { TagDto, tagDtoValidator } from '../schema/tag.schema';
import { TagServiceInterface } from '../interface/tag.service.interface';
import { TAG_SERVICE } from '../tag.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';

@Controller({
  version: '1',
  path: 'tag',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class TagController {
  constructor(@Inject(TAG_SERVICE) private readonly tagService: TagServiceInterface) { }

  @Post('/')
  async createTag(@Body(new VineValidationPipe(tagDtoValidator)) tagDto: TagDto) {
    return await this.tagService.createTag(tagDto);
  }

  @Put('/:id')
  async updateTag(@Body(new VineValidationPipe(tagDtoValidator)) tagDto: TagDto, @Param('id') id: string) {
    return await this.tagService.updateTag(id, tagDto);
  }

  @Delete('/:id')
  async deleteTag(@Param('id') id: string) {
    return await this.tagService.deleteTag(id);
  }

  @Get('/:id')
  @Public()
  async getTag(@Param('id') id: string) {
    return await this.tagService.getById(id);
  }

  @Get('/')
  @Public()
  async getAllTags(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.tagService.getAll(query);
  }
}
