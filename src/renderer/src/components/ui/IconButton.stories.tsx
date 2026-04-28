import type { Meta, StoryObj } from "@storybook/react-vite";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { IconButton } from "./IconButton";

const meta = {
  title: "IconButton",
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapse: Story = {
  args: {
    label: <TbLayoutSidebarLeftCollapseFilled />,
    ariaLabel: "Collapse Sidebar",
  },
};
