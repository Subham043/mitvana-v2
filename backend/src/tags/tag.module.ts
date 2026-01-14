import { Module } from '@nestjs/common';
import { TagController } from './controller/tag.controller';
import { TAG_REPOSITORY, TAG_SERVICE } from './tag.constants';
import { ITagService } from './service/tag.service';
import { ITagRepository } from './repository/tag.repository';

@Module({
  imports: [],
  controllers: [TagController],
  providers: [
    {
      provide: TAG_SERVICE,
      useClass: ITagService,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: ITagRepository,
    },
  ],
})
export class TagModule { }
