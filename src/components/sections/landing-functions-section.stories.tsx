import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingFunctionsSection } from "./landing-functions-section";

/**
 * Landing page functions section
 *
 * Features:
 * - Section heading
 * - 2-column grid layout (responsive)
 * - ValueCard components with variants
 * - Scroll-triggered fade-in animation
 * - Hover scale effect on cards
 *
 * Figma: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-327
 */
const meta = {
  title: "Sections/Landing Functions",
  component: LandingFunctionsSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Functions section for the landing page. Displays feature cards in a responsive grid with scroll-triggered animation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingFunctionsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default functions section with feature cards
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
