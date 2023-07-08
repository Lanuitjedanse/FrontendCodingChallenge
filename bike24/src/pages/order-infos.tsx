import "@/app/globals.css";
import { BasicButton } from "@/components/BasicButton/BasicButton";
import BasicPageLayout from "@/components/BasicPageLayout/BasicPageLayout";
import OrderConfirmation from "@/components/OrderConfirmation/OrderConfirmation";
import { OrderConfirmationInfos } from "@/types/order-confirmation-infos";
import { SelectedProduct } from "@/types/selected-product.type";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderInfos() {
  const [order, setOrder] = useState<OrderConfirmationInfos | null>(null);

  const [productsTotalQuantity, setProductsTotalQuantity] = useState<number>(0);
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/");
  };
  useEffect(() => {
    const { props } = router.query;
    let quantity = 0;
    let receivedProps;
    receivedProps = JSON.parse(decodeURIComponent(props as string));

    receivedProps?.selectedProducts?.forEach((product: SelectedProduct) => {
      quantity += product.desiredQuantity;
    });
    setProductsTotalQuantity(quantity);
    const orderInfos: OrderConfirmationInfos = {
      selectedProducts: receivedProps?.selectedProducts,
      totalPrice: receivedProps?.totalPrice,
      totalProductQuantity: productsTotalQuantity,
    };

    setOrder(orderInfos);
  }, [router.query]);
  return (
    <div>
      <BasicPageLayout router={router} quantity={0}>
        <div className="flex flex-col items-center min-h-screen min-w-full justify-center">
          {order && (
            <OrderConfirmation
              totalProductQuantity={productsTotalQuantity}
              selectedProducts={order?.selectedProducts}
              totalPrice={order.totalPrice}
            />
          )}
        </div>
      </BasicPageLayout>
    </div>
  );
}
