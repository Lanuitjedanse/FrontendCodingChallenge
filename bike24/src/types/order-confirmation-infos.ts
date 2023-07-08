import { SelectedProduct } from "./selected-product.type";

export interface OrderConfirmationInfos {
  selectedProducts: SelectedProduct[];
  totalPrice: number;
  totalProductQuantity: number;
  date?: Date;
  orderNumber?: number;
}
