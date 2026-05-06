type Product = {
    id: string;
    title: string;
    slug: string;
}

export class ProductBackInStockEvent {
    product: Product;

    constructor(product: Product) {
        this.product = product;
    }
}

export type ProductBackInStockPayload = {
    email: string;
    product: Product;
}