import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductServiceInterface } from '../interface/product.service.interface';
import { ProductRepositoryInterface } from '../interface/product.repository.interface';
import { NEW_PRODUCT_PUBLISHED_EVENT_LABEL, PRODUCT_BACK_IN_STOCK_EVENT_LABEL, PRODUCT_CACHE_KEY, PRODUCT_REPOSITORY } from '../product.constants';
import { ProductListEntity, ProductQueryEntityType, PublicProductListEntity, UpdateProductEntity } from '../entity/product.entity';
import { ProductCreateDto } from '../schema/product-create.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { FileHelperUtil } from 'src/utils/file.util';
import { ProductUpdateDto } from '../schema/product-update.schema';
import { TAG_REPOSITORY } from 'src/api/tags/tag.constants';
import { TagRepositoryInterface } from 'src/api/tags/interface/tag.repository.interface';
import { IngredientRepositoryInterface } from 'src/api/ingredients/interface/ingredient.repository.interface';
import { INGREDIENT_REPOSITORY } from 'src/api/ingredients/ingredient.constants';
import { ColorRepositoryInterface } from 'src/api/colors/interface/color.repository.interface';
import { COLOR_REPOSITORY } from 'src/api/colors/color.constants';
import { CategoryRepositoryInterface } from 'src/api/categories/interface/category.repository.interface';
import { CATEGORY_REPOSITORY } from 'src/api/categories/category.constants';
import { ProductUpdateStatusDto } from '../schema/product-update-status.schema';
import { PassThrough } from 'stream';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { ProductFilterDto } from '../schema/product-filter.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NewProductPublishedEvent } from '../events/new-product-published';
import { ProductBackInStockEvent } from '../events/product-back-in-stock';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';
import { CART_CACHE_KEY } from 'src/api/carts/cart.constants';
import { WISHLIST_CACHE_KEY } from 'src/api/wishlists/wishlist.constants';
import { PRODUCT_REVIEW_CACHE_KEY } from 'src/api/product_reviews/product_review.constants';

