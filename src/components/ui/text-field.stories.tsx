import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "./text-field";

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    success: {
      control: "text",
      description: "Success message to display",
    },
    helpText: {
      control: "text",
      description: "Default help text",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helpText: "We'll never share your email",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    value: "123",
    error: "Password must be at least 8 characters",
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Username",
    value: "john_doe",
    success: "Username is available",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Cannot edit",
    disabled: true,
    helpText: "This field is disabled",
  },
};

export const AllStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <TextField
        label="Default"
        placeholder="Enter text"
        helpText="Help text"
      />
      <TextField label="Filled" value="Some text" helpText="Help text" />
      <TextField
        label="Error"
        value="Invalid"
        error="This field has an error"
      />
      <TextField label="Success" value="Valid" success="This field is valid" />
      <TextField
        label="Disabled"
        placeholder="Disabled"
        disabled
        helpText="This is disabled"
      />
    </div>
  ),
};
