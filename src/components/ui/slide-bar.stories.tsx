import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SlideBar } from "./slide-bar";
import { useState } from "react";

const meta = {
  title: "UI/SlideBar",
  component: SlideBar,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/%ED%95%B4%EC%BB%A4%ED%86%A4-%EB%8F%84%EC%82%AC-SIMVEX-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8?node-id=160-577",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen w-full items-center justify-center p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SlideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    label: "Zoom Level",
  },
};

export const Interactive: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <div className="flex flex-col items-center gap-12">
        <SlideBar value={value} onChange={setValue} label="Zoom Level" />
        <div className="text-white">
          <p className="text-center text-2xl font-bold">
            ZOOM LEVEL: <span className="text-(--primary-cyan)">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const PartClick: Story = {
  args: {
    value: 1,
    label: "Part Click Zoom",
    variant: "part-click",
  },
};

export const PartClickInteractive: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <div className="flex flex-col items-center gap-12">
        <SlideBar
          value={value}
          onChange={setValue}
          label="Part Click Zoom Level"
          variant="part-click"
        />
        <div className="text-white">
          <p className="text-center text-2xl font-bold">
            ZOOM LEVEL: <span className="text-(--primary-cyan)">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const Comparison: Story = {
  args: {},
  render: () => {
    const [defaultValue, setDefaultValue] = useState(5);
    const [partClickValue, setPartClickValue] = useState(5);
    return (
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-sm font-medium">Default (1200px)</p>
          <SlideBar
            value={defaultValue}
            onChange={setDefaultValue}
            label="Default Zoom Level"
            variant="default"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-white text-sm font-medium">Part Click (960px)</p>
          <SlideBar
            value={partClickValue}
            onChange={setPartClickValue}
            label="Part Click Zoom Level"
            variant="part-click"
          />
        </div>
      </div>
    );
  },
};
