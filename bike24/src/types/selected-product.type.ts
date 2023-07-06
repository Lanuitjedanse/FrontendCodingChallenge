import { UUID } from "crypto";
import Product from "./product.type";

export interface SelectedProduct {
  id: UUID;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
  desiredQuantity: number;
  totalPrice: number;
}
