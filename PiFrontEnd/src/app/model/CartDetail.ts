import { Product } from "./product";

export interface CartDetail {
    cartId: number;
    product: Product[];
  }