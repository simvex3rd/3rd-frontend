import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HelpMessage } from "./help-message";

const meta = {
  title: "UI/HelpMessage",
  component: HelpMessage,
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
      options: ["default", "success", "error"],
      description: "Message type variant",
    },
  },
} satisfies Meta<typeof HelpMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a hint message",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Input is valid",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "This field is required",
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-2">
      <HelpMessage variant="default">This is a hint message</HelpMessage>
      <HelpMessage variant="success">Input is valid</HelpMessage>
      <HelpMessage variant="error">This field is required</HelpMessage>
    </div>
  ),
};
