import type { Preview } from "@storybook/nextjs-vite";
import { themes } from "@storybook/theming";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#090909",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
