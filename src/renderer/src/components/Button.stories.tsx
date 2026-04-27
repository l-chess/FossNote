import type { Meta, StoryObj } from "@storybook/react-vite";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
  },
};

export const SidebarCollapse: Story = {
  args: {
    label: <TbLayoutSidebarLeftCollapseFilled />,
    className: "text-3xl text-gray-600",
  },
};

export const SidebarExpand: Story = {
  args: { label: <TbLayoutSidebarLeftExpand />, className: "text-3xl text-gray-600" },
};
