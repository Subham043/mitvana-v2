import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SettingServiceInterface } from '../interface/setting.service.interface';
import { SettingRepositoryInterface } from '../interface/setting.repository.interface';
import { SETTING_REPOSITORY, SETTINGS_CACHE_KEY } from '../setting.constants';
import { SettingEntity } from '../entity/setting.entity';
import { SettingDto } from '../schema/setting.schema';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class ISettingService implements SettingServiceInterface {

  constructor(
    @Inject(SETTING_REPOSITORY) private readonly settingRepository: SettingRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async get(): Promise<SettingEntity> {
    const cacheKey = `${SETTINGS_CACHE_KEY}:get`;
    const cachedSettings = await this.cacheService.get<SettingEntity>(cacheKey);

    if (cachedSettings) {
      return cachedSettings;
    }

    const setting = await this.settingRepository.getAll({ autoInvalidate: true });

    if (setting.length === 0) {
      const data = {
        id: '',
        admin_email: '',
        top_banner_text: '',
        min_cart_value_for_free_shipping: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.cacheService.set(cacheKey, data, [SETTINGS_CACHE_KEY, cacheKey]);

      return data;
    }

    await this.cacheService.set(cacheKey, setting[0], [SETTINGS_CACHE_KEY, cacheKey]);

    return setting[0];
  }

  async set(data: SettingDto): Promise<SettingEntity> {
    const setting = await this.settingRepository.getAll();

    const settingData: SettingDto = {
      admin_email: data.admin_email,
      top_banner_text: data.top_banner_text,
      min_cart_value_for_free_shipping: data.min_cart_value_for_free_shipping ?? 500,
    }

    if (setting.length === 0) {
      const newSetting = await this.settingRepository.createSetting(settingData);

      if (!newSetting) throw new InternalServerErrorException('Failed to save setting');

      await this.cacheService.invalidateTag(SETTINGS_CACHE_KEY);

      return newSetting;
    }

    const updatedSetting = await this.settingRepository.updateSetting(setting[0].id, settingData);

    if (!updatedSetting) throw new InternalServerErrorException('Failed to save setting');

    await this.cacheService.invalidateTag(SETTINGS_CACHE_KEY);

    return updatedSetting;
  }
}
