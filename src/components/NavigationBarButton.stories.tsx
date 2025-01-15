import type { Meta, StoryObj } from "@storybook/react";

import { NavigationBarButton } from "./NavigationBarButton";

const meta = {
  component: NavigationBarButton,
} satisfies Meta<typeof NavigationBarButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    href: "/",
    className: "",
  },
};
