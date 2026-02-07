import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatSidebar } from "./chat-sidebar";

const meta = {
  title: "Panels/ChatSidebar",
  component: ChatSidebar,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1a1a1a" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onConversationSelect: { action: "conversation selected" },
    onNewChat: { action: "new chat clicked" },
  },
} satisfies Meta<typeof ChatSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleConversations = [
  {
    id: "1",
    title: "How to optimize Three.js performance?",
    timestamp: "2024-01-15 14:30",
    isActive: false,
  },
  {
    id: "2",
    title: "React Three Fiber best practices",
    timestamp: "2024-01-15 15:45",
    isActive: true,
  },
  {
    id: "3",
    title: "3D model loading strategies",
    timestamp: "2024-01-14 10:20",
    isActive: false,
  },
  {
    id: "4",
    title: "Shader materials guide",
    timestamp: "2024-01-14 09:15",
    isActive: false,
  },
  {
    id: "5",
    title: "Camera controls implementation",
    timestamp: "2024-01-13 16:40",
    isActive: false,
  },
];

/**
 * Default chat sidebar with conversation history
 */
export const Default: Story = {
  args: {
    conversations: sampleConversations,
  },
};

/**
 * Empty state when no conversations exist
 */
export const Empty: Story = {
  args: {
    conversations: [],
  },
};

/**
 * Sidebar with only one conversation
 */
export const SingleConversation: Story = {
  args: {
    conversations: [
      {
        id: "1",
        title: "First conversation",
        timestamp: "2024-01-15 14:30",
        isActive: true,
      },
    ],
  },
};

/**
 * Sidebar with many conversations (scrollable)
 */
export const ManyConversations: Story = {
  args: {
    conversations: [
      ...sampleConversations,
      {
        id: "6",
        title: "Lighting setup in R3F",
        timestamp: "2024-01-12 11:30",
        isActive: false,
      },
      {
        id: "7",
        title: "Physics simulation with Rapier",
        timestamp: "2024-01-11 13:20",
        isActive: false,
      },
      {
        id: "8",
        title: "Post-processing effects",
        timestamp: "2024-01-10 15:50",
        isActive: false,
      },
      {
        id: "9",
        title: "Instancing for performance",
        timestamp: "2024-01-09 09:40",
        isActive: false,
      },
      {
        id: "10",
        title: "Custom geometry creation",
        timestamp: "2024-01-08 14:15",
        isActive: false,
      },
    ],
  },
};

/**
 * Sidebar with long conversation titles (truncated)
 */
export const LongTitles: Story = {
  args: {
    conversations: [
      {
        id: "1",
        title:
          "This is a very long conversation title that should be truncated with ellipsis",
        timestamp: "2024-01-15 14:30",
        isActive: false,
      },
      {
        id: "2",
        title:
          "Another extremely long title that demonstrates how the component handles overflow text gracefully",
        timestamp: "2024-01-15 15:45",
        isActive: true,
      },
      {
        id: "3",
        title: "Short title",
        timestamp: "2024-01-14 10:20",
        isActive: false,
      },
    ],
  },
};

/**
 * Interactive example with callbacks
 */
export const Interactive: Story = {
  args: {
    conversations: sampleConversations,
  },
  render: (args) => {
    return <ChatSidebar {...args} />;
  },
};
