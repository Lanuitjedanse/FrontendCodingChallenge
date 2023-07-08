"use client";
import { AddToCart } from "../AddToCart/AddToCart";
import Product from "../../types/product.type";
import { SelectedProduct } from "../../types/selected-product.type";
import ProductsTable from "../ProductsTable/ProductsTable";
import ConfirmCart from "../ConfirmCart/ConfirmCart";

import { useEffect, useState } from "react";
import { UUID } from "crypto";
import ProgressBar from "../ProgressBar/ProgressBar";

interface CartProps {
  availableProducts: Product[];
  onConfirmOrder: (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ) => void;
  onAddProductToCart: ({
    id,
    productName,
    maxAmount,
    taxRate,
    price,
    desiredQuantity,
    totalPrice,
  }: SelectedProduct) => void;
  onDeleteProducts: (products: SelectedProduct[] | []) => void;
  onQuantityUpdate: (products: SelectedProduct[] | []) => void;
}

export default function Cart({
  availableProducts,
  onConfirmOrder,
  onAddProductToCart,
  onDeleteProducts,
  onQuantityUpdate,
}: CartProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [newSelectedProduct, setNewSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isQuantityAllowed, setIsQuantityAllowed] = useState<boolean>(true);

  const onEmitAddProductToCart = (selectedProduct: SelectedProduct) => {
    setNewSelectedProduct(selectedProduct);
    onAddProductToCart(selectedProduct);
  };

  const handleConfirmOrder = (): void => {
    onConfirmOrder(selectedProducts, totalPrice);
    setSelectedProducts([]);
  };

  useEffect(() => {
    setProducts(availableProducts);
  }, [availableProducts]);

  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      const totalPrice = selectedProducts.reduce(
        (accumulator, product) => accumulator + product.totalPrice,
        0
      );
      setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    } else {
      setTotalPrice(0);
    }
  }, [selectedProducts]);

  useEffect(() => {
    if (newSelectedProduct) {
      const itemInList = selectedProducts?.find(
        (product) => product.id === newSelectedProduct.id
      );

      if (!itemInList) {
        setSelectedProducts((prevArray) => [...prevArray, newSelectedProduct]);
      } else {
        const newDesiredQuantity =
          newSelectedProduct?.desiredQuantity + itemInList?.desiredQuantity;

        setIsQuantityAllowed(newDesiredQuantity <= itemInList?.maxAmount);

        const updatedSelectedProducts = modifyObjectInArray(
          selectedProducts,
          newSelectedProduct?.id,
          {
            desiredQuantity: isQuantityAllowed
              ? newDesiredQuantity
              : newSelectedProduct?.maxAmount,
          }
        );
        setSelectedProducts(updatedSelectedProducts);
      }
    }
  }, [newSelectedProduct]);

  const onSelectProduct = (product: Product, quantity: number) => {
    setIsQuantityAllowed(quantity <= product.maxAmount);
    if (selectedProducts?.length) {
      const itemInList = selectedProducts.find((p) => p.id === product.id);

      if (itemInList) {
        setIsQuantityAllowed(
          itemInList?.desiredQuantity + quantity <= product.maxAmount
        );
      }
    }
    // first check if id matches with one of the time, compare quantity
  };

  // move to utils file
  const modifyObjectInArray = (
    array: SelectedProduct[],
    idToModify: UUID,
    updatedProperties: any
  ): SelectedProduct[] => {
    const index = array.findIndex((element) => element.id === idToModify);

    if (index !== -1) {
      const updatedArray = [
        ...array.slice(0, index),
        {
          ...array[index],
          ...updatedProperties,
        },
        ...array.slice(index + 1),
      ];

      return updatedArray;
    }

    return array;
  };

  const handleProductDeletion = (products: SelectedProduct[] | []) => {
    setSelectedProducts(products);
    onDeleteProducts(products);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 space-y-4">
      <AddToCart
        products={products}
        onAddProductToCart={onEmitAddProductToCart}
        onSelectProduct={onSelectProduct}
        isMaxProductTypeReached={selectedProducts.length >= 10}
        isQuantityAllowed={isQuantityAllowed || selectedProducts.length >= 10}
      ></AddToCart>

      <ProductsTable
        products={selectedProducts}
        onDeleteRows={handleProductDeletion}
        onQuantityUpdate={onQuantityUpdate}
      ></ProductsTable>

      <div className="flex justify-end items-center w-full space-x-3">
        <div className="w-1/3">
          <ProgressBar progress={selectedProducts.length * 10} maxValue={10} />
        </div>
        <ConfirmCart
          disabled={!totalPrice || !products}
          label="Confirm Purchase"
          totalPrice={totalPrice}
          onClick={handleConfirmOrder}
        />
      </div>
    </div>
  );
}
