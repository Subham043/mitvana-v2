import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../interface/product.repository.interface';
import {
  NewProductEntity,
  ProductQueryEntityType,
  UpdateProductEntity,
  ProductListEntity,
  ProductPaginatedSelect,
  ProductInfoSelect,
} from '../entity/product.entity';
import { DatabaseService } from 'src/database/database.service';
import {
  category,
  product,
  product_category,
  product_color,
  product_faq,
  product_image,
  product_ingredient,
  product_review,
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
  inArray,
  isNull,
  like,
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

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService,
  ) { }
  private getProductPaginatedQuery() {
    return this.databaseClient.db
      .select(
        ProductPaginatedSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(product)
      .leftJoin(product_category, eq(product.id, product_category.product_id))
      .leftJoin(category, eq(product_category.category_id, category.id))
      .groupBy(product.id)
      .orderBy(desc(product.createdAt));
  }

  private getProductPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(product.id) })
      .from(product)
      .leftJoin(product_category, eq(product.id, product_category.product_id))
      .leftJoin(category, eq(product_category.category_id, category.id));
  }

  private getProductInfoQuery() {
    const p2 = alias(product, 'p2') as typeof product;
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

  private mapProductQuery(product: any): ProductQueryEntityType {
    return {
      ...product,
    };
  }

  private mapProductListQuery(product: any): ProductListEntity {
    return {
      ...product,
    };
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

  private async filters(search: string = "", is_draft?: boolean): Promise<SQL<unknown> | undefined> {
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
      searchFilters.push(like(category.name, `%${search}%`));
      searchFilters.push(like(category.slug, `%${search}%`));
    }
    if (is_draft !== undefined) {
      filters.push(eq(product.is_draft, is_draft));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(
    query: PaginationQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductListEntity[]> {
    const { limit, offset, search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getProductPaginatedQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    query: CountQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getProductPaginatedCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getAllPublished(
    query: PaginationQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductListEntity[]> {
    const { limit, offset, search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getProductPaginatedQuery()
      .where(
        search
          ? and(
            eq(product.is_draft, false),
            filters
          )
          : eq(product.is_draft, false),
      )
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async countPublished(
    query: CountQuery<ProductFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.getProductPaginatedCountQuery()
      .where(
        search
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
    query: PaginationQuery,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductListEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.query.product.findMany({
      where: search
        ? and(
          eq(product.is_draft, false),
          isNull(product.product_selected),
          or(
            like(product.title, `%${search}%`),
            like(product.slug, `%${search}%`),
            like(product.name, `%${search}%`),
            like(product.sub_title, `%${search}%`),
          ),
        )
        : and(eq(product.is_draft, false), isNull(product.product_selected)),
      limit,
      offset,
      orderBy: asc(product.title),
      columns: {
        id: true,
        title: true,
        sub_title: true,
        name: true,
        slug: true,
        hsn: true,
        sku: true,
        price: true,
        discounted_price: true,
        tax: true,
        stock: true,
        thumbnail: true,
        size_or_color: true,
        is_draft: true,
        createdAt: true,
        updatedAt: true,
      },
      extras: (fields, { sql }) => ({
        reviewsCount: sql<number>`(
          SELECT COUNT(*)
          FROM product_review pr
          WHERE pr.product_id = ${fields.id}
          AND pr.status = 'approved'
        )`.as('reviewsCount'),
        commentsCount: sql<number>`(
          SELECT COUNT(*)
          FROM product_review pr
          WHERE pr.product_id = ${fields.id}
          AND pr.comment IS NOT NULL
          AND pr.status = 'approved'
        )`.as('commentsCount'),
      }),
      with: {
        tags: {
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        product_images: {
          columns: {
            id: true,
            image: true,
          },
        },
      },
    });
    return result.map(this.mapProductListQuery);
  }

  async countPublishedForPublic(
    search?: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const result = await this.databaseClient.db
      .select({ count: count(product.id) })
      .from(product)
      .where(
        search
          ? and(
            eq(product.is_draft, false),
            isNull(product.product_selected),
            or(
              like(product.title, `%${search}%`),
              like(product.slug, `%${search}%`),
              like(product.name, `%${search}%`),
              like(product.sub_title, `%${search}%`),
            ),
          )
          : and(eq(product.is_draft, false), isNull(product.product_selected)),
      )
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getBySlugForPublic(
    slug: string,
    cacheConfig: CustomQueryCacheConfig = false
  ): Promise<ProductQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product.findFirst({
      where: and(
        eq(product.slug, slug),
        eq(product.is_draft, false),
        isNull(product.product_selected),
      ),
      columns: {
        id: true,
        title: true,
        sub_title: true,
        name: true,
        description: true,
        slug: true,
        hsn: true,
        sku: true,
        price: true,
        discounted_price: true,
        tax: true,
        stock: true,
        thumbnail: true,
        size_or_color: true,
        is_draft: true,
        og_site_name: true,
        how_to_use: true,
        features: true,
        meta_description: true,
        facebook_description: true,
        twitter_description: true,
        custom_script: true,
        createdAt: true,
        updatedAt: true,
      },
      extras: (fields, { sql }) => ({
        reviewsCount: sql<number>`(
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = ${fields.id}
            AND pr.status = 'approved'
          )`.as('reviewsCount'),
        commentsCount: sql<number>`(
            SELECT COUNT(*)
            FROM product_review pr
            WHERE pr.product_id = ${fields.id}
            AND pr.comment IS NOT NULL
            AND pr.status = 'approved'
          )`.as('commentsCount'),
      }),
      with: {
        child_products: {
          where: eq(product.is_draft, false),
          columns: {
            id: true,
            title: true,
            slug: true,
            sku: true,
            hsn: true,
            price: true,
            discounted_price: true,
            tax: true,
            stock: true,
          },
        },
        related_products: {
          with: {
            related_product: {
              where: eq(product.is_draft, false),
              columns: {
                id: true,
                title: true,
                sub_title: true,
                name: true,
                slug: true,
                hsn: true,
                sku: true,
                price: true,
                discounted_price: true,
                tax: true,
                stock: true,
                thumbnail: true,
                size_or_color: true,
                is_draft: true,
                createdAt: true,
                updatedAt: true,
              },
              with: {
                tags: {
                  with: {
                    tag: {
                      columns: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
                product_images: {
                  columns: {
                    id: true,
                    image: true,
                  },
                },
                product_reviews: {
                  where: eq(product_review.status, 'approved'),
                  columns: {
                    rating: true,
                    title: true,
                    comment: true,
                    createdAt: true,
                  },
                  with: {
                    user: {
                      columns: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: {
          with: {
            tag: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        product_images: {
          columns: {
            id: true,
            image: true,
          },
        },
        colors: {
          with: {
            color: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        ingredients: {
          with: {
            ingredient: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        product_faqs: {
          columns: {
            id: true,
            question: true,
            answer: true,
          },
        },
      },
    });
    if (!result) return null;
    return this.mapProductQuery(result);
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
    data: ProductUpdateStatusDto,
  ): Promise<ProductQueryEntityType | null> {
    await this.databaseClient.db
      .update(product)
      .set({
        is_draft: data.is_draft ? data.is_draft.toString() === 'true' : false,
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
}
