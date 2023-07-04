import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import ConfirmCart from "./ConfirmCart";

const meta: Meta<typeof ConfirmCart> = {
  title: "Components/ConfirmCart",
  component: ConfirmCart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmCart>;

export const Primary: Story = {
  args: { totalPrice: "678940" },
};
