import { NewSettingEntity, SettingEntity } from "../entity/setting.entity";
import { SettingDto } from "../schema/setting.schema";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface SettingRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<SettingEntity | null>;
    getAll(cacheConfig?: CustomQueryCacheConfig): Promise<SettingEntity[]>;
    createSetting(setting: NewSettingEntity): Promise<SettingEntity | null>;
    updateSetting(id: string, setting: SettingDto): Promise<SettingEntity | null>;
}