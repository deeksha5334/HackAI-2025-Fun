"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, BarChart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavigationBar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const navItems = [
    { name: "Overview", icon: Home, href: "#" },
    { name: "Analytics", icon: BarChart, href: "#" },
    { name: "Patients", icon: Users, href: "#" },
  ]

  return (
    <>
      {/* Top Navigation for Desktop */}
      <div className="hidden md:flex items-center justify-between py-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-pink-600 flex items-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 mr-2 fill-pink-500" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Care+
          </div>
        </div>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700"
              asChild
            >
              <a href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white border-t border-pink-100 p-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className={cn("flex flex-col items-center rounded-lg px-3 py-2 text-pink-600", "hover:bg-pink-100")}
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </a>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