@Injectable()
export class ProductService implements ProductServiceInterface {

  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    @Inject(TAG_REPOSITORY) private readonly tagRepository: TagRepositoryInterface,
    @Inject(INGREDIENT_REPOSITORY) private readonly ingredientRepository: IngredientRepositoryInterface,
    @Inject(COLOR_REPOSITORY) private readonly colorRepository: ColorRepositoryInterface,
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryInterface,
    private readonly eventEmitter: EventEmitter2,
    private readonly cacheService: CacheService,
  ) { }

  async getByTitle(title: string): Promise<ProductQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY, { title });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const product = await this.productRepository.getByTitle(title, { autoInvalidate: true });

        if (!product) throw new NotFoundException("Product not found");

        return product;
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, cacheKey],
      },
    });
  }

  async getBySlug(slug: string): Promise<ProductQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY, { slug });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const product = await this.productRepository.getBySlug(slug, { autoInvalidate: true });

        if (!product) throw new NotFoundException("Product not found");

        return product;
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, cacheKey],
      },
    });
  }

  async getBySlugForPublic(slug: string, userId?: string): Promise<ProductQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY + `:slug:u_${userId || 'public'}`, { slug, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const product = await this.productRepository.getBySlugForPublic(slug, userId, { autoInvalidate: true });

        if (!product) throw new NotFoundException("Product not found");

        return product;
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, PRODUCT_CACHE_KEY + `:slug:u_${userId || 'public'}`, cacheKey],
      },
    });
  }

  async getById(id: string): Promise<ProductQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const product = await this.productRepository.getById(id, { autoInvalidate: true });

        if (!product) throw new NotFoundException("Product not found");

        return product;
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: ProductFilterDto): Promise<PaginationResponse<ProductListEntity, ProductFilterDto>> {
    const { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = normalizePagination<ProductFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY, { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const products = await this.productRepository.getAll({ page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, { autoInvalidate: true });
        const count = await this.productRepository.count({ search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, { autoInvalidate: true });
        return { data: products, meta: { page, limit, total: count, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } };
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAllPublished(query: ProductFilterDto): Promise<PaginationResponse<ProductListEntity, ProductFilterDto>> {
    const { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = normalizePagination<ProductFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY + ':published', { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const products = await this.productRepository.getAllPublished({ page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, { autoInvalidate: true });
        const count = await this.productRepository.count({ search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, { autoInvalidate: true });
        return { data: products, meta: { page, limit, total: count, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } };
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, PRODUCT_CACHE_KEY + ':published', cacheKey],
      },
    });
  }

  async getAllPublishedForPublic(query: ProductFilterDto, userId?: string): Promise<PaginationResponse<PublicProductListEntity, ProductFilterDto>> {
    const { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } = normalizePagination<ProductFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_CACHE_KEY + `:publishedForPublic:u_${userId || "public"}`, { page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const products = await this.productRepository.getAllPublishedForPublic({ page, limit, offset, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, userId, { autoInvalidate: true });
        const count = await this.productRepository.countPublishedForPublic({ search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order }, { autoInvalidate: true });
        return { data: products, meta: { page, limit, total: count, search, is_draft, category_slug, tag, min_price, max_price, sort_by, sort_order } };
      },
      options: {
        tags: [PRODUCT_CACHE_KEY, PRODUCT_CACHE_KEY + `:publishedForPublic:u_${userId || "public"}`, cacheKey],
      },
    });
  }

  async createProduct(product: ProductCreateDto): Promise<ProductQueryEntityType> {
    const { title, slug, is_draft, product_selected, related_products, colors, tags, ingredients, categories, faqs, thumbnail: thumbnailMetadata, images: imagesMetadata, ...rest } = product;
    const productByTitle = await this.productRepository.getByTitle(title);

    if (productByTitle) throw new CustomValidationException("The product title already exists", "title", "unique");

    if (slug) {
      const productBySlug = await this.productRepository.getBySlug(slug);
      if (productBySlug) throw new CustomValidationException("The product slug already exists", "slug", "unique");
    }

    if (product_selected) {
      const productSelected = await this.productRepository.checkIdExists(product_selected);
      if (!productSelected) throw new CustomValidationException("The product selected does not exist", "product_selected", "exists");
    }

    if (related_products && Array.isArray(related_products) && related_products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(related_products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The related products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "related_products", "exists");
    }

    if (colors && Array.isArray(colors) && colors.length > 0) {
      const checkColors = await this.colorRepository.checkIdsExists(colors);
      if (checkColors.some(itm => !itm.exists)) throw new CustomValidationException(`The colors ${checkColors.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "colors", "exists");
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      const checkTags = await this.tagRepository.checkIdsExists(tags);
      if (checkTags.some(itm => !itm.exists)) throw new CustomValidationException(`The tags ${checkTags.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "tags", "exists");
    }

    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      const checkIngredients = await this.ingredientRepository.checkIdsExists(ingredients);
      if (checkIngredients.some(itm => !itm.exists)) throw new CustomValidationException(`The ingredients ${checkIngredients.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "ingredients", "exists");
    }

    if (categories && Array.isArray(categories) && categories.length > 0) {
      const checkCategories = await this.categoryRepository.checkIdsExists(categories);
      if (checkCategories.some(itm => !itm.exists)) throw new CustomValidationException(`The categories ${checkCategories.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "categories", "exists");
    }

    //save the file in uploads using FileHelperUtil and the fileTempPath
    const thumbnail = await FileHelperUtil.saveFile(thumbnailMetadata);

    let images: string[] = [];
    if (imagesMetadata) {
      images = await Promise.all(imagesMetadata.map(async (imageMetadata) => {
        return await FileHelperUtil.saveFile(imageMetadata);
      }));
    }

    const newProduct = await this.productRepository.createProduct({
      ...rest,
      related_products: related_products ?? [],
      colors: colors ?? [],
      tags: tags ?? [],
      ingredients: ingredients ?? [],
      categories: categories ?? [],
      faqs: faqs ?? [],
      title,
      thumbnail: thumbnail,
      images: images,
      product_selected: product_selected ?? null,
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      published_at: (is_draft !== undefined && is_draft.toString() !== "true") ? new Date() : null,
      slug: slug ?? title.toLowerCase().replace(/ /g, '-'),
    });

    if (!newProduct) throw new InternalServerErrorException('Failed to create product');

    if (newProduct.is_draft === false) {
      this.eventEmitter.emit(NEW_PRODUCT_PUBLISHED_EVENT_LABEL, new NewProductPublishedEvent({
        title: newProduct.title,
        slug: newProduct.slug,
        price: newProduct.discounted_price ? newProduct.discounted_price : newProduct.price,
        image: newProduct.thumbnail_link || "",
        description: newProduct.description || "",
      }));
    }

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    return newProduct;
  }

  async updateProduct(id: string, product: ProductUpdateDto): Promise<ProductQueryEntityType> {
    const { title, slug, is_draft, product_selected, related_products, colors, tags, ingredients, categories, faqs, thumbnail: thumbnailMetadata, images: imagesMetadata, ...rest } = product;

    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    const productByName = await this.productRepository.getByTitle(title);

    if (productByName && productByName.title !== productById.title) throw new CustomValidationException("The product title already exists", "title", "unique");

    const productBySlug = await this.productRepository.getBySlug(slug);

    if (productBySlug && productBySlug.slug !== productById.slug) throw new CustomValidationException("The product slug already exists", "slug", "unique");

    if (product_selected) {
      const productSelected = await this.productRepository.checkIdExists(product_selected);
      if (!productSelected) throw new CustomValidationException("The product selected does not exist", "product_selected", "exists");
      if (product_selected === id) throw new CustomValidationException("The product selected cannot be same as the current product", "product_selected", "same");
    }

    const data: UpdateProductEntity = {
      ...rest,
      name: rest.name ? rest.name : null,
      sub_title: rest.sub_title ? rest.sub_title : null,
      sku: rest.sku ? rest.sku : null,
      hsn: rest.hsn ? rest.hsn : null,
      description: rest.description ? rest.description : null,
      stock: rest.stock ? rest.stock : null,
      size_or_color: rest.size_or_color ? rest.size_or_color : null,
      bought_text: rest.bought_text ? rest.bought_text : null,
      product_bought: rest.product_bought ? rest.product_bought : null,
      og_site_name: rest.og_site_name ? rest.og_site_name : null,
      how_to_use: rest.how_to_use ? rest.how_to_use : null,
      features: rest.features ? rest.features : null,
      meta_description: rest.meta_description ? rest.meta_description : null,
      facebook_description: rest.facebook_description ? rest.facebook_description : null,
      twitter_description: rest.twitter_description ? rest.twitter_description : null,
      custom_script: rest.custom_script ? rest.custom_script : null,
      product_selected: product_selected ?? null,
      title,
      images: [],
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      slug: slug ?? title.toLowerCase().replace(/ /g, '-'),
      published_at: productById.published_at,
    }

    if (productById.is_draft && productById.published_at === null && (is_draft !== undefined && is_draft.toString() !== "true")) {
      data.published_at = new Date();
    }

    if (related_products && Array.isArray(related_products) && related_products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(related_products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The related products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "related_products", "exists");
      if (relatedProducts.some(itm => itm.id === id)) throw new CustomValidationException("The related product cannot be same as the current product", "related_products", "same");
      data.add_related_products = related_products.filter((item) => !productById.related_products.map(itm => itm.id).includes(item));
      data.remove_related_products = productById.related_products.filter((item) => !related_products.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_related_products = productById.related_products.map(itm => itm.id);
    }

    if (colors && Array.isArray(colors) && colors.length > 0) {
      const checkColors = await this.colorRepository.checkIdsExists(colors);
      if (checkColors.some(itm => !itm.exists)) throw new CustomValidationException(`The colors ${checkColors.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "colors", "exists");
      data.add_colors = colors.filter((item) => !productById.colors.map(itm => itm.id).includes(item));
      data.remove_colors = productById.colors.filter((item) => !colors.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_colors = productById.colors.map(itm => itm.id);
    }

    if (tags && Array.isArray(tags) && tags.length > 0) {
      const checkTags = await this.tagRepository.checkIdsExists(tags);
      if (checkTags.some(itm => !itm.exists)) throw new CustomValidationException(`The tags ${checkTags.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "tags", "exists");
      data.add_tags = tags.filter((item) => !productById.tags.map(itm => itm.id).includes(item));
      data.remove_tags = productById.tags.filter((item) => !tags.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_tags = productById.tags.map(itm => itm.id);
    }

    if (ingredients && Array.isArray(ingredients) && ingredients.length > 0) {
      const checkIngredients = await this.ingredientRepository.checkIdsExists(ingredients);
      if (checkIngredients.some(itm => !itm.exists)) throw new CustomValidationException(`The ingredients ${checkIngredients.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "ingredients", "exists");
      data.add_ingredients = ingredients.filter((item) => !productById.ingredients.map(itm => itm.id).includes(item));
      data.remove_ingredients = productById.ingredients.filter((item) => !ingredients.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_ingredients = productById.ingredients.map(itm => itm.id);
    }

    if (categories && Array.isArray(categories) && categories.length > 0) {
      const checkCategories = await this.categoryRepository.checkIdsExists(categories);
      if (checkCategories.some(itm => !itm.exists)) throw new CustomValidationException(`The categories ${checkCategories.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "categories", "exists");
      data.add_categories = categories.filter((item) => !productById.categories.map(itm => itm.id).includes(item));
      data.remove_categories = productById.categories.filter((item) => !categories.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_categories = productById.categories.map(itm => itm.id);
    }

    if (faqs && Array.isArray(faqs) && faqs.length > 0) {
      const faqIds = faqs.map((item) => item.id).filter((item) => item !== undefined);
      const checkFaqs = await this.productRepository.checkFaqsIdsExists(faqIds);
      if (checkFaqs.some(itm => !itm.exists)) throw new CustomValidationException(`The faqs ${checkFaqs.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "faqs", "exists");
      data.add_faqs = faqs.filter((item) => item.id === undefined).map(itm => ({ question: itm.question, answer: itm.answer }));
      data.update_faqs = faqs.filter((item) => item.id !== undefined).map(itm => ({ question: itm.question, answer: itm.answer, id: itm.id })) as { question: string, answer: string, id: string }[];
      data.remove_faqs = productById.product_faqs.filter((item) => !faqs.map((itm) => itm.id).filter((itm) => itm !== undefined).includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_faqs = productById.product_faqs.map(itm => itm.id);
    }

    if (thumbnailMetadata) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const thumbnail = await FileHelperUtil.saveFile(thumbnailMetadata);
      data.thumbnail = thumbnail;
    }

    if (imagesMetadata && imagesMetadata.length > 0) {
      data.images = await Promise.all(imagesMetadata.map(async (imageMetadata) => {
        return await FileHelperUtil.saveFile(imageMetadata);
      }));
    }

    const updatedProduct = await this.productRepository.updateProduct(id, data);

    if (!updatedProduct) throw new InternalServerErrorException('Failed to update product');

    if (productById.is_draft === true && productById.published_at === null && updatedProduct.is_draft === false && updatedProduct.published_at !== null) {
      this.eventEmitter.emit(NEW_PRODUCT_PUBLISHED_EVENT_LABEL, new NewProductPublishedEvent({
        title: updatedProduct.title,
        slug: updatedProduct.slug,
        price: updatedProduct.discounted_price ? updatedProduct.discounted_price : updatedProduct.price,
        image: updatedProduct.thumbnail_link || "",
        description: updatedProduct.description || "",
      }));
    }

    if (productById.is_draft === false && updatedProduct.is_draft === false && productById.stock !== null && productById.stock <= 0 && updatedProduct.stock !== null && updatedProduct.stock > 0) {
      this.eventEmitter.emit(PRODUCT_BACK_IN_STOCK_EVENT_LABEL, new ProductBackInStockEvent({
        id: updatedProduct.id,
        title: updatedProduct.title,
        slug: updatedProduct.slug,
        image: updatedProduct.thumbnail_link || "",
        price: updatedProduct.discounted_price ? updatedProduct.discounted_price : updatedProduct.price,
        description: updatedProduct.description || "",
      }));
    }

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);

    return updatedProduct;
  }

  async updateProductStatus(id: string, data: ProductUpdateStatusDto): Promise<ProductQueryEntityType> {
    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    const payload: ProductUpdateStatusDto & { published_at: Date | null } = {
      ...data,
      published_at: productById.published_at
    }

    if (productById.is_draft && productById.published_at === null && (data.is_draft !== undefined && data.is_draft.toString() !== "true")) {
      payload.published_at = new Date();
    }

    const updatedProduct = await this.productRepository.updateProductStatus(id, payload);

    if (!updatedProduct) throw new InternalServerErrorException('Failed to update product');

    if (productById.is_draft === true && productById.published_at === null && updatedProduct.is_draft === false && updatedProduct.published_at !== null) {
      this.eventEmitter.emit(NEW_PRODUCT_PUBLISHED_EVENT_LABEL, new NewProductPublishedEvent({
        title: updatedProduct.title,
        slug: updatedProduct.slug,
        price: updatedProduct.discounted_price ? updatedProduct.discounted_price : updatedProduct.price,
        image: updatedProduct.thumbnail_link || "",
        description: updatedProduct.description || "",
      }));
    }

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    await this.productRepository.deleteProduct(id);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);
  }

  async deleteProductImage(id: string, imageId: string): Promise<void> {
    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    await this.productRepository.deleteProductImage(id, imageId);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    await this.cacheService.invalidateTag(CART_CACHE_KEY);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);
  }

  async exportProducts(query: ProductFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Products',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Sub-Title', key: 'sub_title', width: 30 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Slug', key: 'slug', width: 30 },
        { header: 'HSN', key: 'hsn', width: 30 },
        { header: 'SKU', key: 'sku', width: 30 },
        { header: 'Price', key: 'price', width: 30 },
        { header: 'Tax', key: 'tax', width: 30 },
        { header: 'Discounted Price', key: 'discounted_price', width: 10 },
        { header: 'Stock', key: 'stock', width: 10 },
        { header: 'Thumbnail', key: 'thumbnail_link', width: 10 },
        { header: 'Categories', key: 'categories', width: 20 },
        { header: 'Is Draft', key: 'is_draft', width: 10 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.productRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          is_draft: query.is_draft,
        })
      },

      mapRow: (product) => ({
        id: product.id,
        title: product.title,
        sub_title: product.sub_title,
        name: product.name,
        slug: product.slug,
        hsn: product.hsn,
        sku: product.sku,
        price: product.price,
        discounted_price: product.discounted_price,
        tax: product.tax,
        stock: product.stock,
        thumbnail_link: product.thumbnail_link,
        is_draft: product.is_draft,
        categories: product.categories.map(itm => itm.name).join(", "),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
      }),
    })
  }
}
