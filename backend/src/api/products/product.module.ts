import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { PRODUCT_REPOSITORY, PRODUCT_SERVICE } from './product.constants';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { COLOR_REPOSITORY } from '../colors/color.constants';
import { IColorRepository } from '../colors/repository/color.repository';
import { INGREDIENT_REPOSITORY } from '../ingredients/ingredient.constants';
import { IngredientRepository } from '../ingredients/repository/ingredient.repository';
import { TAG_REPOSITORY } from '../tags/tag.constants';
import { ITagRepository } from '../tags/repository/tag.repository';
import { CATEGORY_REPOSITORY } from '../categories/category.constants';
import { CategoryRepository } from '../categories/repository/category.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: COLOR_REPOSITORY,
      useClass: IColorRepository,
    },
    {
      provide: INGREDIENT_REPOSITORY,
      useClass: IngredientRepository,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: ITagRepository,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryRepository,
    },
  ],
})
export class ProductModule { }
