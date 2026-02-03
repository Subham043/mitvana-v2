import { NewSettingEntity, SettingEntity } from "../entity/setting.entity";

export interface SettingServiceInterface {
    get(): Promise<SettingEntity>;
    set(setting: NewSettingEntity): Promise<SettingEntity>;
}