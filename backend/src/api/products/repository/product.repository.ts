import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../interface/product.repository.interface';
import { NewProductEntity, ProductQueryEntityType, UpdateProductEntity, ProductSelect, ProductListEntity, ProductListSelect } from '../entity/product.entity';
import { DatabaseService } from 'src/database/database.service';
import { product } from 'src/database/schema';
import { and, count, desc, eq, like, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  private getProductWithImageSelect() {
    return ProductSelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  private getProductListWithImageSelect() {
    return ProductListSelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  private mapProduct(product: any): ProductQueryEntityType {
    return {
      ...product,
    };
  }
  async getByTitle(title: string): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product.findFirst({
      where: eq(product.title, title),
      ...this.getProductWithImageSelect(),
    });
    if (!result) return null;
    return this.mapProduct(result);
  }
  async getBySlug(slug: string): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product.findFirst({
      where: eq(product.slug, slug),
      ...this.getProductWithImageSelect(),
    });
    if (!result) return null;
    return this.mapProduct(result);
  }
  async getById(id: string): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product.findFirst({
      where: eq(product.id, id),
      ...this.getProductWithImageSelect(),
    });
    if (!result) return null;
    return this.mapProduct(result);
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductListEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(this.getProductListWithImageSelect()).from(product).where(search ? or(like(product.title, `%${search}%`), like(product.slug, `%${search}%`), like(product.name, `%${search}%`), like(product.sub_title, `%${search}%`)) : undefined).limit(limit).offset(offset).orderBy(desc(product.createdAt)).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product.id) }).from(product).where(search ? or(like(product.title, `%${search}%`), like(product.slug, `%${search}%`), like(product.name, `%${search}%`), like(product.sub_title, `%${search}%`)) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }
  async getAllPublished(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductListEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(this.getProductListWithImageSelect()).from(product).where(search
      ? and(
        eq(product.is_draft, false),
        or(
          like(product.title, `%${search}%`),
          like(product.slug, `%${search}%`),
          like(product.name, `%${search}%`),
          like(product.sub_title, `%${search}%`)
        )
      )
      : eq(product.is_draft, false)).limit(limit).offset(offset).orderBy(desc(product.createdAt)).$withCache(cacheConfig);
    return result;
  }

  async countPublished(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product.id) }).from(product).where(search
      ? and(
        eq(product.is_draft, false),
        or(
          like(product.title, `%${search}%`),
          like(product.slug, `%${search}%`),
          like(product.name, `%${search}%`),
          like(product.sub_title, `%${search}%`)
        )
      )
      : eq(product.is_draft, false)).$withCache(cacheConfig);
    return result[0].count;
  }
  async createProduct(data: NewProductEntity): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.insert(product).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateProduct(id: string, data: UpdateProductEntity): Promise<ProductQueryEntityType | null> {
    await this.databaseClient.db.update(product).set(data).where(eq(product.id, id));
    return await this.getById(id);
  }
  async deleteProduct(id: string): Promise<void> {
    await this.databaseClient.db.delete(product).where(eq(product.id, id));
  }
  async checkIdExists(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<boolean> {
    const result = await this.databaseClient.db.select({ count: count(product.id) }).from(product).where(eq(product.id, id)).$withCache(cacheConfig);
    return result[0].count > 0;
  }
}
