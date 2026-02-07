import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingIntroSection } from "./landing-intro-section";

/**
 * Landing page intro/hero section
 *
 * Features:
 * - Logo (xxlarge size)
 * - Heading and subtitle
 * - Dual CTA buttons (primary + default)
 * - Background grid overlay
 * - Scroll-triggered fade-in animation
 *
 * Figma: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=147-317
 */
const meta = {
  title: "Sections/Landing Intro",
  component: LandingIntroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Hero section for the landing page with logo, heading, subtitle, and CTA buttons. Features scroll-triggered fade-in animation using IntersectionObserver.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LandingIntroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default intro section with all elements
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
