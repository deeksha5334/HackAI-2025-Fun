"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SignInPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Hardcoded login for testing
    if (email === "test@example.com" && password === "password") {
      // Simulate authentication
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 1500)
    } else {
      // Show error for invalid credentials
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Invalid credentials",
          description: "Please use test@example.com / password for testing",
          variant: "destructive",
        })
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Back to home link */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="sm" className="flex items-center text-pink-600 hover:text-pink-700" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-pink-600">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue your care journey</p>
            <div className="mt-4 p-2 bg-pink-50 rounded-md text-sm text-pink-600">
              <strong>Test Account:</strong> test@example.com / password
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSignIn}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 border-pink-200 focus-visible:ring-pink-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-pink-500 hover:text-pink-600">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 border-pink-200 focus-visible:ring-pink-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/sign-up" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Graphic */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-pink-400 via-peach-300 to-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-white max-w-lg"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
              <h2 className="text-3xl font-bold mb-4">Your Journey Matters</h2>
              <p className="mb-6">
                HerHope provides personalized support throughout your breast cancer journey, connecting you with
                resources, tracking your progress, and offering compassionate guidance.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/30 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Compassionate Support</h3>
                    <p className="text-sm text-white/80">24/7 access to caring assistance</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Personalized Care</h3>
                    <p className="text-sm text-white/80">Tailored to your unique needs</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-peach-200/40 blur-3xl"></div>

        {/* Floating shapes */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute top-20 right-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm rotate-12 border border-white/30"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-32 left-16"
        >
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  )
}
