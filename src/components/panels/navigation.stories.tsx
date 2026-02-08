import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navigation } from "./navigation";

const meta = {
  title: "Panels/Navigation",
  component: Navigation,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLinks = [
  { href: "#intro", label: "소개" },
  { href: "#functions", label: "기능" },
  { href: "#models", label: "학습 모델" },
  { href: "#footer", label: "문의" },
];

export const Default: Story = {
  args: {
    links: defaultLinks,
  },
};

export const ThreeLinks: Story = {
  args: {
    links: [
      { href: "#intro", label: "소개" },
      { href: "#functions", label: "기능" },
      { href: "#models", label: "학습 모델" },
    ],
  },
};
