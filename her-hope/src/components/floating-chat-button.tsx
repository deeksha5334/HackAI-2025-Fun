"use client"

import { Button } from "@/components/ui/button"
import { MessageCircleHeart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface FloatingChatButtonProps {
  onClick: () => void
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Start animation after 3 seconds
    const timeout = setTimeout(() => {
      setIsAnimating(true)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-6 z-50 rounded-full bg-pink-500 p-4 shadow-lg hover:bg-pink-600 md:bottom-6",
        isAnimating && "pulse-animation",
      )}
      size="lg"
    >
      <MessageCircleHeart className="mr-2 h-5 w-5" />
      <span className="font-medium">💗 Chat with PinkPetal</span>
    </Button>
  )
}
