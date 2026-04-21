import { Injectable } from '@nestjs/common';
import { PincodeRepositoryInterface } from '../interface/pincode.repository.interface';
import { NewPincodeEntity, PincodeEntity, UpdatePincodeEntity } from '../entity/pincode.entity';
import { DatabaseService } from 'src/database/database.service';
import { pincode } from 'src/database/schema';
import { desc, count, eq, like, SQL, or, and } from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { PincodeFilterDto } from '../schema/pincode-filter.schema';

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
  async checkPincode(code: number, cacheConfig: CustomQueryCacheConfig = false): Promise<{ pincode: number; is_delivery_available: boolean; shipping_charges: number; }> {
    const result = await this.databaseClient.db.select().from(pincode).where(eq(pincode.pincode, code)).limit(1).$withCache(cacheConfig);
    if (!result.length) return {
      pincode: code,
      is_delivery_available: false,
      shipping_charges: 0,
    };
    return {
      pincode: result[0].pincode,
      is_delivery_available: result[0].is_delivery_available,
      shipping_charges: result[0].shipping_charges,
    };
  }
  private async filters(search: string = "", is_igst_applicable?: boolean, is_delivery_available?: boolean): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(pincode.pincode, `%${search}%`));
      searchFilters.push(like(pincode.shipping_charges, `%${search}%`));
    }
    if (is_igst_applicable !== undefined) {
      filters.push(eq(pincode.is_igst_applicable, is_igst_applicable));
    }
    if (is_delivery_available !== undefined) {
      filters.push(eq(pincode.is_delivery_available, is_delivery_available));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(query: PaginationQuery<PincodeFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<PincodeEntity[]> {
    const { limit, offset, search, is_igst_applicable, is_delivery_available } = query;
    const filters = await this.filters(search, is_igst_applicable, is_delivery_available);
    const result = await this.databaseClient.db.select().from(pincode).where(filters).orderBy(desc(pincode.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(query: CountQuery<PincodeFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, is_igst_applicable, is_delivery_available } = query;
    const filters = await this.filters(search, is_igst_applicable, is_delivery_available);
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
