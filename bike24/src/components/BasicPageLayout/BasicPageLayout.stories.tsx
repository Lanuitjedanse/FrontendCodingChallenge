import type { Meta, StoryObj } from "@storybook/react";
import "../../app/globals.css";
import BasicPageLayout from "./BasicPageLayout";

const meta: Meta<typeof BasicPageLayout> = {
  title: "Components/BasicPageLayout",
  component: BasicPageLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BasicPageLayout>;

export const Primary: Story = {
  args: {},
};
