import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toaster } from "./toaster";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./button";

/**
 * Toast notification system with queue management
 *
 * Features:
 * - Max 3 visible toasts (FIFO)
 * - Auto-dismiss after 5 seconds
 * - Manual dismiss with close button
 * - 4 variants: success, error, info, warning
 *
 * Sizing (1920px baseline):
 * - Width: 360px
 * - Padding: 16px
 * - Border radius: 16px
 * - Position: top-right (24px, 24px)
 * - Stack gap: 8px
 */

const meta = {
  title: "UI/Toast",
  component: Toaster,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-[16px] p-[24px]">
      <h2 className="text-[24px] font-bold">Toast Notifications</h2>
      <div className="flex flex-wrap gap-[12px]">
        <Button
          onClick={() =>
            toast.success("Success!", "Operation completed successfully")
          }
        >
          Success Toast
        </Button>
        <Button onClick={() => toast.error("Error!", "Something went wrong")}>
          Error Toast
        </Button>
        <Button
          onClick={() => toast.info("Info", "This is an informational message")}
        >
          Info Toast
        </Button>
        <Button
          onClick={() =>
            toast.warning("Warning", "Please proceed with caution")
          }
        >
          Warning Toast
        </Button>
      </div>

      <div className="flex flex-col gap-[8px] mt-[24px]">
        <h3 className="text-[18px] font-semibold">Test Queue (Max 3)</h3>
        <Button
          onClick={() => {
            toast.info("Toast 1", "First toast");
            setTimeout(() => toast.info("Toast 2", "Second toast"), 200);
            setTimeout(() => toast.info("Toast 3", "Third toast"), 400);
            setTimeout(
              () => toast.info("Toast 4", "Fourth toast (replaces first)"),
              600
            );
          }}
        >
          Spam 4 Toasts (Queue Test)
        </Button>
      </div>

      <div className="flex flex-col gap-[8px] mt-[24px]">
        <h3 className="text-[18px] font-semibold">Custom Duration</h3>
        <Button
          onClick={() =>
            toast.success("Quick!", "Auto-dismiss in 2 seconds", 2000)
          }
        >
          2 Second Toast
        </Button>
        <Button
          onClick={() =>
            toast.warning("Slow!", "Auto-dismiss in 10 seconds", 10000)
          }
        >
          10 Second Toast
        </Button>
      </div>

      <Toaster />
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const SuccessVariant: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <Button
            onClick={() =>
              toast.success("Saved!", "Your changes have been saved")
            }
          >
            Show Success
          </Button>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};

export const ErrorVariant: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <Button
            onClick={() =>
              toast.error("Failed!", "Unable to save your changes")
            }
          >
            Show Error
          </Button>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};

export const InfoVariant: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <Button
            onClick={() =>
              toast.info("Info", "This is an informational message")
            }
          >
            Show Info
          </Button>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};

export const WarningVariant: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <Button
            onClick={() =>
              toast.warning("Warning", "Please proceed with caution")
            }
          >
            Show Warning
          </Button>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};

export const WithoutDescription: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <div className="flex gap-[12px]">
            <Button onClick={() => toast.success("Saved!")}>
              Success Only Title
            </Button>
            <Button onClick={() => toast.error("Failed!")}>
              Error Only Title
            </Button>
          </div>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};

export const QueueBehavior: Story = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();
      return (
        <div className="p-[24px]">
          <p className="text-[14px] mb-[16px] text-neutral-600">
            Only 3 toasts visible at once. Oldest toast is removed when 4th is
            added (FIFO).
          </p>
          <Button
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                  toast.info(`Toast ${i}`, `Message number ${i}`);
                }, i * 300);
              }
            }}
          >
            Add 5 Toasts (Watch Queue)
          </Button>
          <Toaster />
        </div>
      );
    };
    return <Demo />;
  },
};
