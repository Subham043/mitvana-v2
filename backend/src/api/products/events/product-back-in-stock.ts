type Product = {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    description: string;
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