import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoginHeader } from "./login-header";

const meta = {
  title: "Panels/LoginHeader",
  component: LoginHeader,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["landing", "tap3", "main"],
      description: "Header style variant",
    },
  },
} satisfies Meta<typeof LoginHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export const Landing: Story = {
  args: {
    variant: "landing",
    navLinks: defaultNavLinks,
    onLoginClick: () => console.log("Login clicked"),
    onSignupClick: () => console.log("Signup clicked"),
  },
};

export const Tap3: Story = {
  args: {
    variant: "tap3",
    navLinks: defaultNavLinks,
    onLoginClick: () => console.log("Login clicked"),
    onSignupClick: () => console.log("Signup clicked"),
  },
};

export const Main: Story = {
  args: {
    variant: "main",
    navLinks: defaultNavLinks,
    user: { name: "홍길동" },
  },
};

export const WithoutCTA: Story = {
  args: {
    variant: "main",
    navLinks: defaultNavLinks,
  },
};

export const AllVariants: Story = {
  args: {
    navLinks: defaultNavLinks,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 px-8 text-sm text-muted-foreground">
          Landing (136px)
        </p>
        <LoginHeader
          variant="landing"
          navLinks={defaultNavLinks}
          onLoginClick={() => {}}
          onSignupClick={() => {}}
        />
      </div>
      <div>
        <p className="mb-2 px-8 text-sm text-muted-foreground">Tap3 (136px)</p>
        <LoginHeader
          variant="tap3"
          navLinks={defaultNavLinks}
          onLoginClick={() => {}}
          onSignupClick={() => {}}
        />
      </div>
      <div>
        <p className="mb-2 px-8 text-sm text-muted-foreground">
          Main (133.09px)
        </p>
        <LoginHeader
          variant="main"
          navLinks={defaultNavLinks}
          user={{ name: "홍길동" }}
        />
      </div>
    </div>
  ),
};

export const StickyBehavior: Story = {
  args: {
    navLinks: defaultNavLinks,
  },
  render: () => (
    <div>
      <LoginHeader
        variant="landing"
        navLinks={defaultNavLinks}
        onLoginClick={() => {}}
        onSignupClick={() => {}}
      />
      <div className="h-[200vh] bg-gradient-to-b from-background to-muted p-8">
        <p className="text-center">Scroll down to see sticky header behavior</p>
      </div>
    </div>
  ),
};
