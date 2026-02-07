import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartSidebar } from "./part-sidebar";
import { useSceneStore } from "@/stores/scene-store";
import { useEffect } from "react";

/**
 * Part Sidebar Component Stories
 *
 * Displays detailed part information in a full-height sidebar.
 * Follows Figma design: Side bar-if click part (400x750)
 */

const meta = {
  title: "Panels/PartSidebar",
  component: PartSidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Full-height sidebar that displays detailed part information when a part is selected. Integrates with scene store and provides dismissible interface.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PartSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Wrapper component to set up store state for stories
 */
function StoryWrapper({ selectedObject }: { selectedObject: string | null }) {
  useEffect(() => {
    useSceneStore.setState({ selectedObject });
    return () => {
      useSceneStore.setState({ selectedObject: null });
    };
  }, [selectedObject]);

  return (
    <div className="relative h-screen w-full bg-gray-900">
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">
          {selectedObject
            ? "Sidebar is shown on the right"
            : "No part selected"}
        </p>
      </div>
      <PartSidebar />
    </div>
  );
}

/**
 * No part selected state - sidebar is hidden
 */
export const NoSelection: Story = {
  render: () => <StoryWrapper selectedObject={null} />,
};

/**
 * Crankshaft part selected
 */
export const CrankshaftSelected: Story = {
  render: () => <StoryWrapper selectedObject="Crankshaft" />,
};

/**
 * Piston part selected
 */
export const PistonSelected: Story = {
  render: () => <StoryWrapper selectedObject="Piston" />,
};

/**
 * Connecting Rod part selected
 */
export const ConnectingRodSelected: Story = {
  render: () => <StoryWrapper selectedObject="ConnectingRod" />,
};

/**
 * Unknown part selected - shows fallback UI
 */
export const UnknownPartSelected: Story = {
  render: () => <StoryWrapper selectedObject="UnknownPart123" />,
};

/**
 * Interactive story - test closing the sidebar
 */
export const Interactive: Story = {
  render: () => {
    return (
      <div className="relative h-screen w-full bg-gray-900">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-gray-400">
            Click buttons to select different parts
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                useSceneStore.setState({ selectedObject: "Crankshaft" })
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Select Crankshaft
            </button>
            <button
              onClick={() =>
                useSceneStore.setState({ selectedObject: "Piston" })
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Select Piston
            </button>
            <button
              onClick={() =>
                useSceneStore.setState({ selectedObject: "ConnectingRod" })
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Select Connecting Rod
            </button>
            <button
              onClick={() => useSceneStore.setState({ selectedObject: null })}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Clear Selection
            </button>
          </div>
        </div>
        <PartSidebar />
      </div>
    );
  },
};

/**
 * All parts comparison - switch between parts to compare
 */
export const AllPartsComparison: Story = {
  render: function Render() {
    useEffect(() => {
      const parts = ["Crankshaft", "Piston", "ConnectingRod"];
      let currentIndex = 0;
      useSceneStore.setState({ selectedObject: parts[0] });

      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % parts.length;
        useSceneStore.setState({ selectedObject: parts[currentIndex] });
      }, 3000);

      return () => {
        clearInterval(interval);
        useSceneStore.setState({ selectedObject: null });
      };
    }, []);

    return (
      <div className="relative h-screen w-full bg-gray-900">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400">Parts cycle every 3 seconds</p>
            <p className="mt-2 text-sm text-gray-500">
              Crankshaft → Piston → Connecting Rod
            </p>
          </div>
        </div>
        <PartSidebar />
      </div>
    );
  },
};

/**
 * Mobile viewport - test responsive behavior
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => <StoryWrapper selectedObject="Crankshaft" />,
};

/**
 * Tablet viewport - test responsive behavior
 */
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
  render: () => <StoryWrapper selectedObject="Piston" />,
};
