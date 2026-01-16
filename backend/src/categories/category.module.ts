import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CATEGORY_REPOSITORY, CATEGORY_SERVICE } from './category.constants';
import { CategoryService } from './service/category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    {
      provide: CATEGORY_SERVICE,
      useClass: CategoryService,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule { }
