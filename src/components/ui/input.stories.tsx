import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=147-809",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "focus", "fill", "error", "success", "disable"],
      description: "Input state variant",
    },
    disabled: {
      control: "boolean",
      description: "Disable input interaction",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
};

export const Focus: Story = {
  args: {
    variant: "focus",
    placeholder: "Focused input",
  },
};

export const Fill: Story = {
  args: {
    variant: "fill",
    value: "Filled with text",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    value: "Invalid input",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    value: "Valid input",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    rightIcon: true,
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div className="grid grid-cols-2 gap-8">
        <Input variant="default" placeholder="Default" />
        <Input variant="focus" placeholder="Focus" />
        <Input variant="fill" value="Filled" />
        <Input variant="error" value="Error" />
        <Input variant="success" value="Success" />
        <Input disabled placeholder="Disabled" />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-bold">With Search Icon</h3>
        <Input placeholder="Search..." rightIcon />
      </div>
    </div>
  ),
};
