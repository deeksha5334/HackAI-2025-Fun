import * as React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  sender: "doctor" | "assistant" | "user";
  timestamp?: string;
  avatar?: React.ReactNode;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, sender, timestamp, avatar, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex p-4 rounded-lg mb-4",
          {
            "chat-message-doctor": sender === "doctor",
            "chat-message-assistant": sender === "assistant",
            "bg-muted": sender === "user",
          },
          className
        )}
        {...props}
      >
        {avatar && (
          <div className="flex-shrink-0 mr-4">
            {avatar}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <span className="font-medium mr-2 capitalize">
              {sender}
            </span>
            {timestamp && (
              <span className="text-xs text-muted-foreground">
                {timestamp}
              </span>
            )}
          </div>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    );
  }
);
ChatMessage.displayName = "ChatMessage";

export { ChatMessage };