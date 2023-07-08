import type { Meta, StoryObj } from "@storybook/react";
import OrderConfirmation from "./OrderConfirmation";

const meta: Meta<typeof OrderConfirmation> = {
  title: "Components/OrderConfirmation",
  component: OrderConfirmation,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderConfirmation>;

export const Primary: Story = {
  args: {
    orderNumber: 637395,
    totalPrice: 839403,
    selectedProducts: [
      {
        id: "2fdc8b4e-8920-11ec-aadd-cbe09129765b",
        productName: "T-Shirt",
        maxAmount: 2,
        taxRate: 19,
        price: 9.95,
        desiredQuantity: 2,
        totalPrice: 19.9,
      },
      {
        id: "207dcb54-8920-11ec-876b-2346543311ec",
        productName: "Bike",
        maxAmount: 12,
        desiredQuantity: 5,
        taxRate: 19,
        price: 999,
        totalPrice: 4995,
      },
      {
        id: "1a2c79e4-8920-11ec-bd2d-7b195ee0d8a9",
        productName: "E-Bike",
        maxAmount: 12,
        taxRate: 19,
        price: 4999.95,
        desiredQuantity: 5,
        totalPrice: 24999.75,
      },
    ],
  },
};
