import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards } from '@nestjs/common';
import { TagDto, tagDtoValidator } from '../schema/tag.schema';
import { TagServiceInterface } from '../interface/tag.service.interface';
import { TAG_SERVICE } from '../tag.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller({
  version: '1',
  path: 'tag',
})
@UseGuards(AccessTokenGuard)
@Role("ADMIN")
export class TagController {
  constructor(@Inject(TAG_SERVICE) private readonly tagService: TagServiceInterface) { }

  @Post('/')
  createTag(@Body(new VineValidationPipe(tagDtoValidator)) tagDto: TagDto) {
    return this.tagService.createTag(tagDto);
  }

  @Put('/:id')
  updateTag(@Body(new VineValidationPipe(tagDtoValidator)) tagDto: TagDto, @Param('id') id: string) {
    return this.tagService.updateTag(id, tagDto);
  }

  @Delete('/:id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.deleteTag(id);
  }

  @Get('/:id')
  @Public()
  getTag(@Param('id') id: string) {
    return this.tagService.getById(id);
  }

  @Get('/')
  @Public()
  getAllTags() {
    return this.tagService.getAll();
  }
}
