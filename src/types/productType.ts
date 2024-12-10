export interface PRODUCT {
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
  status: string;
  discount: number;
  category: string;
  slug: string;
}

export interface PRODUCT_FOR_CART {
  product: PRODUCT;
  quantity: number;
}

export interface PRODUCT_IN_CART {
  products: PRODUCT_FOR_CART[];
}
