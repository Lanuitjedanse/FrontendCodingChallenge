"use client";

import { useEffect, useState } from "react";
import Product from "@/types/product.type";
import BasicSelect from "../BasicSelect/BasicSelect";
import StepSlider from "../StepSlider/StepSlider";
import NumberIndicator from "../NumberIndicator/NumberIndicator";
import ConfirmCart from "../ConfirmCart/ConfirmCart";
import { SelectedProduct } from "@/types/selected-product.type";

interface AddToCartProps {
  products: Product[];
  onAddProductToCart: ({
    id,
    productName,
    maxAmount,
    taxRate,
    price,
    desiredQuantity,
    totalPrice,
  }: SelectedProduct) => void;
}

export const AddToCart = ({ products, onAddProductToCart }: AddToCartProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [desiredProductQuantity, setDesiredProductQuantity] =
    useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getTotalPrice = (quantity: number, unitPrice: number): number => {
    const totalPrice = quantity * unitPrice;
    return Number(totalPrice.toFixed(2));
  };

  const handleChangeProduct = (e: Product) => {
    setSelectedProduct(e);
  };

  const handleChangeDesiredQuantity = (e: number) => {
    setDesiredProductQuantity(e);

    const totalPrice = getTotalPrice(e, selectedProduct?.price as number);
    setTotalPrice(totalPrice);
  };

  const handleAddProductToCart = () => {
    if (selectedProduct) {
      const newSelectedProduct = {
        ...selectedProduct,
        desiredQuantity: desiredProductQuantity,
        totalPrice,
      };

      onAddProductToCart(newSelectedProduct);
      setDesiredProductQuantity(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    setDesiredProductQuantity(0);
    setTotalPrice(0);
  }, [selectedProduct]);

  useEffect(() => {
    const totalPrice = getTotalPrice(
      desiredProductQuantity,
      selectedProduct?.price as number
    );
    setTotalPrice(totalPrice);
  }, [selectedProduct?.price, desiredProductQuantity, totalPrice]);

  return (
    <div className="flex flex-col md:flex-row space-y-3 space-x-3 items-center">
      <BasicSelect
        options={products}
        label="Products"
        helperText="Select a product from the list"
        onChange={handleChangeProduct}
      ></BasicSelect>

      <StepSlider
        disabled={!selectedProduct}
        defaultValue={desiredProductQuantity}
        max={selectedProduct?.maxAmount || 0}
        min={0}
        handleChangeCallback={handleChangeDesiredQuantity}
      ></StepSlider>

      <div className="flex items-center space-x-3">
        <NumberIndicator
          width="w-12"
          height="h-12"
          value={desiredProductQuantity}
        ></NumberIndicator>
        <span>x</span>
        <span>{selectedProduct?.price || 0} €</span>
      </div>
      <ConfirmCart
        label="Add to cart"
        color="primary"
        totalPrice={totalPrice || 0}
        disabled={!selectedProduct || !totalPrice}
        onClick={handleAddProductToCart}
      ></ConfirmCart>
    </div>
  );
};
