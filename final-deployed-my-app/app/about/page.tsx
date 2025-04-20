"use client"

import { Button } from "@/components/ui/button"
import { Heart, Users, Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function AboutPage() {
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
            <div className="text-pink-500 font-medium mb-4">ABOUT US</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 leading-tight mb-6">
              Our Mission & Vision
            </h1>
            <p className="text-lg text-pink-700 mb-8 max-w-2xl mx-auto">
              HerHope was founded with a simple but powerful mission: to provide compassionate, personalized support to
              women facing breast cancer.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-100 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-peach-100 rounded-full"></div>
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Our founder"
                  className="rounded-2xl shadow-xl relative z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                HerHope was founded in 2020 by Sarah Johnson, a breast cancer survivor who experienced firsthand the
                challenges of navigating treatment and recovery. During her journey, Sarah recognized the need for more
                personalized, compassionate support for women facing breast cancer.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a small support group has grown into a comprehensive care organization that has helped
                thousands of women across the country. Our team of dedicated professionals and volunteers work
                tirelessly to ensure that no woman faces breast cancer alone.
              </p>
              <p className="text-gray-600 mb-6">
                Today, HerHope continues to expand its services and reach, with a commitment to providing the highest
                quality care and support to women throughout their breast cancer journey.
              </p>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white" asChild>
                <Link href="/about/team">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide everything we do at HerHope, from how we interact with our clients to how we
              develop our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Compassion</h3>
              <p className="text-gray-600">
                We approach every interaction with empathy, understanding, and genuine care for the well-being of our
                clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in the power of connection and support, creating a community where women can find strength
                together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to providing the highest quality care and continuously improving our services to meet
                the needs of our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-gray-600">
              Since our founding, we've made a meaningful difference in the lives of thousands of women facing breast
              cancer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-pink-50 rounded-xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">5,000+</div>
              <p className="text-gray-700">Women supported</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-pink-50 rounded-xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">24/7</div>
              <p className="text-gray-700">Support availability</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-pink-50 rounded-xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">98%</div>
              <p className="text-gray-700">Client satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-pink-50 rounded-xl p-6 text-center"
            >
              <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
              <p className="text-gray-700">Care specialists</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-peach-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">Join us in our mission</h2>
            <p className="text-lg text-pink-700 mb-8">
              Whether you're seeking support or looking to contribute to our cause, we welcome you to the HerHope
              family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8" asChild>
                <Link href="/auth/sign-up">Get Support</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-300 text-pink-600 hover:bg-pink-50 rounded-full px-8"
                asChild
              >
                <Link href="/volunteer">Volunteer</Link>
              </Button>
            </div>
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
