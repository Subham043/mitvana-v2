import { Module } from '@nestjs/common';
import { IngredientController } from './controller/ingredient.controller';
import { INGREDIENT_REPOSITORY, INGREDIENT_SERVICE } from './ingredient.constants';
import { IngredientService } from './service/ingredient.service';
import { IngredientRepository } from './repository/ingredient.repository';

@Module({
  imports: [],
  controllers: [IngredientController],
  providers: [
    {
      provide: INGREDIENT_SERVICE,
      useClass: IngredientService,
    },
    {
      provide: INGREDIENT_REPOSITORY,
      useClass: IngredientRepository,
    },
  ],
})
export class IngredientModule { }
