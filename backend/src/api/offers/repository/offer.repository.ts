import { Injectable } from '@nestjs/common';
import { OfferRepositoryInterface } from '../interface/offer.repository.interface';
import { NewOfferEntity, OfferEntity, OfferQueryEntityType, OfferQuerySelect, UpdateOfferEntity } from '../entity/offer.entity';
import { DatabaseService } from 'src/database/database.service';
import { offer } from 'src/database/schema/offer.schema';
import { desc, count, eq, like, or, and, inArray } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { offer_product } from 'src/database/schema';

@Injectable()
export class IOfferRepository implements OfferRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  private mapOfferQuery(offer: any): OfferQueryEntityType {
    return {
      ...offer,
    };
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OfferQueryEntityType | null> {
    const result = await this.databaseClient.db.query.offer.findFirst({
      where: eq(offer.id, id),
      ...OfferQuerySelect(),
    });
    if (!result) return null;
    return this.mapOfferQuery(result);
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<OfferQueryEntityType[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.query.offer.findMany({
      where: search ? or(like(offer.title, `%${search}%`), like(offer.description, `%${search}%`)) : undefined,
      limit,
      offset,
      orderBy: desc(offer.createdAt),
      ...OfferQuerySelect(),
    });
    return result.map(this.mapOfferQuery);
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(offer.id) }).from(offer).where(search ? or(like(offer.title, `%${search}%`), like(offer.description, `%${search}%`)) : undefined).$withCache(cacheConfig);
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
  async deleteOffer(id: string): Promise<void> {
    await this.databaseClient.db.delete(offer).where(eq(offer.id, id));
  }
}
