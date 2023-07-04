import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
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
        name: "T-Shirt",
        quantity: 2,
        maxQuantity: 12,
        taxRate: 19,
        unitPrice: 9.95,
      },
      {
        id: "207dcb54-8920-11ec-876b-2346543311ec",
        name: "Bike",
        quantity: 12,
        maxQuantity: 12,
        taxRate: 19,
        unitPrice: 999,
      },
      {
        id: "1a2c79e4-8920-11ec-bd2d-7b195ee0d8a9",
        name: "E-Bike",
        quantity: 12,
        maxQuantity: 12,
        taxRate: 19,
        unitPrice: 4999.95,
      },
      {
        id: "1e8d3093-9e5c-455e-9343-4cb90a00192b",
        name: "Mustard - Dry, Powder",
        quantity: 8,
        maxQuantity: 12,
        taxRate: 7,
        unitPrice: 18.96,
      },
      {
        id: "f514dd81-770c-4e15-8454-ba3472c4087b",
        name: "Appetizer - Asian Shrimp Roll",
        quantity: 70,
        maxQuantity: 98,
        taxRate: 7,
        unitPrice: 13.29,
      },
    ],
  },
};
