import { Module } from '@nestjs/common';
import { SettingController } from './controller/setting.controller';
import { SETTING_REPOSITORY, SETTING_SERVICE } from './setting.constants';
import { ISettingService } from './service/setting.service';
import { ISettingRepository } from './repository/setting.repository';

@Module({
  imports: [],
  controllers: [SettingController],
  providers: [
    {
      provide: SETTING_SERVICE,
      useClass: ISettingService,
    },
    {
      provide: SETTING_REPOSITORY,
      useClass: ISettingRepository,
    },
  ],
})
export class SettingModule { }
