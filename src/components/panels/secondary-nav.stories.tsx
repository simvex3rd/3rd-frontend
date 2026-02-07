import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SecondaryNav } from "./secondary-nav";

const meta = {
  title: "Panels/SecondaryNav",
  component: SecondaryNav,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SecondaryNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/api", label: "API Reference" },
  { href: "/guides", label: "Guides" },
  { href: "/support", label: "Support" },
];

export const Default: Story = {
  args: {
    links: defaultLinks,
  },
};

export const FewLinks: Story = {
  args: {
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/api", label: "API" },
    ],
  },
};

export const ManyLinks: Story = {
  args: {
    links: [
      { href: "/overview", label: "Overview" },
      { href: "/docs", label: "Documentation" },
      { href: "/api", label: "API Reference" },
      { href: "/guides", label: "Guides" },
      { href: "/tutorials", label: "Tutorials" },
      { href: "/examples", label: "Examples" },
      { href: "/support", label: "Support" },
    ],
  },
};
