import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Label } from "./label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "press"],
      description: "Label variant",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email",
  },
};

export const Press: Story = {
  args: {
    variant: "press",
    children: "Active Label",
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <Label variant="default">Default Label</Label>
      <Label variant="press">Press Label</Label>
    </div>
  ),
};
