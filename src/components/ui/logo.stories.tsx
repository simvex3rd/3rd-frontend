import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge", "xxlarge"],
      description: "Logo size",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const XLarge: Story = {
  args: {
    size: "xlarge",
  },
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-8 items-start">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small</p>
        <Logo size="small" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Medium (Default)</p>
        <Logo size="medium" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Large (Figma Size: 325×69)
        </p>
        <Logo size="large" />
      </div>
    </div>
  ),
};
