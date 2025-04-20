import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface FloatingChatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  pulseAnimation?: boolean;
}

const FloatingChatButton = React.forwardRef<HTMLButtonElement, FloatingChatButtonProps>(
  ({ className, icon, pulseAnimation = true, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant: "default", size: "icon" }),
          "fixed bottom-6 right-6 rounded-full shadow-lg z-50",
          pulseAnimation && "pulse-animation",
          className
        )}
        {...props}
      >
        {icon || children}
      </button>
    );
  }
);
FloatingChatButton.displayName = "FloatingChatButton";

export { FloatingChatButton };