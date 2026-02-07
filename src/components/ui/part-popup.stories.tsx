import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartPopup } from "./part-popup";

const meta = {
  title: "UI/PartPopup",
  component: PartPopup,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "highlight"],
      description: "Visual variant",
    },
    text: {
      control: "text",
      description: "Question text",
    },
    onConfirm: {
      action: "confirmed",
      description: "YES button click handler",
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    docs: {
      description: {
        component:
          "Tooltip-style popup with question and YES button. 3-corner border radius (말풍선 형태). Figma spec: 272x78px (node-236:1141).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PartPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "분해 순서에 대한 힌트가 필요하신가요?",
  },
};

export const Highlight: Story = {
  args: {
    variant: "highlight",
    text: "분해 순서에 대한 힌트가 필요하신가요?",
  },
};

export const ShortQuestion: Story = {
  args: {
    text: "도움이 필요하신가요?",
  },
};

export const LongQuestion: Story = {
  args: {
    text: "이 부품의 분해 순서와 조립 방법에 대한 자세한 설명이 필요하신가요?",
  },
};

export const Interactive: Story = {
  args: {
    text: "분해 순서에 대한 힌트가 필요하신가요?",
    onConfirm: () => alert("YES 버튼이 클릭되었습니다!"),
  },
};
