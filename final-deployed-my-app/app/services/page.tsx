"use client"

import { Button } from "@/components/ui/button"
import { Heart, Clock, Home, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function ServicesPage() {
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-pink-500 font-medium mb-4">OUR SERVICES</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 leading-tight mb-6">
              Comprehensive Support Through Every Step
            </h1>
            <p className="text-lg text-pink-700 mb-8 max-w-2xl mx-auto">
              HerHope offers a range of services designed to support you throughout your breast cancer journey, from
              diagnosis to recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">In-home Support</h3>
              <p className="text-gray-600 mb-6">
                Receive care and assistance in the comfort of your own home during treatment and recovery. Our trained
                specialists provide personalized care tailored to your specific needs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Post-treatment recovery assistance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Daily living assistance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Medication management</span>
                </li>
              </ul>
              <Button variant="outline" className="text-pink-500 border-pink-200 hover:bg-pink-50" asChild>
                <Link href="/services/in-home">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Emotional Support</h3>
              <p className="text-gray-600 mb-6">
                Our compassionate team provides emotional support throughout your journey, helping you navigate the
                challenges of diagnosis, treatment, and recovery.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">One-on-one counseling</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Support groups</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Family counseling</span>
                </li>
              </ul>
              <Button variant="outline" className="text-pink-500 border-pink-200 hover:bg-pink-50" asChild>
                <Link href="/services/emotional-support">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Availability</h3>
              <p className="text-gray-600 mb-6">
                Access to support whenever you need it, day or night, through our care team and digital platform. We're
                here for you around the clock.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">24/7 helpline</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Emergency support</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Digital chat assistance</span>
                </li>
              </ul>
              <Button variant="outline" className="text-pink-500 border-pink-200 hover:bg-pink-50" asChild>
                <Link href="/services/availability">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-md border border-pink-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-600 mb-6">
                More affordable than you might think, with various coverage options to suit your needs and financial
                situation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Insurance coordination</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Financial assistance programs</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  </div>
                  <span className="text-gray-700">Flexible payment options</span>
                </li>
              </ul>
              <Button variant="outline" className="text-pink-500 border-pink-200 hover:bg-pink-50" asChild>
                <Link href="/services/coverage">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-peach-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">Ready to get the support you deserve?</h2>
            <p className="text-lg text-pink-700 mb-8">
              Contact us today to learn more about our services and how we can support you on your journey.
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
                <span className="text-gray-600">1-800-HER-HOPE</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/treatment-support" className="text-gray-600 hover:text-pink-500">
                    Treatment Support
                  </Link>
                </li>
                <li>
                  <Link href="/services/emotional-guidance" className="text-gray-600 hover:text-pink-500">
                    Emotional Guidance
                  </Link>
                </li>
                <li>
                  <Link href="/services/care-coordination" className="text-gray-600 hover:text-pink-500">
                    Care Coordination
                  </Link>
                </li>
                <li>
                  <Link href="/services/recovery-assistance" className="text-gray-600 hover:text-pink-500">
                    Recovery Assistance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-pink-500">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about/team" className="text-gray-600 hover:text-pink-500">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/about/testimonials" className="text-gray-600 hover:text-pink-500">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/about/careers" className="text-gray-600 hover:text-pink-500">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-pink-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support-groups" className="text-gray-600 hover:text-pink-500">
                    Support Groups
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-pink-500">
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
