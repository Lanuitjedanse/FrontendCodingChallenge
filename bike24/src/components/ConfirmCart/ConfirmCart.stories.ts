import type { Meta, StoryObj } from "@storybook/react";
import ConfirmCart from "./ConfirmCart";

const meta: Meta<typeof ConfirmCart> = {
  title: "Components/ConfirmCart",
  component: ConfirmCart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmCart>;

export const Primary: Story = {
  args: { label: "Add to Cart", totalPrice: 678940 },
};
