export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShoppingState {
  marketName: string;
  budget: number;
  products: Product[];
}
