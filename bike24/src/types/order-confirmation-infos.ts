import { SelectedProduct } from "./selected-product.type";

export interface OrderConfirmationInfos {
  selectedProducts: SelectedProduct[];
  totalPrice: number;
  date?: string;
  orderNumber?: number;
}
