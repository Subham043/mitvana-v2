import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OfferServiceInterface } from '../interface/offer.service.interface';
import { OfferRepositoryInterface } from '../interface/offer.repository.interface';
import { OFFER_REPOSITORY } from '../offer.constants';
import { OfferQueryEntityType, UpdateOfferEntity } from '../entity/offer.entity';
import { OfferDto } from '../schema/offer.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';

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

  async getAll(query: PaginationDto): Promise<PaginationResponse<OfferQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const offers = await this.offerRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.offerRepository.count(search, { autoInvalidate: true });
    return { data: offers, meta: { page, limit, total: count, search } };
  }

  async createOffer(offer: OfferDto): Promise<OfferQueryEntityType> {
    const { products, ...rest } = offer;

    if (products && Array.isArray(products) && products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The applicble products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "products", "exists");
    }

    const newOffer = await this.offerRepository.createOffer({
      ...rest,
      products: products ?? [],
    });

    if (!newOffer) throw new InternalServerErrorException('Failed to create offer');

    return newOffer;
  }

  async updateOffer(id: string, offer: OfferDto): Promise<OfferQueryEntityType> {
    const { products, ...rest } = offer;

    const offerById = await this.offerRepository.getById(id);

    if (!offerById) throw new NotFoundException("Offer not found");

    const data: UpdateOfferEntity = {
      ...rest,
      description: rest.description ? rest.description : null,
      min_cart_value: rest.min_cart_value ? rest.min_cart_value : null,
      max_discount: rest.max_discount ? rest.max_discount : null,
    }

    if (products && Array.isArray(products) && products.length > 0) {
      const relatedProducts = await this.productRepository.checkIdsExists(products);
      if (relatedProducts.some(itm => !itm.exists)) throw new CustomValidationException(`The applicable products ${relatedProducts.filter(itm => !itm.exists).map(itm => itm.id).join(", ")} does not exist`, "products", "exists");
      data.add_products = products.filter((item) => !offerById.products.map(itm => itm.product.id).includes(item));
      data.remove_products = offerById.products.filter((item) => !products.includes(item.product.id)).map(itm => itm.product.id);
    } else {
      data.remove_products = offerById.products.map(itm => itm.product.id);
    }

    const updatedOffer = await this.offerRepository.updateOffer(id, data);

    if (!updatedOffer) throw new InternalServerErrorException('Failed to update offer');

    return updatedOffer;
  }

  async deleteOffer(id: string): Promise<void> {
    const offerById = await this.offerRepository.getById(id);

    if (!offerById) throw new NotFoundException("Offer not found");

    await this.offerRepository.deleteOffer(id);
  }
}
