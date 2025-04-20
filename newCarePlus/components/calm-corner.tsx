"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, RefreshCw } from "lucide-react"

export function CalmCorner() {
  const [quote, setQuote] = useState("")
  const [tip, setTip] = useState("")

  const quotes = [
    "You are braver than you believe, stronger than you seem, and smarter than you think.",
    "Your strength is greater than any challenge you face.",
    "This too shall pass. Just breathe and take it one day at a time.",
    "Every day may not be good, but there is something good in every day.",
    "Hope is the only thing stronger than fear.",
    "You've survived 100% of your worst days so far.",
    "Be gentle with yourself. You're doing the best you can.",
  ]

  const tips = [
    "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6.",
    "Place your hand on your heart and feel its steady rhythm.",
    "Look around and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "Visualize a peaceful place where you feel safe and calm.",
    "Gently roll your shoulders back and release any tension you're holding.",
    "Drink a glass of water slowly, focusing on how it feels.",
    "Close your eyes for 30 seconds and just listen to the sounds around you.",
  ]

  const refreshContent = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    setTip(tips[Math.floor(Math.random() * tips.length)])
  }

  useEffect(() => {
    refreshContent()
  }, [])

  return (
    <Card className="fixed right-4 top-32 z-40 w-64 bg-white/90 shadow-lg animate-float">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-pink-600 flex items-center">
          <Heart className="mr-2 h-4 w-4 text-pink-500" />
          Calm Corner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-pink-500">🌿 Take a Breather</h4>
          <p className="mt-1 text-sm">{tip}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-pink-500">💕 A quote for strength</h4>
          <p className="mt-1 text-sm italic">{quote}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-pink-500 border-pink-200 hover:bg-pink-50"
          onClick={refreshContent}
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Refresh
        </Button>
      </CardContent>
    </Card>
  )
}
