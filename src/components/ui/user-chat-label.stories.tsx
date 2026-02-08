import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserChatLabel } from "./user-chat-label";

const meta = {
  title: "UI/UserChatLabel",
  component: UserChatLabel,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m/SIMVEX?node-id=236-1485",
    },
  },
} satisfies Meta<typeof UserChatLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    text: "AI Assistant Chat",
  },
};

export const LongText: Story = {
  args: {
    text: "This is a longer text to test overflow behavior",
  },
};
