import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { FolderButton } from "./FolderButton";

const meta = {
  title: "FolderButton",
  component: FolderButton,
  tags: ["autodocs"],
} satisfies Meta<typeof FolderButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Folder",
    depth: 0,
    children: <Button label="File" />,
  },
};
