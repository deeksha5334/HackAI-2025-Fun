"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft, Heart, Sparkles, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi love, I'm HerHope. I'm here to support you through your journey. How can I help you today? 💕",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  // Sample responses for demo purposes
  const sampleResponses = [
    "I understand what you're going through. Remember that you're not alone in this journey. Is there anything specific about your treatment or care that you'd like to discuss? 💗",
    "It's completely normal to feel that way. Many patients experience similar emotions. Would you like me to share some coping strategies that others have found helpful? 🌸",
    "Your strength through this process is inspiring. I'm here to support you every step of the way. Have you spoken with your care team about these concerns? 💪",
    "I hear you, and your feelings are valid. Taking things one day at a time is often the best approach. Would you like to explore some mindfulness techniques that might help? 🧘‍♀️",
    "That's a great question. Based on your treatment plan, I can provide some general information, but remember to consult with your doctor for personalized advice. 👩‍⚕️",
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    }
    setChatHistory((prev) => [...prev, userMessage])

    // Clear input
    setMessage("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate bot response after a short delay
    setTimeout(() => {
      setIsTyping(false)
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        },
      ])
    }, 1500)
  }

  // Quick response suggestions
  const quickResponses = [
    "How can I manage treatment side effects?",
    "What should I expect at my next appointment?",
    "I'm feeling anxious about my diagnosis",
    "Tell me about support groups",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-peach-200 to-cream-100">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-pink-100 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-pink-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="text-xl font-bold text-pink-600 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-pink-500" />
            HerHope Care+
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Chat interface */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-pink-100">
            {/* Chat header */}
            <div className="p-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="relative"
              >
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="HerHope" />
                  <AvatarFallback className="bg-pink-200 text-pink-600">PP</AvatarFallback>
                </Avatar>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-1"
                >
                  <Heart className="h-4 w-4 text-pink-500" />
                </motion.div>
              </motion.div>
              <div className="ml-3">
                <h2 className="font-bold text-lg">HerHope Assistant</h2>
                <p className="text-xs text-pink-100">Your compassionate support companion</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-pink-50 to-white">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex max-w-[80%] rounded-2xl p-4",
                      chat.role === "user"
                        ? "ml-auto bg-gradient-to-r from-pink-400 to-pink-500 text-white"
                        : "bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800",
                    )}
                  >
                    {chat.role === "assistant" && (
                      <Avatar className="mr-3 h-8 w-8 border border-pink-300">
                        <AvatarFallback className="bg-pink-200 text-pink-600">PP</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={chat.role === "user" ? "text-right" : ""}>
                      <div className="mb-1">{chat.content}</div>
                      <div className="text-xs opacity-70">
                        {chat.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex max-w-[80%] rounded-2xl p-4 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800"
                  >
                    <Avatar className="mr-3 h-8 w-8 border border-pink-300">
                      <AvatarFallback className="bg-pink-200 text-pink-600">PP</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="w-2 h-2 bg-pink-500 rounded-full mr-1"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="w-2 h-2 bg-pink-500 rounded-full mr-1"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="w-2 h-2 bg-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick responses */}
            <div className="p-3 bg-pink-50 border-t border-pink-100 flex gap-2 overflow-x-auto">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap bg-white border-pink-200 text-pink-600 hover:bg-pink-100 hover:text-pink-700"
                  onClick={() => {
                    setMessage(response)
                  }}
                >
                  {response}
                </Button>
              ))}
            </div>

            {/* Chat input */}
            <div className="p-4 bg-white border-t border-pink-100">
              <div className="flex items-center space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border-pink-200 focus-visible:ring-pink-400 rounded-full"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Information */}
          <div className="md:w-1/3 md:h-[calc(100vh-8rem)] md:overflow-y-auto md:sticky md:top-24 space-y-6 pb-6">
            {/* Welcome card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-pink-100 relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-pink-100 opacity-50" />
              <div className="absolute -left-10 -bottom-10 w-24 h-24 rounded-full bg-peach-200 opacity-50" />

              <h2 className="text-2xl font-bold text-pink-600 mb-3 relative z-10">Welcome to HerHope Chat</h2>
              <p className="text-pink-700 mb-4 relative z-10">
                Your personal support companion through every step of your breast cancer journey.
              </p>

              <div className="flex items-center space-x-2 text-pink-600 mb-2 relative z-10">
                <Heart className="h-5 w-5 text-pink-500" />
                <span className="font-medium">Compassionate Support</span>
              </div>

              <div className="flex items-center space-x-2 text-pink-600 mb-2 relative z-10">
                <MessageCircle className="h-5 w-5 text-pink-500" />
                <span className="font-medium">24/7 Availability</span>
              </div>

              <div className="flex items-center space-x-2 text-pink-600 relative z-10">
                <Sparkles className="h-5 w-5 text-pink-500" />
                <span className="font-medium">Personalized Guidance</span>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-100 to-peach-100 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4">How HerHope Helps You</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center mr-3">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-pink-700">Ask Questions</h4>
                    <p className="text-sm text-pink-600">
                      Get answers about your treatment, side effects, or care plan
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center mr-3">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-pink-700">Share Concerns</h4>
                    <p className="text-sm text-pink-600">Express your feelings in a safe, judgment-free space</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center mr-3">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-pink-700">Get Support</h4>
                    <p className="text-sm text-pink-600">Receive compassionate guidance tailored to your journey</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-md border border-pink-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs">
                    S
                  </div>
                  <div className="w-8 h-8 rounded-full bg-peach-300 flex items-center justify-center text-white text-xs">
                    M
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cream-300 flex items-center justify-center text-pink-600 text-xs">
                    J
                  </div>
                </div>
                <div className="ml-4 text-sm text-pink-600">From our community</div>
              </div>

              <blockquote className="italic text-pink-700 mb-3">
                "HerHope has been my constant companion through the toughest days. Having someone to talk to anytime
                made all the difference in my journey."
              </blockquote>

              <div className="text-right text-sm text-pink-500">— Sarah, 3-year survivor</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
