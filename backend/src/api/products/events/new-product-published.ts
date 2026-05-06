type Product = {
    title: string;
    slug: string;
    price: number;
    image: string;
    description: string;
}

export class NewProductPublishedEvent {
    product: Product;

    constructor(product: Product) {
        this.product = product;
    }
}

export type NewProductPublishedPayload = {
    email: string;
    product: Product;
}