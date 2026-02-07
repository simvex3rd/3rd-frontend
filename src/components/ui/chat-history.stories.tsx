import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChatHistory, type Conversation } from "./chat-history";

/**
 * ChatHistory displays past conversations with search functionality and date grouping.
 *
 * ## Features
 * - Search conversations by title or preview
 * - Automatic date grouping (Today, Yesterday, This Week, Older)
 * - Delete conversations
 * - Select active conversation
 * - Empty state handling
 *
 * ## Usage
 * ```tsx
 * <ChatHistory
 *   conversations={conversations}
 *   selectedId="1"
 *   onSelect={(id) => console.log("Selected:", id)}
 *   onDelete={(id) => console.log("Deleted:", id)}
 * />
 * ```
 */

const meta = {
  title: "UI/ChatHistory",
  component: ChatHistory,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Chat history component with search functionality and date grouping. Groups conversations by Today, Yesterday, This Week, and Older.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-[600px] w-[400px] bg-white rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create conversations at specific times
function createConversation(
  id: string,
  title: string,
  preview: string,
  daysAgo: number,
  hoursAgo: number = 0
): Conversation {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - daysAgo);
  timestamp.setHours(timestamp.getHours() - hoursAgo);

  return {
    id,
    title,
    preview,
    timestamp,
  };
}

const sampleConversations: Conversation[] = [
  // Today
  createConversation(
    "1",
    "3D Model Optimization",
    "How can I optimize the performance of my Three.js scene?",
    0,
    2
  ),
  createConversation(
    "2",
    "React Three Fiber Setup",
    "Need help setting up R3F in Next.js",
    0,
    5
  ),
  // Yesterday
  createConversation(
    "3",
    "Camera Controls Issue",
    "OrbitControls not working properly with my scene",
    1,
    3
  ),
  createConversation(
    "4",
    "Lighting Best Practices",
    "What are the best practices for lighting in Three.js?",
    1,
    8
  ),
  // This week
  createConversation(
    "5",
    "Material Properties",
    "Understanding PBR materials in Three.js",
    3,
    0
  ),
  createConversation(
    "6",
    "Performance Monitoring",
    "How to monitor FPS and performance metrics?",
    4,
    0
  ),
  // Older
  createConversation(
    "7",
    "Geometry Instancing",
    "Implementing instanced rendering for multiple objects",
    10,
    0
  ),
  createConversation(
    "8",
    "Shader Programming",
    "Getting started with custom shaders in GLSL",
    15,
    0
  ),
];

/**
 * Default state with all date groups populated
 */
export const Default: Story = {
  args: {
    conversations: sampleConversations,
  },
};

/**
 * With a selected conversation highlighted
 */
export const WithSelection: Story = {
  args: {
    conversations: sampleConversations,
    selectedId: "1",
  },
};

/**
 * Only today's conversations
 */
export const TodayOnly: Story = {
  args: {
    conversations: [
      createConversation(
        "1",
        "3D Model Optimization",
        "How can I optimize the performance of my Three.js scene?",
        0,
        2
      ),
      createConversation(
        "2",
        "React Three Fiber Setup",
        "Need help setting up R3F in Next.js",
        0,
        5
      ),
      createConversation(
        "3",
        "Camera Controls Issue",
        "OrbitControls not working properly with my scene",
        0,
        8
      ),
    ],
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
 * With many conversations for scroll testing
 */
export const ManyConversations: Story = {
  args: {
    conversations: [
      ...Array.from({ length: 30 }, (_, i) =>
        createConversation(
          `conv-${i}`,
          `Conversation ${i + 1}`,
          `This is a preview of conversation ${i + 1}. It contains some sample text to show how the preview looks.`,
          Math.floor(i / 5),
          i % 5
        )
      ),
    ],
  },
};

/**
 * Long conversation titles and previews
 */
export const LongContent: Story = {
  args: {
    conversations: [
      createConversation(
        "1",
        "This is a very long conversation title that should be truncated properly to fit in the card",
        "This is an extremely long preview text that demonstrates how the component handles overflow content. It should be clamped to two lines maximum and show an ellipsis at the end when it exceeds that limit.",
        0,
        2
      ),
      createConversation("2", "Short Title", "Short preview", 0, 5),
    ],
  },
};

/**
 * Interactive example with search functionality
 */
export const WithSearch: Story = {
  args: {
    conversations: sampleConversations,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try typing in the search box to filter conversations by title or preview content.",
      },
    },
  },
};

/**
 * Responsive behavior in smaller container
 */
export const Compact: Story = {
  args: {
    conversations: sampleConversations.slice(0, 5),
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] w-[300px] bg-white rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
};
