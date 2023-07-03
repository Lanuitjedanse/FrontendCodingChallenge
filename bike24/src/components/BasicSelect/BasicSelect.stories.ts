import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import BasicSelect from "./BasicSelect";

const meta: Meta<typeof BasicSelect> = {
  title: "Components/BasicSelect",
  component: BasicSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BasicSelect>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Products",
    options: [{ value: "Mountain Bike" }, { value: "City Bike" }],
  },
};
