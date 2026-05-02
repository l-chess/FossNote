import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Options } from "./Options";

const meta = {
  title: "Options",
  component: Options,
  tags: ["autodocs"],
} satisfies Meta<typeof Options>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Button label="Option 1" className="hover:bg-hover hover:dark:bg-hover-dark" />
        <Button label="Option 2" className="hover:bg-hover hover:dark:bg-hover-dark" />
      </>
    ),
  },
};
