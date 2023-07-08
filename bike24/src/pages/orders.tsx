import "@/app/globals.css";
import { BasicButton } from "@/components/BasicButton/BasicButton";
import BasicPageLayout from "@/components/BasicPageLayout/BasicPageLayout";
import { OrderConfirmationInfos } from "@/types/order-confirmation-infos";
import { SelectedProduct } from "@/types/selected-product.type";
import { useRouter } from "next/router";
import { useState } from "react";

interface OrdersProps {
  selectedProducts: SelectedProduct[];
  orders: OrderConfirmationInfos;
}

export default function Orders({ orders, selectedProducts }: OrdersProps) {
  const [productsTotalQuantity, setProductsTotalQuantity] = useState<number>(0);
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div>
      <BasicPageLayout router={router} quantity={productsTotalQuantity}>
        <BasicButton onClick={handleGoBack} label="Go to Home"></BasicButton>
      </BasicPageLayout>
    </div>
  );
}
