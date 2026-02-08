import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartSidebar } from "./part-sidebar";

/**
 * Part Sidebar Stories
 *
 * Note: This component uses Zustand store (useSceneStore) for state management.
 * In Storybook, you need to mock the store or set selectedObject state manually.
 *
 * Figma spec: 400x750px, rgba(212,212,212,0.3) background, 3px cyan border,
 * 24px border radius, 48px padding, 32px gap between sections.
 */

const meta = {
  title: "Panels/PartSidebar",
  component: PartSidebar,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    docs: {
      description: {
        component:
          "Part information sidebar with AI Assistant and Part Info sections. Displays when a 3D part is selected. Figma spec: 400x750px (node-232:967).",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PartSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Note: These stories require mocking the Zustand store.
 * The component will only render when selectedObject is set in the store.
 *
 * To properly test in Storybook, you would need to:
 * 1. Mock useSceneStore to return a selectedObject
 * 2. Mock getPartByMeshName to return sample part data
 *
 * For now, these stories demonstrate the component structure.
 */

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default state. In production, this component only renders when a part is selected in the 3D viewer.",
      },
    },
  },
};

export const WithPartSelected: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Displays AI Assistant and Part Info sections when a part is selected. Shows part description and metadata.",
      },
    },
  },
};

export const Specs: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Figma Specifications (node-232:967):**

- **Dimensions:** 400px × 750px
- **Background:** rgba(212,212,212,0.3)
- **Border:** 3px solid primary (Tailwind color)
- **Border Radius:** 24px
- **Padding:** 48px (p-12)
- **Gap:** 32px (gap-8) between sections
- **Backdrop:** backdrop-blur-sm

**Structure:**
1. AI Assistant Section
   - Icon (37×37px) + Title (32px semibold cyan)
   - Content box (250px height, same styling as outer box)

2. Part Info Section
   - Icon (37×38px) + Title (32px semibold cyan)
   - Content box (250px height, same styling as outer box)

**Typography:**
- Section titles: 32px, semibold, leading-[1.25], cyan
- Content text: 16px, medium, leading-[1.5], white
        `,
      },
    },
  },
};

export const DesignTokens: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**CSS Classes Used:**

\`\`\`tsx
// Outer container
"flex flex-col items-center justify-center"
"w-[400px] h-[750px]"
"border-[3px] border-solid border-primary"
"bg-[rgba(212,212,212,0.3)]"
"rounded-[24px] p-12 gap-8"
"backdrop-blur-sm transition-all duration-300"

// Section headers
"flex gap-4 items-center"
"font-semibold text-[32px] leading-[1.25] text-primary"

// Content boxes
"w-full h-[250px]"
"bg-[rgba(212,212,212,0.3)]"
"border-[3px] border-primary"
"rounded-[24px]"
"flex items-center justify-center px-[48px] py-[48px]"

// Content text
"font-medium text-[16px] leading-[1.5] text-white"
\`\`\`
        `,
      },
    },
  },
};

export const ResponsiveNote: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "**Note:** This component uses fixed dimensions (400x750px) as per Figma spec. For responsive layouts, consider wrapping in a container or adjusting the dimensions based on viewport size.",
      },
    },
  },
};
