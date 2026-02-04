import { Injectable } from '@nestjs/common';
import { HeroImageRepositoryInterface } from '../interface/hero_image.repository.interface';
import { NewHeroImageEntity, HeroImageEntity, UpdateHeroImageEntity, HeroImageSelect } from '../entity/hero_image.entity';
import { DatabaseService } from 'src/database/database.service';
import { hero_image } from 'src/database/schema/hero_image.schema';
import { desc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HeroImageRepository implements HeroImageRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  getHeroImageWithImageSelect() {
    return HeroImageSelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<HeroImageEntity | null> {
    const result = await this.databaseClient.db.select(this.getHeroImageWithImageSelect()).from(hero_image).where(eq(hero_image.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<HeroImageEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(this.getHeroImageWithImageSelect()).from(hero_image).where(search ? like(hero_image.content, `%${search}%`) : undefined).orderBy(desc(hero_image.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(hero_image.id) }).from(hero_image).where(search ? like(hero_image.content, `%${search}%`) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }
  async createHeroImage(data: NewHeroImageEntity): Promise<HeroImageEntity | null> {
    const result = await this.databaseClient.db.insert(hero_image).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateHeroImage(id: string, data: UpdateHeroImageEntity): Promise<HeroImageEntity | null> {
    await this.databaseClient.db.update(hero_image).set(data).where(eq(hero_image.id, id));
    return await this.getById(id);
  }
  async deleteHeroImage(id: string): Promise<void> {
    await this.databaseClient.db.delete(hero_image).where(eq(hero_image.id, id));
  }
}
