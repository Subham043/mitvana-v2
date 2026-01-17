import { Injectable } from '@nestjs/common';
import { SettingRepositoryInterface } from '../interface/setting.repository.interface';
import { NewSettingEntity, SettingEntity } from '../entity/setting.entity';
import { DatabaseService } from 'src/database/database.service';
import { setting } from 'src/database/schema/setting.schema';
import { eq } from 'drizzle-orm';
import { SettingDto } from '../schema/setting.schema';
import { CustomQueryCacheConfig } from "src/utils/types";

@Injectable()
export class ISettingRepository implements SettingRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<SettingEntity | null> {
    const result = await this.databaseClient.db.select().from(setting).where(eq(setting.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(cacheConfig: CustomQueryCacheConfig = false): Promise<SettingEntity[]> {
    const result = await this.databaseClient.db.select().from(setting).$withCache(cacheConfig);
    return result;
  }

  async createSetting(data: NewSettingEntity): Promise<SettingEntity | null> {
    const result = await this.databaseClient.db.insert(setting).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateSetting(id: string, data: SettingDto): Promise<SettingEntity | null> {
    await this.databaseClient.db.update(setting).set(data).where(eq(setting.id, id));
    return await this.getById(id);
  }
}
