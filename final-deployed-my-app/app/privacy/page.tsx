"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/90 sticky top-0 z-50 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4">
          <NavigationBar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">Privacy Policy</h1>

          <div className="prose prose-pink max-w-none">
            <p>Last updated: April 20, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              At HerHope, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our website, mobile applications, and services (collectively,
              the "Services").
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect information about you in various ways, including:</p>
            <ul>
              <li>Information you provide to us directly</li>
              <li>Information we collect automatically when you use our Services</li>
              <li>Information from third parties</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use your information for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our Services</li>
              <li>To personalize your experience</li>
              <li>To communicate with you</li>
              <li>To improve our Services</li>
              <li>For research and analytics</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers</li>
              <li>Business partners</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>5. Your Choices</h2>
            <p>You have certain choices regarding the use of your information, including:</p>
            <ul>
              <li>Opting out of marketing communications</li>
              <li>Accessing and updating your information</li>
              <li>Deleting your account</li>
            </ul>

            <h2>6. Security</h2>
            <p>
              We implement appropriate security measures to protect your information. However, no method of transmission
              over the Internet or electronic storage is 100% secure.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our Services are not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@herhope.com.</p>
          </div>
        </div>
      </main>

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
