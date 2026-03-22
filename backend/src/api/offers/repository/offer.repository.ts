import { Injectable } from '@nestjs/common';
import { OfferRepositoryInterface } from '../interface/offer.repository.interface';
import { NewOfferEntity, OfferQueryEntityType, OfferSelect, UpdateOfferEntity } from '../entity/offer.entity';
import { DatabaseService } from 'src/database/database.service';
import { offer } from 'src/database/schema/offer.schema';
import { desc, eq, like, or, and, inArray, SQL, countDistinct } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { offer_product, product } from 'src/database/schema';
import { OfferUpdateStatusDto } from '../schema/offer-update-status.schema';
import { OfferFilterDto } from '../schema/offer-filter.schema';

@Injectable()
export class IOfferRepository implements OfferRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  private getOfferQuery() {
    return this.databaseClient.db
      .select(OfferSelect)
      .from(offer)
      .leftJoin(offer_product, eq(offer.id, offer_product.offer_id))
      .leftJoin(product, eq(offer_product.product_id, product.id))
      .groupBy(offer.id)
      .orderBy(desc(offer.createdAt))
  }

  private getOfferCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(offer.id) })
      .from(offer)
      .leftJoin(offer_product, eq(offer.id, offer_product.offer_id))
      .leftJoin(product, eq(offer_product.product_id, product.id))
  }

  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OfferQueryEntityType | null> {
    const result = await this.getOfferQuery()
      .where(eq(offer.id, id))
      .$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = "", is_draft?: boolean): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(offer.title, `%${search}%`));
      searchFilters.push(like(offer.description, `%${search}%`));
      searchFilters.push(like(product.title, `%${search}%`));
      searchFilters.push(like(product.slug, `%${search}%`));
    }
    if (is_draft !== undefined) {
      filters.push(eq(offer.is_draft, is_draft));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(query: PaginationQuery<OfferFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<OfferQueryEntityType[]> {
    const { limit, offset, search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getOfferQuery()
      .limit(limit)
      .offset(offset)
      .where(filters)
      .$withCache(cacheConfig);
    return result
  }

  async count(query: Omit<PaginationQuery<OfferFilterDto>, 'offset' | 'limit' | 'page'>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getOfferCountQuery().where(filters).$withCache(cacheConfig);
    return result[0].count;
  }

  async createOffer(data: NewOfferEntity): Promise<OfferQueryEntityType | null> {
    const result = await this.databaseClient.db.transaction(async (tx) => {
      const { products, ...rest } = data;
      const [result] = await tx.insert(offer).values(rest).$returningId();
      if (products && Array.isArray(products) && products.length > 0) {
        await tx.insert(offer_product).values(
          products.map((product_id) => ({
            offer_id: result.id,
            product_id: product_id,
          }))
        );
      }
      return result;
    });
    return await this.getById(result.id);
  }

  async updateOffer(id: string, data: UpdateOfferEntity): Promise<OfferQueryEntityType | null> {
    await this.databaseClient.db.transaction(async (tx) => {
      const { add_products, remove_products, ...rest } = data;
      await tx.update(offer).set(rest).where(eq(offer.id, id));
      if (add_products && Array.isArray(add_products) && add_products.length > 0) {
        await tx.insert(offer_product).values(
          add_products.map((product_id) => ({
            offer_id: id,
            product_id: product_id,
          }))
        );
      }
      if (remove_products && Array.isArray(remove_products) && remove_products.length > 0) {
        await tx.delete(offer_product).where(and(eq(offer_product.offer_id, id), inArray(offer_product.product_id, remove_products)));
      }
    });
    return await this.getById(id);
  }

  async updateOfferStatus(id: string, data: OfferUpdateStatusDto): Promise<OfferQueryEntityType | null> {
    await this.databaseClient.db.update(offer).set({ is_draft: data.is_draft ? data.is_draft.toString() === "true" : false }).where(eq(offer.id, id));
    return await this.getById(id);
  }

  async deleteOffer(id: string): Promise<void> {
    await this.databaseClient.db.delete(offer).where(eq(offer.id, id));
  }
}
