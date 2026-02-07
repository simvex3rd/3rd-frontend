import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";
import { Plus, Minus } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
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
      options: ["fill", "outline"],
      description: "Button style variant",
    },
    disabled: {
      control: "boolean",
      description: "Disable button interaction",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const DisabledFill: Story = {
  args: {
    variant: "fill",
    disabled: true,
    children: "Button",
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: "outline",
    disabled: true,
    children: "Button",
  },
};

export const WithIcons: Story = {
  args: {
    children: "Button",
    leadingIcon: Plus,
    trailingIcon: Minus,
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-4">
        <Button variant="fill">Fill</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="fill" disabled>
          Fill Disabled
        </Button>
        <Button variant="outline" disabled>
          Outline Disabled
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-bold">With Icons</h3>
        <div className="flex gap-4">
          <Button variant="fill" leadingIcon={Plus}>
            시작하기
          </Button>
          <Button variant="outline" trailingIcon={Minus}>
            그만두기
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Hover and click to see state changes
        </p>
        <div className="flex gap-4">
          <Button variant="fill">Hover Me</Button>
          <Button variant="outline">Hover Me</Button>
        </div>
      </div>
    </div>
  ),
};
