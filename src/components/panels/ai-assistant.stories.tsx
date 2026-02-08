import type { Meta, StoryObj } from "@storybook/nextjs";
import { AiAssistant } from "./ai-assistant";

const meta = {
  title: "Panels/AiAssistant",
  component: AiAssistant,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AiAssistant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "AI Assistant",
    text: "부품을 선택하면 AI가 설명을 해줍니다.\n궁금한 점을 물어보세요.",
  },
};
