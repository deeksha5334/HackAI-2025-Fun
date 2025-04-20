"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatbotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChatbotDialog({ open, onOpenChange }: ChatbotDialogProps) {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi love, I'm PinkPetal. I'm here to support you through your journey. How can I help you today? 💕",
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: message }])

    // Clear input
    setMessage("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I understand what you're going through. Remember that you're not alone in this journey. Is there anything specific about your treatment or care that you'd like to discuss? 💗",
        },
      ])
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="PinkPetal" />
              <AvatarFallback className="bg-pink-200 text-pink-600">PP</AvatarFallback>
            </Avatar>
            <span className="text-pink-600">Chat with PinkPetal</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[350px] flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[80%] rounded-lg p-3",
                  chat.role === "user"
                    ? "ml-auto bg-pink-100 text-pink-800"
                    : "bg-pink-50 text-pink-700 border border-pink-100",
                )}
              >
                {chat.role === "assistant" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarFallback className="bg-pink-200 text-pink-600">PP</AvatarFallback>
                  </Avatar>
                )}
                <div className={chat.role === "user" ? "text-right" : ""}>{chat.content}</div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-pink-200 focus-visible:ring-pink-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-pink-500 hover:bg-pink-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
