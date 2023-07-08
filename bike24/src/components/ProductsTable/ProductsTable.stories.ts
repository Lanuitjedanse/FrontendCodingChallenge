import type { Meta, StoryObj } from "@storybook/react";
import ProductsTable from "./ProductsTable";

const meta: Meta<typeof ProductsTable> = {
  title: "Components/ProductsTable",
  component: ProductsTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductsTable>;

export const Primary: Story = {
  args: {
    products: [
      {
        id: "2fdc8b4e-8920-11ec-aadd-cbe09129765b",
        productName: "T-Shirt",
        desiredQuantity: 2,
        maxAmount: 12,
        taxRate: 19,
        price: 9.95,
        totalPrice: 19.9,
      },
      {
        id: "207dcb54-8920-11ec-876b-2346543311ec",
        productName: "Bike",
        desiredQuantity: 12,
        maxAmount: 12,
        taxRate: 19,
        price: 999,
        totalPrice: 11988,
      },
      {
        id: "1a2c79e4-8920-11ec-bd2d-7b195ee0d8a9",
        productName: "E-Bike",
        desiredQuantity: 12,
        maxAmount: 12,
        taxRate: 19,
        price: 4999.95,
        totalPrice: 59999.4,
      },
      {
        id: "1e8d3093-9e5c-455e-9343-4cb90a00192b",
        productName: "Mustard - Dry, Powder",
        desiredQuantity: 8,
        maxAmount: 12,
        taxRate: 7,
        price: 18.96,
        totalPrice: 151.68,
      },
      {
        id: "f514dd81-770c-4e15-8454-ba3472c4087b",
        productName: "Appetizer - Asian Shrimp Roll",
        desiredQuantity: 70,
        maxAmount: 98,
        taxRate: 7,
        price: 13.29,
        totalPrice: 930.3,
      },
    ],
  },
};
