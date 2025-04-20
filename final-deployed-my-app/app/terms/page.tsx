"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/90 sticky top-0 z-50 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4">
          <NavigationBar />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">Terms of Service</h1>

          <div className="prose prose-pink max-w-none">
            <p>Last updated: April 20, 2025</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to HerHope. These Terms of Service ("Terms") govern your use of our website, mobile applications,
              and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by
              these Terms.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
              that you meet this eligibility requirement.
            </p>

            <h2>3. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and
              disclose information about you.
            </p>

            <h2>4. User Accounts</h2>
            <p>
              To access certain features of our Services, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities that occur under your
              account.
            </p>

            <h2>5. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the rights of others</li>
              <li>Use our Services for any illegal or unauthorized purpose</li>
              <li>Interfere with or disrupt our Services</li>
              <li>Attempt to gain unauthorized access to our Services</li>
            </ul>

            <h2>6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Services at any time, for any reason,
              without notice.
            </p>

            <h2>7. Disclaimer of Warranties</h2>
            <p>Our Services are provided "as is" and "as available" without any warranties of any kind.</p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, HerHope shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Your continued use of our Services after any changes indicates your
              acceptance of the modified Terms.
            </p>

            <h2>10. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at legal@herhope.com.</p>
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
