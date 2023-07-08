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
  isQuantityAllowed: boolean;
  isMaxProductTypeReached: boolean;

  onSelectProduct: (product: Product, quantity: number) => void;
}

export const AddToCart = ({
  products,
  isQuantityAllowed,
  isMaxProductTypeReached,
  onAddProductToCart,
  onSelectProduct,
}: AddToCartProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [desiredProductQuantity, setDesiredProductQuantity] =
    useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getTotalPrice = (quantity: number, unitPrice: number): number => {
    const totalPrice = quantity * unitPrice;
    return parseFloat(totalPrice.toFixed(2));
  };

  const handleChangeProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleChangeDesiredQuantity = (quantity: number) => {
    if (selectedProduct) {
      onSelectProduct(selectedProduct, quantity);
    }

    setDesiredProductQuantity(quantity);

    const totalPrice = getTotalPrice(
      quantity,
      selectedProduct?.price as number
    );
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
    if (desiredProductQuantity) {
      setDesiredProductQuantity(desiredProductQuantity);
      if (selectedProduct) {
        onSelectProduct(selectedProduct, desiredProductQuantity);
      }
    }
  }, [selectedProduct, desiredProductQuantity]);

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
      <div className="mt-8 mx-4">
        <BasicSelect
          options={products}
          label="Products"
          helperText="Select a product from the list"
          onChange={handleChangeProduct}
        ></BasicSelect>
      </div>

      <div className="">
        <StepSlider
          disabled={!selectedProduct || isMaxProductTypeReached}
          defaultValue={desiredProductQuantity}
          max={selectedProduct?.maxAmount || 0}
          min={0}
          handleChangeCallback={handleChangeDesiredQuantity}
        ></StepSlider>

        {!isQuantityAllowed && (
          <p className="error-message">
            You have reached the max quantity for this product
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 w-40 justify-center">
        <NumberIndicator
          width="w-12"
          height="h-12"
          value={desiredProductQuantity}
        ></NumberIndicator>
        <div className="min-w-lg flex space-x-3">
          <span>x</span>
          <span>{selectedProduct?.price || 0} €</span>
        </div>
      </div>
      <div className="flex flex-col">
        <ConfirmCart
          label="Add to cart"
          color="primary"
          totalPrice={totalPrice || 0}
          disabled={
            !selectedProduct ||
            !totalPrice ||
            !isQuantityAllowed ||
            isMaxProductTypeReached
          }
          onClick={handleAddProductToCart}
        ></ConfirmCart>
        {isMaxProductTypeReached && (
          <p className="error-message mt-16">
            You cannot add more than 10 different product types in your cart
          </p>
        )}
      </div>
    </div>
  );
};
