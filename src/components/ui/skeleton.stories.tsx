import type { Meta, StoryObj } from "@storybook/nextjs";
import { Skeleton, SkeletonGroup } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "card", "avatar"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Skeleton - text line placeholder
 */
export const Default: Story = {
  args: {
    variant: "text",
  },
  render: (args) => <Skeleton {...args} className="w-[300px]" />,
};

/**
 * Text Skeleton - single line text placeholder
 */
export const Text: Story = {
  args: {
    variant: "text",
  },
  render: (args) => <Skeleton {...args} className="w-[300px]" />,
};

/**
 * Card Skeleton - model card placeholder (332.8×241px)
 */
export const Card: Story = {
  args: {
    variant: "card",
  },
};

/**
 * Avatar Skeleton - circular avatar placeholder
 */
export const Avatar: Story = {
  args: {
    variant: "avatar",
  },
};

/**
 * Multiple text lines simulating paragraph loading
 */
export const Paragraph: Story = {
  render: () => (
    <SkeletonGroup className="w-[300px]">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-[90%]" />
      <Skeleton variant="text" className="w-[80%]" />
    </SkeletonGroup>
  ),
};

/**
 * Model card with header and content skeleton
 */
export const CardWithContent: Story = {
  render: () => (
    <div className="flex flex-col gap-[16px]">
      <Skeleton variant="card" />
      <div className="w-[332.8px] space-y-[8px]">
        <Skeleton variant="text" className="h-[20px]" />
        <Skeleton variant="text" className="h-[16px] w-[80%]" />
      </div>
    </div>
  ),
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-[32px]">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-neutral-400">Text Skeleton</p>
        <Skeleton variant="text" className="w-[300px]" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-neutral-400">Avatar Skeleton</p>
        <Skeleton variant="avatar" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-neutral-400">Card Skeleton</p>
        <Skeleton variant="card" />
      </div>
    </div>
  ),
};
