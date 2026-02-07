import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PartPopup } from "./part-popup";

const meta = {
  title: "UI/PartPopup",
  component: PartPopup,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
    docs: {
      description: {
        component:
          "Tooltip-style popup for displaying quick information about 3D parts. Shows part name and basic specifications (material, weight) when hovering over parts in the viewer.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "highlight"],
      description: "Visual variant",
    },
    name: {
      control: "text",
      description: "Part name",
    },
    material: {
      control: "text",
      description: "Material type",
    },
    weight: {
      control: "text",
      description: "Weight specification",
    },
    x: {
      control: "number",
      description: "X position (for absolute positioning)",
    },
    y: {
      control: "number",
      description: "Y position (for absolute positioning)",
    },
  },
} satisfies Meta<typeof PartPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Engine Block",
    material: "Aluminum Alloy",
    weight: "12.5 kg",
  },
};

export const Highlight: Story = {
  args: {
    variant: "highlight",
    name: "Piston",
    material: "Steel",
    weight: "2.5 kg",
  },
};

export const MinimalInfo: Story = {
  args: {
    name: "Bolt",
    material: "Steel",
  },
};

export const NameOnly: Story = {
  args: {
    name: "Gasket",
  },
};

export const LongNames: Story = {
  args: {
    name: "High-Performance Turbocharger Assembly",
    material: "Titanium Alloy Ti-6Al-4V",
    weight: "45.8 kg",
  },
};

export const Positioned: Story = {
  args: {
    name: "Cylinder Head",
    material: "Cast Iron",
    weight: "18.2 kg",
    x: 100,
    y: 50,
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="relative h-[400px] w-full bg-[#0a0a0a] p-8">
      <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--primary-cyan)]/30 bg-[var(--primary-cyan)]/10" />
      <PartPopup {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    name: "Camshaft",
    material: "Forged Steel",
    weight: "8.3 kg",
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div className="flex h-[400px] w-full items-center justify-center gap-8 bg-[#0a0a0a] p-8">
      <PartPopup {...args} variant="default" />
      <PartPopup {...args} variant="highlight" />
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="flex flex-col gap-6 bg-[#0a0a0a] p-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#d4d4d4]">
          Default Variant
        </h3>
        <PartPopup
          name="Engine Block"
          material="Aluminum Alloy"
          weight="12.5 kg"
        />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#d4d4d4]">
          Highlight Variant
        </h3>
        <PartPopup
          variant="highlight"
          name="Piston"
          material="Steel"
          weight="2.5 kg"
        />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#d4d4d4]">
          Minimal Info
        </h3>
        <PartPopup name="Bolt" material="Steel" />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium text-[#d4d4d4]">Name Only</h3>
        <PartPopup name="Gasket" />
      </div>
    </div>
  ),
};
