import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "./icon-button";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: "text",
      description: "Icon filename without extension",
    },
    iconSize: {
      control: "number",
      description: "Icon size in pixels (default 32 for 1920px design)",
    },
    disabled: {
      control: "boolean",
      description: "Disable button interaction",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: "ai-fill",
    iconSize: 32,
  },
};

export const Disabled: Story = {
  args: {
    iconName: "ai-fill",
    iconSize: 32,
    disabled: true,
  },
};

export const AllIconTypes: Story = {
  args: {
    iconName: "ai-fill",
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <IconButton iconName="ai-fill" />
      <IconButton iconName="ai-line" />
      <IconButton iconName="camera-lock" />
      <IconButton iconName="cube-3d-sphere" />
      <IconButton iconName="cube-focus" />
      <IconButton iconName="ruler-pencil-line" />
    </div>
  ),
};

export const InteractiveStates: Story = {
  args: {
    iconName: "ai-fill",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Hover and click to see state changes (square → rounded on hover)
        </p>
        <div className="flex gap-4">
          <IconButton iconName="ai-fill" />
          <IconButton iconName="camera-lock" />
          <IconButton iconName="cube-focus" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Disabled state</p>
        <IconButton iconName="ai-fill" disabled />
      </div>
    </div>
  ),
};
