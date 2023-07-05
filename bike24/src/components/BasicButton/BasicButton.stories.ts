import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import { BasicButton } from "./BasicButton";

const meta: Meta<typeof BasicButton> = {
  title: "Components/Button",
  component: BasicButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BasicButton>;

export const Primary: Story = {
  args: {
    variant: "contained",
    color: "success",
    label: "Buy now",
  },
};

export const Secondary: Story = {
  args: {
    variant: "contained",
    color: "primary",
    label: "Add to cart now",
  },
};
