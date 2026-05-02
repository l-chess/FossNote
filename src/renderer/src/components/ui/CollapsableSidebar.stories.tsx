import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { CollapsableSidebar } from "./CollapsableSidebar";

const meta = {
  title: "CollapsableSidebar",
  component: CollapsableSidebar,
  tags: ["autodocs"],
} satisfies Meta<typeof CollapsableSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collapsed: false,
    children: (
      <>
        <Button label="Child 1" /> <Button label="Child 2" /> <Button label="Child 3" />
      </>
    ),
    borderRight: true,
  },
};
