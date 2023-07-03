import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import CartBadge from "./CartBadge";

const meta: Meta<typeof CartBadge> = {
  title: "Components/CartBadge",
  component: CartBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CartBadge>;

export const Primary: Story = {
  args: {
    quantity: 5,
  },
};
