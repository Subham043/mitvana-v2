import { Module } from '@nestjs/common';
import { ColorController } from './controller/color.controller';
import { COLOR_REPOSITORY, COLOR_SERVICE } from './color.constants';
import { IColorService } from './service/color.service';
import { IColorRepository } from './repository/color.repository';

@Module({
  imports: [],
  controllers: [ColorController],
  providers: [
    {
      provide: COLOR_SERVICE,
      useClass: IColorService,
    },
    {
      provide: COLOR_REPOSITORY,
      useClass: IColorRepository,
    },
  ],
})
export class ColorModule { }
