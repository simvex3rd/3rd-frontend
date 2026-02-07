import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModelCard } from "./model-card";

const meta = {
  title: "UI/ModelCard",
  component: ModelCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/%ED%95%B4%EC%BB%A4%ED%86%A4-%EB%8F%84%EC%82%AC-SIMVEX-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8?node-id=144-299",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary"],
      description: "Card style variant",
    },
    iconName: {
      control: "text",
      description: "Icon filename without extension",
    },
    modelName: {
      control: "text",
      description: "Model name",
    },
  },
} satisfies Meta<typeof ModelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    iconName: "electronics-chip",
    modelName: "기계공학",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    iconName: "electronics-chip",
    modelName: "기계공학",
  },
};

export const AllVariants: Story = {
  args: {
    iconName: "cube-3d-sphere",
    modelName: "Example Model",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <ModelCard
        variant="default"
        iconName="landing/settings"
        modelName="기계공학"
      />
      <ModelCard variant="primary" iconName="ai-line" modelName="인공지능" />
      <ModelCard
        variant="default"
        iconName="landing/chip"
        modelName="전자공학"
      />
      <ModelCard
        variant="primary"
        iconName="landing/chemistry"
        modelName="화학공학"
      />
    </div>
  ),
};
