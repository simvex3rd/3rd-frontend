import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { IconButton } from "./icon-button";
import { Button } from "./button";

/**
 * Tooltip component for toolbar button hints.
 *
 * Features:
 * - 300ms hover delay before showing
 * - Positioning: top, bottom, left, right
 * - Arrow indicator
 * - ARIA accessible
 * - Auto-dismiss on blur/mouse leave
 */
const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lightweight CSS-based tooltip component for displaying hints on toolbar buttons and interactive elements.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip positioned at the top
 */
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip with IconButton (primary use case for toolbar)
 */
export const WithIconButton: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-[16px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="menu" />
          </TooltipTrigger>
          <TooltipContent>Open menu</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="close" />
          </TooltipTrigger>
          <TooltipContent>Close panel</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Different positioning options
 */
export const Positions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-[80px] p-[80px]">
        {/* Top */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top (default)</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip on top</TooltipContent>
        </Tooltip>

        {/* Bottom */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
        </Tooltip>

        <div className="flex gap-[160px]">
          {/* Left */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Tooltip on left</TooltipContent>
          </Tooltip>

          {/* Right */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Tooltip on right</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Custom delay duration
 */
export const CustomDelay: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-[16px]">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button variant="outline">No delay</Button>
          </TooltipTrigger>
          <TooltipContent>Shows immediately</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={1000}>
          <TooltipTrigger asChild>
            <Button variant="outline">1s delay</Button>
          </TooltipTrigger>
          <TooltipContent>Shows after 1 second</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Toolbar simulation with multiple tooltips
 */
export const ToolbarSimulation: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-[8px] p-[16px] bg-neutral-800 rounded-[12px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="menu" />
          </TooltipTrigger>
          <TooltipContent>Menu</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="close" />
          </TooltipTrigger>
          <TooltipContent>Close</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="menu" />
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="close" />
          </TooltipTrigger>
          <TooltipContent>Help</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Long text tooltip
 */
export const LongText: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for long tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          This is a longer tooltip with more information
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
