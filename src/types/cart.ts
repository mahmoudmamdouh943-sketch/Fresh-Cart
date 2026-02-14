

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductSubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    id: string; 
    title: string;
    imageCover: string;
    quantity: number;
    ratingsAverage: number;
    brand: ProductBrand;
    category: ProductCategory;
    subcategory: ProductSubCategory[];
  };
}

export interface CartResponse {
  status: string;
  message?: string;
  cartId: string;
  data: {
    products: CartProduct[];
    totalCartPrice: number;
  };
}
