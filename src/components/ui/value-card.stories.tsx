import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ValueCard } from "./value-card";

const meta = {
  title: "UI/ValueCard",
  component: ValueCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/%ED%95%B4%EC%BB%A4%ED%86%A4-%EB%8F%84%EC%82%AC-SIMVEX-%EC%9B%B9%EB%94%94%EC%9E%90%EC%9D%B8?node-id=144-277",
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
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Card description",
    },
  },
} satisfies Meta<typeof ValueCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    iconName: "ai-fill",
    title: "AI-Powered Simulation",
    description:
      "Advanced artificial intelligence technology enables realistic and accurate simulations of complex systems.",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    iconName: "cube-3d-sphere",
    title: "3D Visualization",
    description:
      "Immersive three-dimensional visualization helps you understand complex data and relationships at a glance.",
  },
};

export const AllVariants: Story = {
  args: {
    iconName: "ai-fill",
    title: "Example Title",
    description: "Example description",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 p-12 bg-[#090909]">
      <ValueCard
        variant="default"
        iconName="landing/box-3d-stroke"
        title="3D Modeling"
        description="전략적 시각화를 위한 정밀한 3D 모델링 환경을 제공하여 설계의 정확도를 높입니다."
      />
      <ValueCard
        variant="primary"
        iconName="landing/chart-line"
        title="Data Analytics"
        description="실시간 데이터 분석을 통해 복잡한 시뮬레이션 결과를 직관적으로 이해할 수 있습니다."
      />
      <ValueCard
        variant="default"
        iconName="ai-fill"
        title="AI Integration"
        description="최신 AI 알고리즘을 결합하여 자율적이고 스마트한 모델링 예측이 가능합니다."
      />
      <ValueCard
        variant="primary"
        iconName="landing/space-rocket"
        title="Turbo Performance"
        description="고성능 컴퓨팅 최적화로 대규모 시뮬레이션도 중단 없이 신속하게 처리합니다."
      />
    </div>
  ),
};

export const InteractiveStates: Story = {
  args: {
    iconName: "ai-fill",
    title: "Interactive Example",
    description: "Hover to see effects",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Hover to see shadow and lift effect
      </p>
      <ValueCard
        variant="default"
        iconName="ai-fill"
        title="Hover Me"
        description="This card responds to user interaction with smooth transitions."
      />
    </div>
  ),
};
