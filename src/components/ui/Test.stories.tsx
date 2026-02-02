import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const TestComponent = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
  >
    {label}
  </button>
);

const meta = {
  title: "Test/EssentialsDemo",
  component: TestComponent,
  parameters: {
    backgrounds: {
      values: [
        { name: "dark", value: "#333" },
        { name: "light", value: "#fff" },
      ],
    },
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Test Button",
  },
};
