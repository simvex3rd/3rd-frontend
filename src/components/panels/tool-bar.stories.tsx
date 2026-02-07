import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToolBar } from "./tool-bar";

const meta = {
  title: "Panels/ToolBar",
  component: ToolBar,
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
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
  },
} satisfies Meta<typeof ToolBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const horizontalTools = [
  {
    iconName: "cube-focus",
    onClick: () => console.log("Focus"),
    label: "Focus View",
  },
  {
    iconName: "cube-3d-sphere",
    onClick: () => console.log("3D"),
    label: "3D Perspective",
  },
  {
    iconName: "camera-lock",
    onClick: () => console.log("Camera"),
    label: "Lock Camera",
  },
  {
    iconName: "ruler-pencil-line",
    onClick: () => console.log("Measure"),
    label: "Measurement Tool",
  },
];

const verticalTools = [
  {
    iconName: "ai-line",
    onClick: () => console.log("AI"),
    label: "AI Generation",
  },
  {
    iconName: "tag-search-24",
    onClick: () => console.log("Search"),
    label: "Tag Search",
  },
];

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    tools: horizontalTools,
  },
};

export const Vertical: Story = {
  args: {
    variant: "vertical",
    tools: verticalTools,
  },
};

export const WithDisabled: Story = {
  args: {
    variant: "horizontal",
    tools: [
      { iconName: "ai-line", onClick: () => {}, label: "AI Tool" },
      {
        iconName: "camera-lock",
        onClick: () => {},
        label: "Camera",
        disabled: true,
      },
      { iconName: "cube-3d-sphere", onClick: () => {}, label: "3D View" },
    ],
  },
};

export const InteractiveTooltips: Story = {
  args: {
    variant: "horizontal",
    tools: horizontalTools,
  },
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm text-muted-foreground">
          Hover over icons to see tooltips
        </p>
        <ToolBar {...args} />
      </div>
    </div>
  ),
};
