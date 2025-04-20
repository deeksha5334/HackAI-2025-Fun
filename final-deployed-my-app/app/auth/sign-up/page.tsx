"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, User, Mail, Lock, ArrowRight, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/sign-in")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Back to home link */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="sm" className="flex items-center text-pink-600 hover:text-pink-700" asChild>
          <Link href="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Right side - Form */}
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
            <h1 className="text-3xl font-bold text-pink-600">Join HerHope</h1>
            <p className="text-gray-600 mt-2">Create an account to start your care journey</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSignUp}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="pl-10 border-pink-200 focus-visible:ring-pink-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="dob"
                  type="date"
                  className="pl-10 border-pink-200 focus-visible:ring-pink-400"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
              <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-pink-500 hover:text-pink-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-pink-500 hover:text-pink-600">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600"
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Create Account
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
              Already have an account?{" "}
              <Link href="/auth/sign-in" className="text-pink-500 hover:text-pink-600 font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Left side - Graphic */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-tl from-cream-200 via-peach-300 to-pink-400 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-white max-w-lg"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30">
              <h2 className="text-3xl font-bold mb-4">Begin Your Healing Journey</h2>
              <p className="mb-6">
                Join thousands of women who have found support, guidance, and community through HerHope. We're here for
                you every step of the way.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">5000+</div>
                  <div className="text-sm text-white/80">Women supported</div>
                </div>

                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Care assistance</div>
                </div>

                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-white/80">Satisfaction rate</div>
                </div>

                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Compassion</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-300/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-peach-200/40 blur-3xl"></div>

        {/* Floating shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute top-32 left-24"
        >
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute bottom-40 right-20"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm rotate-12 border border-white/30"></div>
        </motion.div>
      </div>
    </div>
  )
}
