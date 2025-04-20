"use client"
import { Button } from "@/components/ui/button"
import { Heart, Clock, Home, Shield, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/90 sticky top-0 z-50 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4">
          <NavigationBar />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-200 to-pink-100 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-pink-300/30 blur-3xl"></div>
          <div className="absolute -left-10 bottom-0 w-72 h-72 rounded-full bg-peach-200/40 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-pink-500 font-medium mb-4">PERSONALIZED BREAST CANCER SUPPORT</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 leading-tight mb-6">
                Supportive care your journey deserves
              </h1>
              <p className="text-lg text-pink-700 mb-8 max-w-lg">
                Comprehensive support from specialists who understand what you're going through, every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6" asChild>
                  <Link href="/auth/sign-up">GET SUPPORT</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-8 py-6"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
                <div className="relative rounded-2xl shadow-xl mx-auto overflow-hidden" style={{
                        background: 'linear-gradient(rgba(252, 231, 243, 0.8), rgba(252, 231, 243, 0.8)), url(/your-image-name.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '500px',
                        height: '600px'
                      }}>
                  <img
                    src="/mainpicture.jpg"
                    alt="Woman smiling"
                    className="rounded-2xl shadow-xl mx-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-pink-500 font-medium mb-2">COMPREHENSIVE CARE</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Support where you need it most</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The days of feeling alone during treatment are gone. HerHope provides personalized support throughout your
              breast cancer journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">In-home support</h3>
              <p className="text-gray-600">
                Receive care and assistance in the comfort of your own home during treatment and recovery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized care</h3>
              <p className="text-gray-600">
                Treatment plans and support tailored specifically to your diagnosis and personal needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 availability</h3>
              <p className="text-gray-600">
                Access to support whenever you need it, day or night, through our care team and digital platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive coverage</h3>
              <p className="text-gray-600">
                More affordable than you might think, with various coverage options to suit your needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-peach-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
              Begin your supported healing journey today
            </h2>
            <p className="text-lg text-pink-700 mb-8">
              Join thousands of women who have found strength, guidance, and community through HerHope.
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6" asChild>
              <Link href="/auth/sign-up">GET STARTED</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-pink-500 mr-2" />
                <span className="text-2xl font-bold text-pink-600">HerHope</span>
              </div>
              <p className="text-gray-600 mb-4">
                Providing compassionate support for women throughout their breast cancer journey.
              </p>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-pink-500 mr-2" />
                <span className="text-gray-600">1-800-HER-HOPE</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Treatment Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Emotional Guidance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Care Coordination
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Recovery Assistance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Support Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-pink-500">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-pink-100 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} HerHope. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  )
}
