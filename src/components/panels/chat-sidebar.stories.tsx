import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChatSidebar } from "./chat-sidebar";

const meta = {
  title: "Panels/ChatSidebar",
  component: ChatSidebar,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    docs: {
      description: {
        component:
          "Chat sidebar with history list and new chat button. Figma spec: 311x879px, #404040 background, 160px gap (node-236:1535).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    conversations: {
      description: "Array of conversation objects",
    },
    onConversationSelect: {
      action: "conversation-selected",
      description: "Callback when a conversation is selected",
    },
    onNewChat: {
      action: "new-chat",
      description: "Callback when new chat button is clicked",
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    conversations: [],
  },
};

export const WithConversations: Story = {
  args: {
    conversations: [
      { id: "1", title: "엔진 조립 방법", isActive: false },
      { id: "2", title: "피스톤 분해 순서", isActive: false },
      { id: "3", title: "크랭크샤프트 설명", isActive: true },
      { id: "4", title: "실린더 헤드 교체", isActive: false },
      { id: "5", title: "타이밍 벨트 장착", isActive: false },
    ],
  },
};

export const ManyConversations: Story = {
  args: {
    conversations: [
      { id: "1", title: "엔진 조립 방법", isActive: false },
      { id: "2", title: "피스톤 분해 순서", isActive: false },
      { id: "3", title: "크랭크샤프트 설명", isActive: true },
      { id: "4", title: "실린더 헤드 교체", isActive: false },
      { id: "5", title: "타이밍 벨트 장착", isActive: false },
      { id: "6", title: "캠샤프트 위치 센서", isActive: false },
      { id: "7", title: "오일 펌프 점검", isActive: false },
      { id: "8", title: "냉각수 교환 방법", isActive: false },
      { id: "9", title: "스파크 플러그 교체", isActive: false },
      { id: "10", title: "연료 필터 점검", isActive: false },
    ],
  },
};

export const LongTitles: Story = {
  args: {
    conversations: [
      {
        id: "1",
        title:
          "엔진 블록의 실린더 보어와 피스톤 링 간격 측정 방법에 대한 상세 설명",
        isActive: false,
      },
      {
        id: "2",
        title: "크랭크샤프트 베어링 클리어런스 검사 및 조정 절차",
        isActive: true,
      },
      {
        id: "3",
        title: "밸브 타이밍 조정과 캠샤프트 설치 시 주의사항",
        isActive: false,
      },
    ],
  },
};

export const SingleActive: Story = {
  args: {
    conversations: [{ id: "1", title: "현재 대화", isActive: true }],
  },
};

export const Interactive: Story = {
  args: {
    conversations: [
      { id: "1", title: "엔진 조립 방법", isActive: false },
      { id: "2", title: "피스톤 분해 순서", isActive: false },
      { id: "3", title: "크랭크샤프트 설명", isActive: true },
    ],
    onConversationSelect: (id: string) => {
      console.log("Selected conversation:", id);
    },
    onNewChat: () => {
      console.log("New chat clicked");
    },
  },
};
