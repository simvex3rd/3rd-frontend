import type { Meta, StoryObj } from "@storybook/nextjs";
import { BodyBtn } from "./body-btn";

const meta = {
  title: "UI/BodyBtn",
  component: BodyBtn,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["default", "primary", "hover", "press"],
    },
  },
} satisfies Meta<typeof BodyBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    status: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    status: "primary",
  },
};

export const Hover: Story = {
  args: {
    children: "Hover",
    status: "hover",
  },
};

export const Press: Story = {
  args: {
    children: "Press",
    status: "press",
  },
};
