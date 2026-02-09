import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChatInterface } from "./ChatInterface";

/**
 * ChatInterface - Fixed right panel with collapsible chat functionality.
 *
 * ## Design Specs (Figma)
 * - Width: 442px (expanded), 80px (collapsed)
 * - Height: Full viewport
 * - Background: rgba(64,64,64,0.7) with backdrop blur
 * - Border radius: 24px (left side only)
 * - Header height: 67px
 * - User bubble: rgba(2,238,225,0.3), rounded-bl-none
 * - AI bubble: rgba(1,169,160,0.3), rounded-br-none
 *
 * ## Features
 * - Collapsible panel with toggle button
 * - Auto-scroll to latest message
 * - Markdown support for AI responses
 * - Glassmorphic design
 * - Fixed positioning on right side
 *
 * @component
 */
const meta = {
  title: "Panels/ChatInterface",
  component: ChatInterface,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Chat interface panel with glassmorphic design. Features collapsible layout, markdown rendering, and auto-scrolling messages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Initial open/collapsed state",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    onSend: {
      action: "sent",
      description: "Callback when message is sent",
    },
    initialMessages: {
      control: "object",
      description: "Initial messages to display",
    },
  },
} satisfies Meta<typeof ChatInterface>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty chat interface ready for user input.
 */
export const Default: Story = {
  args: {
    defaultOpen: true,
  },
};

/**
 * Collapsed state showing only the header bar.
 */
export const Collapsed: Story = {
  args: {
    defaultOpen: false,
  },
};

/**
 * Chat with conversation history showing both user and AI messages.
 */
export const WithMessages: Story = {
  args: {
    defaultOpen: true,
    initialMessages: [
      {
        id: "1",
        role: "user",
        content: "이 시뮬레이션 모델에서 어떤 물리 법칙이 적용되나요?",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "이 시뮬레이션 모델에는 **뉴턴의 운동 법칙**과 **중력**이 적용됩니다.\n\n주요 물리 법칙:\n- 뉴턴 제2법칙: $F = ma$\n- 중력 가속도: $g = 9.8 \\, \\text{m/s}^2$\n- 마찰력: $f = \\mu N$\n\n운동 에너지 공식:\n\n$$E_k = \\frac{1}{2}mv^2$$",
        timestamp: new Date(Date.now() - 9 * 60 * 1000),
      },
      {
        id: "3",
        role: "user",
        content: "마찰계수는 어떻게 변경할 수 있나요?",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: "4",
        role: "assistant",
        content:
          "마찰계수는 **파라미터 패널**에서 조정할 수 있습니다.\n\n### 변경 방법\n1. 왼쪽 패널에서 'Parameters' 선택\n2. 'Friction Coefficient' 슬라이더 조정\n3. 범위: 0.0 ~ 1.0\n\n```python\n# 또는 코드로 설정\nsimulation.set_friction(0.5)\n```",
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
      },
    ],
  },
};

/**
 * Long conversation demonstrating scrollable message area.
 */
export const LongConversation: Story = {
  args: {
    defaultOpen: true,
    initialMessages: [
      {
        id: "1",
        role: "user",
        content: "시뮬레이션을 시작하려면 어떻게 해야 하나요?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "2",
        role: "assistant",
        content:
          "시뮬레이션을 시작하려면 다음 단계를 따르세요:\n\n1. 모델 선택\n2. 초기 조건 설정\n3. 재생 버튼 클릭",
        timestamp: new Date(Date.now() - 29 * 60 * 1000),
      },
      {
        id: "3",
        role: "user",
        content: "초기 조건은 어디서 설정하나요?",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
      },
      {
        id: "4",
        role: "assistant",
        content:
          "**초기 조건 패널**에서 설정할 수 있습니다.\n\n설정 가능한 항목:\n- 초기 위치\n- 초기 속도\n- 초기 각도",
        timestamp: new Date(Date.now() - 24 * 60 * 1000),
      },
      {
        id: "5",
        role: "user",
        content: "시뮬레이션 속도를 조절할 수 있나요?",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
      },
      {
        id: "6",
        role: "assistant",
        content:
          "네, 타임라인 컨트롤에서 **재생 속도**를 조절할 수 있습니다.\n\n- 0.5x (느리게)\n- 1.0x (실시간)\n- 2.0x (빠르게)\n- 4.0x (매우 빠르게)",
        timestamp: new Date(Date.now() - 19 * 60 * 1000),
      },
      {
        id: "7",
        role: "user",
        content: "결과를 내보낼 수 있나요?",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: "8",
        role: "assistant",
        content:
          "네! 여러 형식으로 내보낼 수 있습니다.\n\n### 지원 형식\n- **CSV**: 데이터 포인트\n- **PNG/JPG**: 스크린샷\n- **MP4**: 비디오\n- **JSON**: 시뮬레이션 상태",
        timestamp: new Date(Date.now() - 14 * 60 * 1000),
      },
      {
        id: "9",
        role: "user",
        content: "감사합니다!",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
      },
      {
        id: "10",
        role: "assistant",
        content: "천만에요! 더 궁금하신 점이 있으면 언제든지 물어보세요. 😊",
        timestamp: new Date(Date.now() - 9 * 60 * 1000),
      },
    ],
  },
};

/**
 * Markdown rendering demonstration with code blocks and formatting.
 */
export const MarkdownExample: Story = {
  args: {
    defaultOpen: true,
    initialMessages: [
      {
        id: "1",
        role: "user",
        content: "코드 예제를 보여주세요.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        id: "2",
        role: "assistant",
        content: `# 시뮬레이션 물리 엔진

다음은 **핵심 물리 공식**입니다:

## 뉴턴의 운동 법칙

물체에 작용하는 합력은 질량과 가속도의 곱입니다:

$$F_{net} = m \\cdot a = m \\frac{d^2x}{dt^2}$$

## 에너지 보존

운동 에너지와 위치 에너지의 합은 보존됩니다:

$$E_{total} = \\frac{1}{2}mv^2 + mgh = \\text{const}$$

## 주요 파라미터

| 파라미터 | 기호 | 단위 |
|---------|------|------|
| 중력 가속도 | $g$ | $\\text{m/s}^2$ |
| 마찰계수 | $\\mu$ | 무차원 |
| 탄성계수 | $k$ | $\\text{N/m}$ |

> 모든 단위는 SI 단위계를 사용합니다.

\`\`\`python
# 시뮬레이션 설정 예제
sim = simvex.Simulation()
sim.set_gravity(9.8)
sim.set_friction(0.3)
sim.run(duration=10.0)
\`\`\``,
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
      },
    ],
  },
};

/**
 * Interactive example with custom send handler.
 */
export const Interactive: Story = {
  args: {
    defaultOpen: true,
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "안녕하세요! SIMVEX Assistant입니다. 무엇을 도와드릴까요?",
        timestamp: new Date(),
      },
    ],
    onSend: (message: string) => {
      console.log("Message sent:", message);
    },
  },
};

/**
 * Empty state showing the welcome message.
 */
export const EmptyState: Story = {
  args: {
    defaultOpen: true,
    initialMessages: [],
  },
};
