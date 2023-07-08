"use client";
import Header from "@/components/Header/Header";
import Cart from "@/components/Cart/Cart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SelectedProduct } from "@/types/selected-product.type";
import "@/app/globals.css";
import BasicPageLayout from "@/components/BasicPageLayout/BasicPageLayout";
import { OrderConfirmationInfos } from "@/types/order-confirmation-infos";
import Product from "@/types/product.type";

interface IndexProps {
  onConfirmOrder: (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ) => void;
}

export default function Index({ onConfirmOrder }: IndexProps) {
  const [orders, setOrders] = useState<OrderConfirmationInfos[]>([]);
  const [totalProductQuantity, setTotalProductQuantity] = useState<number>(0);
  const [products, setProducts] = useState<Product[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/data/products.JSON");
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const onIncreaseQuantity = (selectedProduct: SelectedProduct) => {
    const newQuantity = selectedProduct.desiredQuantity + totalProductQuantity;
    setTotalProductQuantity(newQuantity);
  };

  const onQuantityUpdate = (
    selectedProducts: SelectedProduct[] | SelectedProduct
  ) => {
    // recalculate total quantity with new cart content
    if (Array.isArray(selectedProducts)) {
      if (selectedProducts.length === 0) {
        setTotalProductQuantity(0);
      } else {
        let quantity = 0;
        selectedProducts.forEach((product) => {
          quantity += product.desiredQuantity;
        });
        setTotalProductQuantity(quantity);
      }
    } else {
      const newQuantity = selectedProducts.desiredQuantity || 0;
      setTotalProductQuantity(newQuantity);
    }
  };

  const handleConfirmOrder = (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ): void => {
    const order = {
      selectedProducts: [...selectedProducts],
      totalPrice: totalPrice,
      totalProductQuantity,
    };

    setTotalProductQuantity(0);

    setOrders((prevArray) => [...prevArray, order]);

    const query = encodeURIComponent(JSON.stringify(order));
    router.push(`/order-infos?props=${query}`);
  };

  return (
    <BasicPageLayout router={router} quantity={totalProductQuantity}>
      {products && (
        <Cart
          availableProducts={products}
          onConfirmOrder={handleConfirmOrder}
          onAddProductToCart={onIncreaseQuantity}
          onDeleteProducts={onQuantityUpdate}
          onQuantityUpdate={onQuantityUpdate}
        ></Cart>
      )}
    </BasicPageLayout>
  );
}
