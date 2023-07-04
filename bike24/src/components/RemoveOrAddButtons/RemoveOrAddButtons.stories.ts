import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import RemoveOrAddButtons from "./RemoveOrAddButtons";

const meta: Meta<typeof RemoveOrAddButtons> = {
  title: "Components/RemoveOrAddButtons",
  component: RemoveOrAddButtons,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RemoveOrAddButtons>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    quantity: 3,
    maxQuantity: 2,
  },
};
