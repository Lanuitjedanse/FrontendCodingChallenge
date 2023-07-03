import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import QuantityIndicator from "./QuantityIndicator";

const meta: Meta<typeof QuantityIndicator> = {
  title: "Components/QuantityIndicator",
  component: QuantityIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuantityIndicator>;

export const Primary: Story = {
  args: {
    quantity: 5,
  },
};
