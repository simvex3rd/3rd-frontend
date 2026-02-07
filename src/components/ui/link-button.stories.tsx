import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkButton } from "./link-button";

const meta = {
  title: "UI/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Link destination URL",
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Link Button",
  },
};

export const InteractiveState: Story = {
  args: {
    href: "#",
    children: "Hover Me",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Hover to see underline effect
      </p>
      <LinkButton {...args} />
    </div>
  ),
};
