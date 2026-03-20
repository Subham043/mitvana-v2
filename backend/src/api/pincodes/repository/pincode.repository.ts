import { Injectable } from '@nestjs/common';
import { PincodeRepositoryInterface } from '../interface/pincode.repository.interface';
import { NewPincodeEntity, PincodeEntity, UpdatePincodeEntity } from '../entity/pincode.entity';
import { DatabaseService } from 'src/database/database.service';
import { pincode } from 'src/database/schema';
import { desc, count, eq, like, SQL, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';

@Injectable()
export class IPincodeRepository implements PincodeRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByPincode(code: number, cacheConfig: CustomQueryCacheConfig = false): Promise<PincodeEntity | null> {
    const result = await this.databaseClient.db.select().from(pincode).where(eq(pincode.pincode, code)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<PincodeEntity | null> {
    const result = await this.databaseClient.db.select().from(pincode).where(eq(pincode.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async checkPincode(code: number, cacheConfig: CustomQueryCacheConfig = false): Promise<{ pincode: number; is_delivery_available: boolean; }> {
    const result = await this.databaseClient.db.select().from(pincode).where(eq(pincode.pincode, code)).limit(1).$withCache(cacheConfig);
    if (!result.length) return {
      pincode: code,
      is_delivery_available: false,
    };
    return {
      pincode: result[0].pincode,
      is_delivery_available: result[0].is_delivery_available,
    };
  }
  private async filters(search: string = ""): Promise<SQL<unknown> | undefined> {
    const filters: SQL[] = [];
    if (search.length > 0) {
      filters.push(like(pincode.pincode, `%${search}%`));
      filters.push(like(pincode.shipping_charges, `%${search}%`));
    }
    return filters.length > 0 ? or(...filters) : undefined;
  }

  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<PincodeEntity[]> {
    const { limit, offset, search } = query;
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select().from(pincode).where(filters).orderBy(desc(pincode.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select({ count: count(pincode.id) }).from(pincode).where(filters).$withCache(cacheConfig);
    return result[0].count;
  }
  async createPincode(data: NewPincodeEntity): Promise<PincodeEntity | null> {
    const result = await this.databaseClient.db.insert(pincode).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updatePincode(id: string, data: UpdatePincodeEntity): Promise<PincodeEntity | null> {
    await this.databaseClient.db.update(pincode).set(data).where(eq(pincode.id, id));
    return await this.getById(id);
  }
  async deletePincode(id: string): Promise<void> {
    await this.databaseClient.db.delete(pincode).where(eq(pincode.id, id));
  }
}
