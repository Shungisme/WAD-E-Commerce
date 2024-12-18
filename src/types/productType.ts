export interface PRODUCT {
  _id?:string,  
  title: string;
  description: string;
  thumbnail: string;
  images:string[];
  price: number;
  quantity: number;
  status: string;
  discount: number;
  slug: string;
  categorySlug:string
}

export interface PRODUCT_FOR_CART {
  product: PRODUCT;
  quantity: number;
}

export interface PRODUCT_IN_CART {
  products: PRODUCT_FOR_CART[];
}
