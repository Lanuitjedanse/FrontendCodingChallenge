import type { Meta, StoryObj } from "@storybook/react";
import { AddToCart } from "./AddToCart";

const meta: Meta<typeof AddToCart> = {
  title: "Components/AddToCart",
  component: AddToCart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddToCart>;

export const Default: Story = {
  args: {
    products: [
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
      {
        id: "1e8d3093-9e5c-455e-9343-4cb90a00192b",
        productName: "Mustard - Dry, Powder",
        maxAmount: 35,
        taxRate: 7,
        price: 18.96,
      },
    ],
  },
};
