import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingFooterSection } from "./landing-footer-section";

/**
 * Landing page footer section
 *
 * Features:
 * - Wraps existing Footer component
 * - Logo and copyright information
 * - Privacy Policy and Terms of Service links
 * - Scroll-triggered fade-in animation
 * - 339px height
 *
 * Figma: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-354
 */
const meta = {
  title: "Sections/Landing Footer",
  component: LandingFooterSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Footer section for the landing page. Wraps the existing Footer component with scroll-triggered animation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingFooterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default footer section
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
