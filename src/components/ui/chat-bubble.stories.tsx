import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChatBubble } from "./chat-bubble";

const meta = {
  title: "UI/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["user", "ai"],
      description:
        "Chat bubble variant (user: right-aligned, ai: left-aligned)",
    },
    avatar: {
      control: "text",
      description: "Avatar image URL",
    },
    timestamp: {
      control: "text",
      description: "Message timestamp",
    },
    children: {
      control: "text",
      description: "Message content",
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    variant: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    timestamp: "2:30 PM",
    children: "Hello! Can you help me with the simulation?",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const AIMessage: Story = {
  args: {
    variant: "ai",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
    timestamp: "2:31 PM",
    children:
      "Of course! I'd be happy to assist you with your simulation. What would you like to know?",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const UserWithoutAvatar: Story = {
  args: {
    variant: "user",
    timestamp: "2:32 PM",
    children: "How do I adjust the camera angle?",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const AIWithoutAvatar: Story = {
  args: {
    variant: "ai",
    timestamp: "2:33 PM",
    children:
      "You can use the orbit controls to rotate the camera. Click and drag to rotate, scroll to zoom.",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const LongMessage: Story = {
  args: {
    variant: "ai",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AI",
    timestamp: "2:34 PM",
    children:
      "Here are the steps to optimize your simulation: 1. Check your mesh complexity and reduce polygons if needed. 2. Use instancing for repeated objects. 3. Enable frustum culling to avoid rendering off-screen objects. 4. Consider using LOD (Level of Detail) for distant objects. 5. Profile your application to identify bottlenecks.",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutTimestamp: Story = {
  args: {
    variant: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    children: "Thanks for the help!",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export const Conversation: Story = {
  render: () => (
    <div className="w-[700px] flex flex-col gap-4 p-4 bg-neutral-950 rounded-lg">
      <ChatBubble
        variant="user"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        timestamp="2:30 PM"
      >
        Hello! Can you help me with the simulation?
      </ChatBubble>

      <ChatBubble
        variant="ai"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
        timestamp="2:31 PM"
      >
        Of course! I&apos;d be happy to assist you with your simulation. What
        would you like to know?
      </ChatBubble>

      <ChatBubble
        variant="user"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        timestamp="2:32 PM"
      >
        How do I adjust the camera angle?
      </ChatBubble>

      <ChatBubble
        variant="ai"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
        timestamp="2:33 PM"
      >
        You can use the orbit controls to rotate the camera. Click and drag to
        rotate, scroll to zoom, and right-click drag to pan.
      </ChatBubble>

      <ChatBubble
        variant="user"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        timestamp="2:34 PM"
      >
        Perfect, thanks!
      </ChatBubble>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[700px] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">User Messages</h3>
        <div className="flex flex-col gap-4">
          <ChatBubble
            variant="user"
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            timestamp="2:30 PM"
          >
            Short message
          </ChatBubble>
          <ChatBubble
            variant="user"
            avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            timestamp="2:31 PM"
          >
            This is a much longer message that demonstrates how the chat bubble
            handles text wrapping and maintains proper formatting even with
            extended content.
          </ChatBubble>
          <ChatBubble variant="user" timestamp="2:32 PM">
            Without avatar
          </ChatBubble>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">AI Messages</h3>
        <div className="flex flex-col gap-4">
          <ChatBubble
            variant="ai"
            avatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
            timestamp="2:33 PM"
          >
            Short response
          </ChatBubble>
          <ChatBubble
            variant="ai"
            avatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
            timestamp="2:34 PM"
          >
            This is a detailed AI response that provides comprehensive
            information and demonstrates how the component handles longer text
            content with proper formatting and readability.
          </ChatBubble>
          <ChatBubble variant="ai" timestamp="2:35 PM">
            Without avatar
          </ChatBubble>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="w-full max-w-[900px] flex flex-col gap-4 p-4">
      <p className="text-sm text-neutral-500">
        Resize the viewport to see how chat bubbles adapt to different screen
        sizes (max-width: 70%)
      </p>
      <ChatBubble
        variant="user"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        timestamp="2:30 PM"
      >
        This message will maintain a maximum width of 70% of the container
      </ChatBubble>
      <ChatBubble
        variant="ai"
        avatar="https://api.dicebear.com/7.x/bottts/svg?seed=AI"
        timestamp="2:31 PM"
      >
        The chat bubbles are responsive and will adapt to different screen sizes
        while maintaining readability and proper spacing.
      </ChatBubble>
    </div>
  ),
};
