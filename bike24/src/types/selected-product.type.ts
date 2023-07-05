import Product from "./product.type";

export default interface SelectedProduct {
  product: Product;
  desiredQuantity: number;
  totalPrice: number;
}
