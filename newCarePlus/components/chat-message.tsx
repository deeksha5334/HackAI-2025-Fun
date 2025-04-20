import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: number
    sender: string
    avatar: string
    message: string
    time: string
    type: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-pink-50 p-3 transition-all hover:bg-pink-100",
        message.type === "doctor" ? "chat-message-doctor" : "chat-message-assistant",
      )}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
          <AvatarFallback className="bg-pink-200 text-pink-600 text-xs">
            {message.sender
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-pink-700">{message.sender}</h4>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
          <p className="mt-1 text-sm">{message.message}</p>
        </div>
      </div>
    </div>
  )
}
