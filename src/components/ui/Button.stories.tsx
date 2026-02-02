import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const Button = ({ label }: { label: string }) => {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
      {label}
    </button>
  );
};

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
  },
};
