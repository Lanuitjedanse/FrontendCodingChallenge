import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import { BasicButton } from "./BasicButton";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BasicButton> = {
  title: "Components/Button",
  component: BasicButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BasicButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
