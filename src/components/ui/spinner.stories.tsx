import type { Meta, StoryObj } from "@storybook/nextjs";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Spinner - medium size with primary color animation
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Spinner - suitable for inline usage in buttons or text
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Medium Spinner - suitable for section loading states
 */
export const Medium: Story = {
  args: {
    size: "md",
  },
};

/**
 * Large Spinner - suitable for full-page loading states
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * Custom Color Spinner - demonstrating className override
 */
export const CustomColor: Story = {
  args: {
    size: "md",
    className: "border-neutral-600 border-t-primary-light",
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-[32px] items-center">
      <div className="flex flex-col items-center gap-[8px]">
        <Spinner size="sm" />
        <p className="text-[12px] text-neutral-400">Small (16px)</p>
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <Spinner size="md" />
        <p className="text-[12px] text-neutral-400">Medium (32px)</p>
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <Spinner size="lg" />
        <p className="text-[12px] text-neutral-400">Large (64px)</p>
      </div>
    </div>
  ),
};
