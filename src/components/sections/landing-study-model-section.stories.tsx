import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingStudyModelSection } from "./landing-study-model-section";

/**
 * Landing page study model section
 *
 * Features:
 * - Section heading
 * - 4-column grid layout (responsive: 1-2-4 columns)
 * - ModelCard components
 * - Scroll-triggered fade-in animation
 * - Hover scale effect on cards
 *
 * Figma: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-354
 */
const meta = {
  title: "Sections/Landing Study Model",
  component: LandingStudyModelSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Study model section for the landing page. Displays model cards in a responsive grid with scroll-triggered animation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingStudyModelSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default study model section with model cards
 */
export const Default: Story = {};

/**
 * Dark theme variant
 */
export const Dark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};

/**
 * Light theme variant
 */
export const Light: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story) => (
      <div className="light">
        <Story />
      </div>
    ),
  ],
};
