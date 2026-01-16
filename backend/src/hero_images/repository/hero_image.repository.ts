import { Injectable } from '@nestjs/common';
import { HeroImageRepositoryInterface } from '../interface/hero_image.repository.interface';
import { NewHeroImageEntity, HeroImageEntity, UpdateHeroImageEntity } from '../entity/hero_image.entity';
import { DatabaseService } from 'src/database/database.service';
import { hero_image } from 'src/database/schema/hero_image.schema';
import { asc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class HeroImageRepository implements HeroImageRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getById(id: string): Promise<HeroImageEntity | null> {
    const result = await this.databaseClient.db.select().from(hero_image).where(eq(hero_image.id, id)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery): Promise<HeroImageEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(hero_image).where(search ? like(hero_image.content, `%${search}%`) : undefined).orderBy(asc(hero_image.id)).limit(limit).offset(offset);
    return result;
  }

  async count(search?: string): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(hero_image.id) }).from(hero_image).where(search ? like(hero_image.content, `%${search}%`) : undefined);
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
