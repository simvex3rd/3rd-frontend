import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CTAButton } from "./cta-button";

const meta = {
  title: "UI/CTAButton",
  component: CTAButton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/%ED%95%B4%EC%BB%A4%ED%86%A4-%EB%8F%84%EC%82%AC-SIMVEX-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8?node-id=90-41",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary"],
      description: "Button style variant",
    },
    disabled: {
      control: "boolean",
      description: "Disable button interaction",
    },
  },
} satisfies Meta<typeof CTAButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Get Started",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    children: "Learn More",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled",
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <CTAButton variant="primary">Primary CTA</CTAButton>
      <CTAButton variant="default">Default CTA</CTAButton>
      <CTAButton variant="primary" disabled>
        Primary Disabled
      </CTAButton>
      <CTAButton variant="default" disabled>
        Default Disabled
      </CTAButton>
    </div>
  ),
};

export const InteractiveStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">
          Hover to see shadow and color changes
        </p>
        <div className="flex gap-4">
          <CTAButton variant="primary">Hover Me</CTAButton>
          <CTAButton variant="default">Hover Me</CTAButton>
        </div>
      </div>
    </div>
  ),
};
