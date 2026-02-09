"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

/**
 * Toast Demo Page
 *
 * Demonstrates the toast notification system:
 * - 4 variants: success, error, info, warning
 * - Max 3 visible toasts (FIFO queue)
 * - Auto-dismiss after 5 seconds
 * - Manual dismiss with close button
 */
export default function ToastDemoPage() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen p-[40px] bg-background">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[32px] font-bold mb-[24px]">
          Toast Notification System
        </h1>

        <div className="space-y-[32px]">
          {/* Basic Variants */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">
              Basic Variants
            </h2>
            <div className="flex flex-wrap gap-[12px]">
              <Button
                onClick={() =>
                  toast.success("Success!", "Operation completed successfully")
                }
              >
                Success Toast
              </Button>
              <Button
                onClick={() => toast.error("Error!", "Something went wrong")}
                variant="outline"
              >
                Error Toast
              </Button>
              <Button
                onClick={() =>
                  toast.info("Info", "This is an informational message")
                }
              >
                Info Toast
              </Button>
              <Button
                onClick={() =>
                  toast.warning("Warning", "Please proceed with caution")
                }
                variant="outline"
              >
                Warning Toast
              </Button>
            </div>
          </section>

          {/* Title Only */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">Title Only</h2>
            <div className="flex gap-[12px]">
              <Button onClick={() => toast.success("Saved!")}>
                Success Only
              </Button>
              <Button onClick={() => toast.error("Failed!")} variant="outline">
                Error Only
              </Button>
            </div>
          </section>

          {/* Queue Behavior */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">
              Queue Behavior (Max 3)
            </h2>
            <p className="text-[14px] text-neutral-600 mb-[12px]">
              Only 3 toasts are visible at once. When a 4th toast is added, the
              oldest one is removed (FIFO).
            </p>
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
              Spam 4 Toasts
            </Button>
          </section>

          {/* Custom Duration */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">
              Custom Duration
            </h2>
            <p className="text-[14px] text-neutral-600 mb-[12px]">
              Default: 5 seconds. You can customize the auto-dismiss duration.
            </p>
            <div className="flex gap-[12px]">
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
                variant="outline"
              >
                10 Second Toast
              </Button>
            </div>
          </section>

          {/* Real-World Examples */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">
              Real-World Examples
            </h2>
            <div className="flex flex-wrap gap-[12px]">
              <Button
                onClick={() =>
                  toast.success("File uploaded", "model.glb has been uploaded")
                }
              >
                File Upload
              </Button>
              <Button
                onClick={() =>
                  toast.error(
                    "Connection lost",
                    "Unable to connect to the server"
                  )
                }
                variant="outline"
              >
                Connection Error
              </Button>
              <Button
                onClick={() =>
                  toast.info(
                    "New version available",
                    "Please refresh to update"
                  )
                }
              >
                Update Available
              </Button>
              <Button
                onClick={() =>
                  toast.warning(
                    "Unsaved changes",
                    "You have unsaved changes that will be lost"
                  )
                }
                variant="outline"
              >
                Unsaved Changes
              </Button>
            </div>
          </section>

          {/* Code Example */}
          <section>
            <h2 className="text-[24px] font-semibold mb-[16px]">Usage</h2>
            <pre className="bg-neutral-900 text-white p-[16px] rounded-[8px] text-[14px] overflow-x-auto">
              {`import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function MyComponent() {
  const { toast } = useToast();

  const handleSave = () => {
    toast.success("Saved!", "Your changes have been saved");
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>
      <Toaster />
    </>
  );
}`}
            </pre>
          </section>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
