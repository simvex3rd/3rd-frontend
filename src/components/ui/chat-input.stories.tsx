import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChatInput } from "./chat-input";
import { LucideArrowUp, LucideMic } from "lucide-react";
import { useState } from "react";

const meta = {
  title: "UI/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line chat input with send button. Supports Enter to send (Shift+Enter for new line), character counter, and custom send icons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "focus", "error", "success", "disable"],
      description: "Visual state of the input",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
    showCounter: {
      control: "boolean",
      description: "Show character counter",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type a message...",
  },
};

export const WithCounter: Story = {
  args: {
    placeholder: "Type a message...",
    showCounter: true,
    maxLength: 500,
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    placeholder: "Type a message...",
    value: "Message too long!",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    placeholder: "Type a message...",
    value: "Message sent successfully",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Type a message...",
  },
};

export const CustomSendIcon: Story = {
  args: {
    placeholder: "Type a message...",
    sendIcon: LucideArrowUp,
  },
};

export const VoiceInput: Story = {
  args: {
    placeholder: "Type or record a message...",
    sendIcon: LucideMic,
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: "Type a message (max 100 chars)...",
    maxLength: 100,
    showCounter: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSend = () => {
      if (value.trim()) {
        setMessages([...messages, value]);
        setValue("");
      }
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 min-h-[200px]">
          {messages.length === 0 ? (
            <p className="text-neutral-500 text-sm text-center py-8">
              No messages yet. Type something and press send!
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className="rounded-lg bg-primary text-white px-3 py-2 max-w-[80%] ml-auto"
              >
                {msg}
              </div>
            ))
          )}
        </div>
        <ChatInput
          placeholder="Type a message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSend={handleSend}
          showCounter
          maxLength={500}
        />
        <p className="text-xs text-neutral-500">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <ChatInput placeholder="Type a message..." />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Focus</p>
        <ChatInput variant="focus" placeholder="Type a message..." />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Error</p>
        <ChatInput
          variant="error"
          placeholder="Type a message..."
          value="Invalid message"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Success</p>
        <ChatInput
          variant="success"
          placeholder="Type a message..."
          value="Message sent"
        />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Disabled</p>
        <ChatInput disabled placeholder="Type a message..." />
      </div>
    </div>
  ),
};

export const LongMessage: Story = {
  args: {
    placeholder: "Type a long message...",
    value:
      "This is a longer message that spans multiple lines to demonstrate how the textarea expands when content exceeds a single line.",
    showCounter: true,
    maxLength: 500,
  },
};

export const NearMaxLength: Story = {
  args: {
    placeholder: "Type a message...",
    value: "A".repeat(95),
    maxLength: 100,
    showCounter: true,
  },
};
