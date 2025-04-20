"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, LogIn, Heart, User, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface NavigationBarProps {
  isLoggedIn?: boolean
}

export function NavigationBar({ isLoggedIn = false }: NavigationBarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

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

  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    // For now, just redirect to home
    router.push("/")
  }

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Services", icon: Heart, href: "/services" },
  ]

  return (
    <>
      {/* Top Navigation for Desktop */}
      <div className="hidden md:flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-pink-600 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-500" />
            HerHope
          </Link>
        </div>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}

          {isLoggedIn ? (
            <>
              <Button variant="ghost" className="rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200" asChild>
                <Link href="/dashboard">
                  <Bell className="h-4 w-4" />
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full bg-pink-500 text-white hover:bg-pink-600">
                    <User className="mr-2 h-4 w-4" />
                    <span className="font-medium">UserName</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/appointments">Appointments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/reports">Medical Reports</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="ghost" className="rounded-full bg-pink-500 text-white hover:bg-pink-600" asChild>
              <Link href="/auth/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                <span className="font-medium">Sign In</span>
              </Link>
            </Button>
          )}
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
              <Link href={item.href}>
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Link>
            </Button>
          ))}

          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              className={cn("flex flex-col items-center rounded-lg px-3 py-2 text-pink-600", "hover:bg-pink-100")}
              asChild
            >
              <Link href="/dashboard">
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs">Profile</span>
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={cn("flex flex-col items-center rounded-lg px-3 py-2 text-pink-600", "hover:bg-pink-100")}
              asChild
            >
              <Link href="/auth/sign-in">
                <LogIn className="h-5 w-5 mb-1" />
                <span className="text-xs">Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      )}
    </>
  )
}
