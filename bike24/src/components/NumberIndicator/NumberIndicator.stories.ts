import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import NumberIndicator from "./NumberIndicator";

const meta: Meta<typeof NumberIndicator> = {
  title: "Components/NumberIndicator",
  component: NumberIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberIndicator>;

export const Primary: Story = {
  args: {
    value: 5,
  },
};
