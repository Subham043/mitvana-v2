import { NewSettingEntity, SettingEntity } from "../entity/setting.entity";
import { SettingDto } from "../schema/setting.schema";

export interface SettingRepositoryInterface {
    getById(id: string): Promise<SettingEntity | null>;
    getAll(): Promise<SettingEntity[]>;
    createSetting(setting: NewSettingEntity): Promise<SettingEntity | null>;
    updateSetting(id: string, setting: SettingDto): Promise<SettingEntity | null>;
}