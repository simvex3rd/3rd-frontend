import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./footer";

const meta = {
  title: "Panels/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSections = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/press", label: "Press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/guides", label: "Guides" },
      { href: "/api", label: "API Reference" },
      { href: "/support", label: "Support" },
    ],
  },
];

const defaultSocialLinks = [
  { href: "https://twitter.com", label: "Twitter", iconName: "twitter" },
  { href: "https://github.com", label: "GitHub", iconName: "github" },
  { href: "https://linkedin.com", label: "LinkedIn", iconName: "linkedin" },
];

export const Default: Story = {
  args: {
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
  },
};

export const WithoutSocial: Story = {
  args: {
    sections: defaultSections,
  },
};

export const CustomCopyright: Story = {
  args: {
    sections: defaultSections,
    socialLinks: defaultSocialLinks,
    copyright: "© 2024 SIMVEX Technologies Inc. All rights reserved.",
  },
};

export const MinimalSections: Story = {
  args: {
    sections: [
      {
        title: "Quick Links",
        links: [
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
    socialLinks: defaultSocialLinks,
  },
};
