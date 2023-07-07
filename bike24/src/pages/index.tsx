"use client";
import Header from "@/components/Header/Header";
import Cart from "@/components/Cart/Cart";
import { useRouter } from "next/router";
import { useState } from "react";
import { SelectedProduct } from "@/types/selected-product.type";
import "@/app/globals.css";
import BasicPageLayout from "@/components/BasicPageLayout/BasicPageLayout";

interface IndexProps {
  totalProductQuantity: number;
  totalPrice: number;
  selectedProducts: SelectedProduct[];
  onConfirmOrder: (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ) => void;
}
export default function Index({
  totalProductQuantity,
  onConfirmOrder,
}: IndexProps) {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const handleConfirmOrder = (
    selectedProducts: SelectedProduct[],
    totalPrice: number
  ): void => {
    const propsToPass = {
      selectedProducts: [...selectedProducts],
      totalPrice: totalPrice,
    };
    const query = encodeURIComponent(JSON.stringify(propsToPass));
    router.push(`/order-infos?props=${query}`);
  };

  return (
    <BasicPageLayout router={router} quantity={totalProductQuantity}>
      <Cart
        availableProducts={[
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
        ]}
        onConfirmOrder={onConfirmOrder}
      ></Cart>
    </BasicPageLayout>
  );
}
