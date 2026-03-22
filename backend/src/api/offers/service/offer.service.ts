import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OfferServiceInterface } from '../interface/offer.service.interface';
import { OfferRepositoryInterface } from '../interface/offer.repository.interface';
import { OFFER_REPOSITORY } from '../offer.constants';
import { OfferQueryEntityType, UpdateOfferEntity } from '../entity/offer.entity';
import { OfferDto } from '../schema/offer.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { OfferUpdateStatusDto } from '../schema/offer-update-status.schema';
import { PassThrough } from 'stream';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { OfferFilterDto } from '../schema/offer-filter.schema';

@Injectable()
export class IOfferService implements OfferServiceInterface {

  constructor(
    @Inject(OFFER_REPOSITORY) private readonly offerRepository: OfferRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
  ) { }

  async getById(id: string): Promise<OfferQueryEntityType> {
    const offer = await this.offerRepository.getById(id, { autoInvalidate: true });

    if (!offer) throw new NotFoundException("Offer not found");

    return offer;
  }

  async getAll(query: OfferFilterDto): Promise<PaginationResponse<OfferQueryEntityType, OfferFilterDto>> {
    const { page, limit, offset, search, is_draft } = normalizePagination<OfferFilterDto>(query);
    const offers = await this.offerRepository.getAll({ page, limit, offset, search, is_draft }, { autoInvalidate: true });
    const count = await this.offerRepository.count({ search, is_draft }, { autoInvalidate: true });
    return { data: offers, meta: { page, limit, total: count, search, is_draft } };
  }

  async createOffer(offer: OfferDto): Promise<OfferQueryEntityType> {
    const { products, is_draft, ...rest } = offer;

    if (products && Array.isArray(products) && products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The applicble products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "products", "exists");
    }

    const newOffer = await this.offerRepository.createOffer({
      ...rest,
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      products: products ?? [],
    });

    if (!newOffer) throw new InternalServerErrorException('Failed to create offer');

    return newOffer;
  }

  async updateOffer(id: string, offer: OfferDto): Promise<OfferQueryEntityType> {
    const { products, is_draft, ...rest } = offer;

    const offerById = await this.offerRepository.getById(id);

    if (!offerById) throw new NotFoundException("Offer not found");

    const data: UpdateOfferEntity = {
      ...rest,
      is_draft: is_draft ? is_draft.toString() === "true" : false,
      description: rest.description ? rest.description : null,
      min_cart_value: rest.min_cart_value ? rest.min_cart_value : null,
      max_discount: rest.max_discount ? rest.max_discount : null,
    }

    if (products && Array.isArray(products) && products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The applicable products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "products", "exists");
      data.add_products = products.filter((item) => !offerById.products.map(itm => itm.id).includes(item));
      data.remove_products = offerById.products.filter((item) => !products.includes(item.id)).map(itm => itm.id);
    } else {
      data.remove_products = offerById.products.map(itm => itm.id);
    }

    const updatedOffer = await this.offerRepository.updateOffer(id, data);

    if (!updatedOffer) throw new InternalServerErrorException('Failed to update offer');

    return updatedOffer;
  }

  async updateOfferStatus(id: string, data: OfferUpdateStatusDto): Promise<OfferQueryEntityType> {
    const offerById = await this.offerRepository.getById(id);

    if (!offerById) throw new NotFoundException("Offer not found");

    const updatedOffer = await this.offerRepository.updateOfferStatus(id, data);

    if (!updatedOffer) throw new InternalServerErrorException('Failed to update offer');

    return updatedOffer;
  }

  async deleteOffer(id: string): Promise<void> {
    const offerById = await this.offerRepository.getById(id);

    if (!offerById) throw new NotFoundException("Offer not found");

    await this.offerRepository.deleteOffer(id);
  }

  async exportOffers(query: OfferFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Offers',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Description', key: 'description', width: 30 },
        { header: 'Discount Percentage', key: 'discount_percentage', width: 30 },
        { header: 'Minimum Cart Value', key: 'min_cart_value', width: 10 },
        { header: 'Maximum Discount', key: 'max_discount', width: 10 },
        { header: 'Products', key: 'products', width: 20 },
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

        return this.offerRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          is_draft: query.is_draft,
        })
      },

      mapRow: (offer) => ({
        id: offer.id,
        title: offer.title,
        description: offer.description,
        discount_percentage: offer.discount_percentage,
        min_cart_value: offer.min_cart_value,
        max_discount: offer.max_discount,
        is_draft: offer.is_draft,
        products: offer.products.map(itm => itm.title).join(", "),
        createdAt: offer.createdAt?.toISOString(),
        updatedAt: offer.updatedAt?.toISOString(),
      }),
    })
  }
}
