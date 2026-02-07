import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MainLayout } from "./main-layout";
import { ValueCard } from "@/components/ui/value-card";
import { ModelCard } from "@/components/ui/model-card";

const meta = {
  title: "Layouts/MainLayout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultHeaderProps = {
  variant: "landing" as const,
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ],
  onCTAClick: () => console.log("CTA clicked"),
  ctaText: "Get Started",
};

const defaultFooterProps = {
  sections: [
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/roadmap", label: "Roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
        { href: "/blog", label: "Blog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/docs", label: "Documentation" },
        { href: "/guides", label: "Guides" },
        { href: "/support", label: "Support" },
      ],
    },
  ],
  socialLinks: [
    { href: "https://twitter.com", label: "Twitter", iconName: "twitter" },
    { href: "https://github.com", label: "GitHub", iconName: "github" },
  ],
};

export const Default: Story = {
  args: {
    headerProps: defaultHeaderProps,
    footerProps: defaultFooterProps,
    children: (
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Welcome to SIMVEX</h1>
        <p className="text-lg text-muted-foreground">
          Advanced 3D simulation platform powered by AI technology.
        </p>
      </div>
    ),
  },
};

export const WithValueCards: Story = {
  args: {
    headerProps: defaultHeaderProps,
    footerProps: defaultFooterProps,
    children: (
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Our Features</h1>
          <p className="text-lg text-muted-foreground">
            Discover what makes SIMVEX unique
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ValueCard
            variant="default"
            iconName="ai-fill"
            title="AI-Powered Simulation"
            description="Advanced artificial intelligence technology enables realistic and accurate simulations of complex systems."
          />
          <ValueCard
            variant="primary"
            iconName="cube-3d-sphere"
            title="3D Visualization"
            description="Immersive three-dimensional visualization helps you understand complex data and relationships at a glance."
          />
        </div>
      </div>
    ),
  },
};

export const WithModelCards: Story = {
  args: {
    headerProps: defaultHeaderProps,
    footerProps: defaultFooterProps,
    children: (
      <div className="flex flex-col gap-12">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Model Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore our collection of 3D models
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ModelCard
            variant="default"
            iconName="cube-3d-sphere"
            modelName="Building Model"
          />
          <ModelCard
            variant="primary"
            iconName="ai-fill"
            modelName="Advanced Simulation"
          />
          <ModelCard
            variant="default"
            iconName="cube-3d-sphere"
            modelName="Complex System"
          />
        </div>
      </div>
    ),
  },
};

export const LandingPage: Story = {
  args: {
    headerProps: { ...defaultHeaderProps, variant: "landing" },
    footerProps: defaultFooterProps,
    children: (
      <div className="flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="mb-6 text-6xl font-bold">
            The Future of 3D Simulation
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            SIMVEX combines cutting-edge AI with powerful 3D visualization to
            bring your simulations to life.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ValueCard
            variant="default"
            iconName="ai-fill"
            title="AI-Powered"
            description="Advanced AI technology for accurate simulations and predictions."
          />
          <ValueCard
            variant="primary"
            iconName="cube-3d-sphere"
            title="3D Visualization"
            description="Immersive visualization for better understanding of complex data."
          />
        </div>
      </div>
    ),
  },
};
