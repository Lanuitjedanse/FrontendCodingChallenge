"use client";
import { AddToCart } from "../AddToCart/AddToCart";
import Product from "../../types/product.type";
import { SelectedProduct } from "../../types/selected-product.type";
import ProductsTable from "../ProductsTable/ProductsTable";
import { useEffect, useState } from "react";
import { UUID } from "crypto";

export default function Cart() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProduct[] | []
  >([]);
  const [newSelectedProduct, setNewSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const handleSelectedProduct = (selectedProduct: SelectedProduct) => {
    setNewSelectedProduct(selectedProduct);
  };

  // emit data to parent with order infos
  const handleConfirmOrder = () => {};

  useEffect(() => {
    // replace with rest call for products.json
    const exampleProducts: Product[] = [
      {
        id: "2fdc8b4e-8920-11ec-aadd-cbe09129765b",
        productName: "T-Shirt",
        maxAmount: 2,
        taxRate: 19,
        price: 9.95,
      },
      {
        id: "207dcb54-8920-11ec-876b-2346543311ec",
        productName: "Bike",
        maxAmount: 12,
        taxRate: 19,
        price: 999,
      },
      {
        id: "1a2c79e4-8920-11ec-bd2d-7b195ee0d8a9",
        productName: "E-Bike",
        maxAmount: 12,
        taxRate: 19,
        price: 4999.95,
      },
    ];

    setProducts(exampleProducts);
  }, []);

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
