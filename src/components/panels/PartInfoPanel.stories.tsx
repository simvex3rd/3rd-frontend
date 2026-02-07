import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartInfoPanel } from "./PartInfoPanel";

// Mock store setup if needed, or just relying on default mock data
const meta = {
  title: "Panels/PartInfoPanel",
  component: PartInfoPanel,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PartInfoPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Store mocking might be needed here if state defaults to null
  // For now assuming the standard mock data works if something is selected
  // Consider wrapping with a StoreProvider mock if necessary
};
