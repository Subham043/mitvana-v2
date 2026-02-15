import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductServiceInterface } from '../interface/product.service.interface';
import { ProductRepositoryInterface } from '../interface/product.repository.interface';
import { PRODUCT_REPOSITORY } from '../product.constants';
import { ProductListEntity, ProductQueryEntityType, UpdateProductEntity } from '../entity/product.entity';
import { ProductCreateDto } from '../schema/product-create.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
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

@Injectable()
export class ProductService implements ProductServiceInterface {

  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    @Inject(TAG_REPOSITORY) private readonly tagRepository: TagRepositoryInterface,
    @Inject(INGREDIENT_REPOSITORY) private readonly ingredientRepository: IngredientRepositoryInterface,
    @Inject(COLOR_REPOSITORY) private readonly colorRepository: ColorRepositoryInterface,
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryInterface,
  ) { }

  async getByTitle(title: string): Promise<ProductQueryEntityType> {
    const product = await this.productRepository.getByTitle(title);

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async getBySlug(slug: string): Promise<ProductQueryEntityType> {
    const product = await this.productRepository.getBySlug(slug);

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async getById(id: string): Promise<ProductQueryEntityType> {
    const product = await this.productRepository.getById(id);

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<ProductListEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const products = await this.productRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.productRepository.count(search, { autoInvalidate: true });
    return { data: products, meta: { page, limit, total: count, search } };
  }

  async getAllPublished(query: PaginationDto): Promise<PaginationResponse<ProductListEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const products = await this.productRepository.getAllPublished({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.productRepository.count(search, { autoInvalidate: true });
    return { data: products, meta: { page, limit, total: count, search } };
  }

  async createProduct(product: ProductCreateDto): Promise<ProductQueryEntityType> {
    const { title, slug, is_draft, product_selected, related_products, colors, tags, ingredients, categories, faqs, thumbnail: thumbnailMetadata, ...rest } = product;
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
      product_selected: product_selected ?? null,
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      slug: slug ?? title.toLowerCase().replace(/ /g, '-'),
    });

    if (!newProduct) throw new InternalServerErrorException('Failed to create product');

    return newProduct;
  }

  async updateProduct(id: string, product: ProductUpdateDto): Promise<ProductQueryEntityType> {
    const { title, slug, is_draft, product_selected, thumbnail: thumbnailMetadata, ...rest } = product;

    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    const productByName = await this.productRepository.getByTitle(title);

    if (productByName && productByName.title !== productById.title) throw new CustomValidationException("The product title already exists", "title", "unique");

    const productBySlug = await this.productRepository.getBySlug(slug);

    if (productBySlug && productBySlug.slug !== productById.slug) throw new CustomValidationException("The product slug already exists", "slug", "unique");

    if (product_selected) {
      const productSelected = await this.productRepository.checkIdExists(product_selected);
      if (!productSelected) throw new CustomValidationException("The product selected does not exist", "product_selected", "exists");
    }

    const data: UpdateProductEntity = {
      ...rest,
      name: rest.name ? rest.name : null,
      sub_title: rest.sub_title ? rest.sub_title : null,
      sku: rest.sku ? rest.sku : null,
      hsn: rest.hsn ? rest.hsn : null,
      description: rest.description ? rest.description : null,
      tax: rest.tax ? rest.tax : null,
      stock: rest.stock ? rest.stock : null,
      size_or_color: rest.size_or_color ? rest.size_or_color : null,
      bought_text: rest.bought_text ? rest.bought_text : null,
      product_bought: rest.product_bought ? rest.product_bought : null,
      og_site_name: rest.og_site_name ? rest.og_site_name : null,
      how_to_use: rest.how_to_use ? rest.how_to_use : null,
      meta_description: rest.meta_description ? rest.meta_description : null,
      facebook_description: rest.facebook_description ? rest.facebook_description : null,
      twitter_description: rest.twitter_description ? rest.twitter_description : null,
      custom_script: rest.custom_script ? rest.custom_script : null,
      product_selected: product_selected ?? null,
      title,
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      slug: slug ?? title.toLowerCase().replace(/ /g, '-'),
    }
    if (thumbnailMetadata) {
      //save the file in uploads using FileHelperUtil and the fileTempPath
      const thumbnail = await FileHelperUtil.saveFile(thumbnailMetadata);
      data.thumbnail = thumbnail;
    }

    const updatedProduct = await this.productRepository.updateProduct(id, data);

    if (!updatedProduct) throw new InternalServerErrorException('Failed to update product');

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const productById = await this.productRepository.getById(id);

    if (!productById) throw new NotFoundException("Product not found");

    await this.productRepository.deleteProduct(id);
  }
}
