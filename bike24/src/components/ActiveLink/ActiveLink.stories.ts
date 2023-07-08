import type { Meta, StoryObj } from "@storybook/react";
import ActiveLink from "./ActiveLink";

const meta: Meta<typeof ActiveLink> = {
  title: "Components/ActiveLink",
  component: ActiveLink,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActiveLink>;

export const Unactive: Story = {
  args: {
    href: "/orders",
    children: "My Orders",
  },
};

export const Active: Story = {
  args: {
    children: "Products",
    href: "/",
  },
};
