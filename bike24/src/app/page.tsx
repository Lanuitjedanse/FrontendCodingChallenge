// @ts-nocheck
// @useClient
"use client";
import { AddToCart } from "@/components/AddToCart/AddToCart";

import Product from "@/types/product.type";
import SelectedProduct from "@/types/selected-product.type";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProduct[] | []
  >([]);
  const [newSelectedProduct, setNewSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const handleSelectedProduct = (selectedProduct: SelectedProduct) => {
    setNewSelectedProduct(selectedProduct);
  };

  useEffect(() => {
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
    console.log("newSelectedProduct", newSelectedProduct);
    if (newSelectedProduct) {
      setSelectedProducts((prevArray) => [...prevArray, newSelectedProduct]);
    }
  }, [newSelectedProduct, setSelectedProducts]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddToCart
        products={products}
        onAddProductToCart={handleSelectedProduct}
      ></AddToCart>
      {selectedProducts.map((selectedProduct, index) => (
        <div className="flex flex-col" key={selectedProduct.id}>
          <span>{selectedProduct.product.productName}</span>
          <span>Quantity: {selectedProduct.desiredQuantity}</span>
          <span>Total Price: {selectedProduct.totalPrice}</span>
        </div>
      ))}
    </div>
  );
}
