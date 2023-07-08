import type { Meta, StoryObj } from "@storybook/react";
import StepSlider from "./StepSlider";

const meta: Meta<typeof StepSlider> = {
  title: "Components/StepSlider",
  component: StepSlider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StepSlider>;

export const Primary: Story = {
  args: {
    defaultValue: 0,
    size: "small",
    min: 0,
    max: 10,
    step: 1,
  },
};
