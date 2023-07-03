import { UUID } from "crypto";

export default interface Product {
  id: UUID;
  productName: string;
  maxAmount: number;
  taxRate: number;
  price: number;
}
