"use client";
import { AddToCart } from "../AddToCart/AddToCart";
import Product from "../../types/product.type";
import { SelectedProduct } from "../../types/selected-product.type";
import ProductsTable from "../ProductsTable/ProductsTable";
import { useEffect, useState } from "react";
import { UUID } from "crypto";

interface CartProps {
  availableProducts: Product[];
  onConfirmOrder: (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ) => void;
}

export default function Cart({ availableProducts, onConfirmOrder }: CartProps) {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProduct[] | []
  >([]);
  const [newSelectedProduct, setNewSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const handleSelectedProduct = (selectedProduct: SelectedProduct) => {
    setNewSelectedProduct(selectedProduct);
  };

  const handleConfirmOrder = (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ) => {
    onConfirmOrder(selectedProducts, totalPrice);
    setSelectedProducts([]);
  };

  useEffect(() => {
    setProducts(availableProducts);
  }, [availableProducts]);

  useEffect(() => {
    if (newSelectedProduct) {
      const itemInList = selectedProducts.find(
        (product) => product.id === newSelectedProduct.id
      );

      if (!itemInList) {
        setSelectedProducts((prevArray) => [...prevArray, newSelectedProduct]);
      } else {
        const newDesiredQuantity =
          newSelectedProduct?.desiredQuantity + itemInList?.desiredQuantity;

        const isNewDesiredQuantityLowerThanMaxQuantity =
          newDesiredQuantity < itemInList?.maxAmount;

        const updatedSelectedProducts = modifyObjectInArray(
          selectedProducts,
          newSelectedProduct?.id,
          {
            desiredQuantity: isNewDesiredQuantityLowerThanMaxQuantity
              ? newDesiredQuantity
              : newSelectedProduct?.maxAmount,
          }
        );
        setSelectedProducts(updatedSelectedProducts);
      }
    }
  }, [newSelectedProduct]);

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
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddToCart
        products={products}
        onAddProductToCart={handleSelectedProduct}
      ></AddToCart>

      <ProductsTable
        products={selectedProducts}
        onDeleteRows={handleProductDeletion}
        onConfirmOrder={handleConfirmOrder}
      ></ProductsTable>
    </div>
  );
}
