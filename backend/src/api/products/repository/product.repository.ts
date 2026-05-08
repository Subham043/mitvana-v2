import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../interface/product.repository.interface';
import {
  NewProductEntity,
  ProductQueryEntityType,
  UpdateProductEntity,
  ProductListEntity,
  PublicProductListEntity,
} from '../entity/product.entity';
import { DatabaseService } from 'src/database/database.service';
import {
  product,
  product_category,
  product_color,
  product_faq,
  product_image,
  product_ingredient,
  product_tag,
  related_product,
} from 'src/database/schema';
import {
  and,
  asc,
  count,
  countDistinct,
  desc,
  eq,
  gte,
  inArray,
  isNull,
  like,
  lte,
  or,
  SQL,
  sql,
} from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { ProductUpdateStatusDto } from '../schema/product-update-status.schema';
import { alias } from 'drizzle-orm/mysql-core';
import { ProductFilterDto } from '../schema/product-filter.schema';
import { AppConfigType } from 'src/config/schema';
import { PublicProductPaginatedSelect } from '../entity/public-product-paginated.entity';
import { ProductPaginatedSelect } from '../entity/product-paginated.entity';
import { ProductInfoSelect } from '../entity/product-info.entity';
import { PublicProductInfoSelect } from '../entity/public-product-info.entity';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService<AppConfigType>,
  ) { }
  private getPublicProductPaginatedQuery(userId?: string) {
    return this.databaseClient.db
      .select(
        PublicProductPaginatedSelect(
          `${this.configService.get('APP_URL')}/uploads/`,
          userId
        ),
      )
      .from(product);
  }

  private getPublicProductPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(product.id) })
      .from(product);
  }

  private getProductPaginatedQuery() {
    return this.databaseClient.db
      .select(
        ProductPaginatedSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(product);
  }

  private getProductPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(product.id) })
      .from(product);
  }

  private getProductInfoQuery() {
    const p2 = alias(product, 'p2') as unknown as typeof product;
    return this.databaseClient.db
      .select(
        ProductInfoSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(product)
      .leftJoin(p2, eq(product.product_selected, p2.id))
      .limit(1);
  }

  private getPublicProductInfoQuery(userId?: string) {
    const p2 = alias(product, 'p2') as unknown as typeof product;
    return this.databaseClient.db
      .select(
        PublicProductInfoSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
          userId,
        ),
      )
      .from(product)
      .leftJoin(p2, eq(product.product_selected, p2.id))
      .limit(1);
  }

  async getByTitle(title: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductQueryEntityType | null> {
    const result = await this.getProductInfoQuery().where(
      eq(product.title, title),
    )
      .$withCache(cacheConfig) as unknown as ProductQueryEntityType[];
    if (!result.length) return null;
    return result[0];
  }

  async getBySlug(slug: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductQueryEntityType | null> {
    const result = await this.getProductInfoQuery().where(
      eq(product.slug, slug),
    )
      .$withCache(cacheConfig) as unknown as ProductQueryEntityType[];
    if (!result.length) return null;
    return result[0];
  }

  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductQueryEntityType | null> {
    const result = await this.getProductInfoQuery().where(
      eq(product.id, id),
    )
      .$withCache(cacheConfig) as unknown as ProductQueryEntityType[];
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = "", is_draft?: boolean, category_slug?: string, tag?: string, min_price?: number, max_price?: number): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(product.title, `%${search}%`));
      searchFilters.push(like(product.slug, `%${search}%`));
      searchFilters.push(like(product.name, `%${search}%`));
      searchFilters.push(like(product.sub_title, `%${search}%`));
      searchFilters.push(like(product.hsn, `%${search}%`));
      searchFilters.push(like(product.sku, `%${search}%`));
      searchFilters.push(like(product.discounted_price, `%${search}%`));
      searchFilters.push(like(product.price, `%${search}%`));
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM product_category pc
          JOIN category c ON pc.category_id = c.id
          WHERE pc.product_id = ${product.id}
            AND (
              c.name LIKE ${`%${search}%`}
              OR c.slug LIKE ${`%${search}%`}
            )
        )
      `)
    }
    if (is_draft !== undefined) {
      filters.push(eq(product.is_draft, is_draft));
    }
    if (category_slug !== undefined) {
      filters.push(sql`
        EXISTS (
          SELECT 1
          FROM product_category pc
          JOIN category c ON pc.category_id = c.id
          WHERE pc.product_id = ${product.id}
          AND c.slug = ${category_slug}
        )
      `);
    }
    if (tag !== undefined) {
      filters.push(sql`
        EXISTS (
          SELECT 1
          FROM product_tag pt
          JOIN tag t ON pt.tag_id = t.id
          WHERE pt.product_id = ${product.id}
          AND t.name = ${tag}
        )
      `);
    }
    if (min_price !== undefined) {
      filters.push(
        gte(
          sql`COALESCE(${product.discounted_price}, ${product.price})`,
          min_price
        )
      );
    }
    if (max_price !== undefined) {
      filters.push(
        lte(
          sql`COALESCE(${product.discounted_price}, ${product.price})`,
          max_price
        )
      );
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  private getOrderBy(sort_by?: string, sort_order?: string) {
    if (sort_by) {
      if (sort_by === "price") {
        return sort_order === "desc"
          ? desc(sql`COALESCE(${product.discounted_price}, ${product.price})`)
          : asc(sql`COALESCE(${product.discounted_price}, ${product.price})`);
      } else {
        return sort_order === "desc"
          ? desc(product[sort_by])
          : asc(product[sort_by]);
      }
    } else {
      return desc(product.createdAt);
    }
  }

  async getAll(
    query: PaginationQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductListEntity[]> {
    const { limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    let result = await this.getProductPaginatedQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .orderBy(this.getOrderBy(sort_by, sort_order))
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    query: CountQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, is_draft, category_slug, tag, min_price, max_price } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    const result = await this.getProductPaginatedCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getAllPublished(
    query: PaginationQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductListEntity[]> {
    const { limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    const result = await this.getProductPaginatedQuery()
      .where(
        search || category_slug || tag || min_price || max_price
          ? and(
            eq(product.is_draft, false),
            filters
          )
          : eq(product.is_draft, false),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(this.getOrderBy(sort_by, sort_order))
      .$withCache(cacheConfig);
    return result as unknown as ProductListEntity[];
  }

  async countPublished(
    query: CountQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, is_draft, category_slug, tag, min_price, max_price } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    const result = await this.getProductPaginatedCountQuery()
      .where(
        search || category_slug || tag || min_price || max_price
          ? and(
            eq(product.is_draft, false),
            filters,
          )
          : eq(product.is_draft, false),
      )
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getAllPublishedForPublic(
    query: PaginationQuery<ProductFilterDto>,
    userId?: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<PublicProductListEntity[]> {
    const { limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    const result = await this.getPublicProductPaginatedQuery(userId)
      .where(
        search || category_slug || tag || min_price || max_price
          ? and(
            eq(product.is_draft, false),
            isNull(product.product_selected),
            filters
          )
          : and(
            eq(product.is_draft, false),
            isNull(product.product_selected),
          ),
      )
      .limit(limit)
      .offset(offset)
      .orderBy(this.getOrderBy(sort_by, sort_order))
      .$withCache(cacheConfig);
    return result as unknown as PublicProductListEntity[];
  }

  async countPublishedForPublic(
    query: CountQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, is_draft, category_slug, tag, min_price, max_price } = query;
    const filters = await this.filters(search, is_draft, category_slug, tag, min_price, max_price);
    const result = await this.getPublicProductPaginatedCountQuery()
      .where(
        search || category_slug || tag || min_price || max_price
          ? and(
            eq(product.is_draft, false),
            isNull(product.product_selected),
            filters,
          )
          : and(
            eq(product.is_draft, false),
            isNull(product.product_selected),
          ),
      )
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getBySlugForPublic(
    slug: string,
    userId?: string,
    cacheConfig: CustomQueryCacheConfig = false
  ): Promise<ProductQueryEntityType | null> {
    const result = await this.getPublicProductInfoQuery(userId).where(
      and(
        eq(product.slug, slug),
        eq(product.is_draft, false),
      ),
    )
      .$withCache(cacheConfig) as unknown as ProductQueryEntityType[];
    if (!result.length) return null;
    return result[0];
  }

  async createProduct(
    data: NewProductEntity,
  ): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.transaction(async (tx) => {
      const {
        related_products,
        tags,
        colors,
        ingredients,
        categories,
        faqs,
        images,
        ...rest
      } = data;
      const [result] = await tx.insert(product).values(rest).$returningId();
      if (
        related_products &&
        Array.isArray(related_products) &&
        related_products.length > 0
      ) {
        await tx.insert(related_product).values(
          related_products.map((relatedProductId) => ({
            product_id: result.id,
            related_product_id: relatedProductId,
          })),
        );
      }
      if (tags && Array.isArray(tags) && tags.length > 0) {
        await tx.insert(product_tag).values(
          tags.map((tagId) => ({
            product_id: result.id,
            tag_id: tagId,
          })),
        );
      }
      if (colors && Array.isArray(colors) && colors.length > 0) {
        await tx.insert(product_color).values(
          colors.map((colorId) => ({
            product_id: result.id,
            color_id: colorId,
          })),
        );
      }
      if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
        await tx.insert(product_ingredient).values(
          ingredients.map((ingredientId) => ({
            product_id: result.id,
            ingredient_id: ingredientId,
          })),
        );
      }
      if (categories && Array.isArray(categories) && categories.length > 0) {
        await tx.insert(product_category).values(
          categories.map((categoryId) => ({
            product_id: result.id,
            category_id: categoryId,
          })),
        );
      }
      if (faqs && Array.isArray(faqs) && faqs.length > 0) {
        await tx.insert(product_faq).values(
          faqs.map((faq) => ({
            product_id: result.id,
            question: faq.question,
            answer: faq.answer,
          })),
        );
      }
      if (images && Array.isArray(images) && images.length > 0) {
        await tx.insert(product_image).values(
          images.map((image) => ({
            product_id: result.id,
            image: image,
          })),
        );
      }
      return result;
    });
    return await this.getById(result.id);
  }
  async updateProduct(
    id: string,
    data: UpdateProductEntity,
  ): Promise<ProductQueryEntityType | null> {
    await this.databaseClient.db.transaction(async (tx) => {
      const {
        add_related_products,
        remove_related_products,
        add_tags,
        update_faqs,
        remove_tags,
        add_colors,
        remove_colors,
        add_ingredients,
        remove_ingredients,
        add_categories,
        remove_categories,
        add_faqs,
        remove_faqs,
        images,
        ...rest
      } = data;
      await tx.update(product).set(rest).where(eq(product.id, id));
      if (
        add_related_products &&
        Array.isArray(add_related_products) &&
        add_related_products.length > 0
      ) {
        await tx.insert(related_product).values(
          add_related_products.map((relatedProductId) => ({
            product_id: id,
            related_product_id: relatedProductId,
          })),
        );
      }
      if (
        remove_related_products &&
        Array.isArray(remove_related_products) &&
        remove_related_products.length > 0
      ) {
        await tx
          .delete(related_product)
          .where(
            and(
              eq(related_product.product_id, id),
              inArray(
                related_product.related_product_id,
                remove_related_products,
              ),
            ),
          );
      }
      if (add_tags && Array.isArray(add_tags) && add_tags.length > 0) {
        await tx.insert(product_tag).values(
          add_tags.map((tagId) => ({
            product_id: id,
            tag_id: tagId,
          })),
        );
      }
      if (remove_tags && Array.isArray(remove_tags) && remove_tags.length > 0) {
        await tx
          .delete(product_tag)
          .where(
            and(
              eq(product_tag.product_id, id),
              inArray(product_tag.tag_id, remove_tags),
            ),
          );
      }
      if (add_colors && Array.isArray(add_colors) && add_colors.length > 0) {
        await tx.insert(product_color).values(
          add_colors.map((colorId) => ({
            product_id: id,
            color_id: colorId,
          })),
        );
      }
      if (
        remove_colors &&
        Array.isArray(remove_colors) &&
        remove_colors.length > 0
      ) {
        await tx
          .delete(product_color)
          .where(
            and(
              eq(product_color.product_id, id),
              inArray(product_color.color_id, remove_colors),
            ),
          );
      }
      if (
        add_ingredients &&
        Array.isArray(add_ingredients) &&
        add_ingredients.length > 0
      ) {
        await tx.insert(product_ingredient).values(
          add_ingredients.map((ingredientId) => ({
            product_id: id,
            ingredient_id: ingredientId,
          })),
        );
      }
      if (
        remove_ingredients &&
        Array.isArray(remove_ingredients) &&
        remove_ingredients.length > 0
      ) {
        await tx
          .delete(product_ingredient)
          .where(
            and(
              eq(product_ingredient.product_id, id),
              inArray(product_ingredient.ingredient_id, remove_ingredients),
            ),
          );
      }
      if (
        add_categories &&
        Array.isArray(add_categories) &&
        add_categories.length > 0
      ) {
        await tx.insert(product_category).values(
          add_categories.map((categoryId) => ({
            product_id: id,
            category_id: categoryId,
          })),
        );
      }
      if (
        remove_categories &&
        Array.isArray(remove_categories) &&
        remove_categories.length > 0
      ) {
        await tx
          .delete(product_category)
          .where(
            and(
              eq(product_category.product_id, id),
              inArray(product_category.category_id, remove_categories),
            ),
          );
      }
      if (add_faqs && Array.isArray(add_faqs) && add_faqs.length > 0) {
        await tx.insert(product_faq).values(
          add_faqs.map((faq) => ({
            product_id: id,
            question: faq.question,
            answer: faq.answer,
          })),
        );
      }
      if (remove_faqs && Array.isArray(remove_faqs) && remove_faqs.length > 0) {
        await tx
          .delete(product_faq)
          .where(
            and(
              eq(product_faq.product_id, id),
              inArray(product_faq.id, remove_faqs),
            ),
          );
      }
      if (update_faqs && Array.isArray(update_faqs) && update_faqs.length > 0) {
        await Promise.all(
          update_faqs.map((faq) =>
            tx
              .update(product_faq)
              .set({
                question: faq.question,
                answer: faq.answer,
              })
              .where(
                and(eq(product_faq.id, faq.id), eq(product_faq.product_id, id)),
              ),
          ),
        );
      }
      if (images && Array.isArray(images) && images.length > 0) {
        await tx.insert(product_image).values(
          images.map((image) => ({
            product_id: id,
            image: image,
          })),
        );
      }
    });
    return await this.getById(id);
  }
  async updateProductStatus(
    id: string,
    data: ProductUpdateStatusDto & { published_at: Date | null },
  ): Promise<ProductQueryEntityType | null> {
    await this.databaseClient.db
      .update(product)
      .set({
        is_draft: data.is_draft ? data.is_draft.toString() === 'true' : false,
        published_at: data.published_at
      })
      .where(eq(product.id, id));
    return await this.getById(id);
  }
  async deleteProduct(id: string): Promise<void> {
    await this.databaseClient.db.delete(product).where(eq(product.id, id));
  }
  async deleteProductImage(id: string, imageId: string): Promise<void> {
    await this.databaseClient.db
      .delete(product_image)
      .where(
        and(eq(product_image.product_id, id), eq(product_image.id, imageId)),
      );
  }
  async checkIdExists(
    id: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<boolean> {
    const result = await this.databaseClient.db
      .select({ count: count(product.id) })
      .from(product)
      .where(eq(product.id, id))
      .$withCache(cacheConfig);
    return result[0].count > 0;
  }
  async checkIdsExists(
    ids: string[],
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<{ id: string; exists: boolean }[]> {
    const result = await this.databaseClient.db
      .select({ id: product.id })
      .from(product)
      .where(inArray(product.id, ids))
      .$withCache(cacheConfig);
    return ids.map((id) => ({
      id,
      exists: result.some((item) => item.id === id),
    }));
  }
  async checkFaqsIdsExists(
    ids: string[],
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<{ id: string; exists: boolean }[]> {
    const result = await this.databaseClient.db
      .select({ id: product_faq.id })
      .from(product_faq)
      .where(inArray(product_faq.id, ids))
      .$withCache(cacheConfig);
    return ids.map((id) => ({
      id,
      exists: result.some((item) => item.id === id),
    }));
  }

  async checkIdsStockExists(
    items: { id: string; quantity: number }[],
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<{ id: string; in_stock: boolean }[]> {

    const ids = items.map(item => item.id);

    const result = await this.databaseClient.db
      .select({ id: product.id, stock: product.stock })
      .from(product)
      .where(inArray(product.id, ids))
      .$withCache(cacheConfig);

    // convert to map for O(1) lookup
    const productMap = new Map(result.map(p => [p.id, p.stock]));

    return items.map(({ id, quantity }) => {
      const stock = productMap.get(id);

      return {
        id,
        in_stock: stock !== undefined && stock !== null && stock > 0 && stock >= quantity,
      };
    });
  }

  async bulkDeductProductStock(data: { id: string, quantity: number }[]): Promise<void> {
    if (!data.length) return;
    const ids = data.map((d) => d.id);
    const cases = data.map((d) =>
      sql`WHEN ${product.id} = ${d.id} THEN ${product.stock} - ${d.quantity}`
    );
    const query = sql`
      UPDATE ${product}
      SET stock = CASE
        ${sql.join(cases, sql.raw(" "))}
      END
      WHERE ${product.id} IN (${sql.join(ids, sql.raw(","))})
    `;
    await this.databaseClient.db.execute(query);
  }
}
