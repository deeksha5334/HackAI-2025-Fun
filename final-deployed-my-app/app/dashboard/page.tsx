"use client"
import { NavigationBar } from "@/components/navigation-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, FileText, ChevronRight, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-peach-100 to-cream-100">
      <header className="bg-white/90 sticky top-0 z-50 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4">
          <NavigationBar isLoggedIn={true} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Diagnosis Card */}
        <div className="bg-pink-100 rounded-xl p-6 mb-8 relative">
          <div className="absolute top-4 right-4 text-pink-400">
            <Heart className="h-6 w-6" />
          </div>
          <div className="text-pink-600 font-medium mb-1">Diagnosis</div>
          <h1 className="text-3xl font-bold text-pink-700 mb-1">Invasive Ductal Carcinoma</h1>
          <div className="text-pink-600">Breast Cancer - Stage 2A</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* User Profile */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-pink-600 mb-6">User Profile</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center text-3xl font-light text-pink-400 mb-4">
                UN
              </div>
              <div className="px-4 py-1 border border-pink-200 rounded-full text-pink-600">UserName</div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-4">
              <div className="text-pink-400 text-sm mb-1">Patient ID</div>
              <div className="font-semibold">BC-2023-0042</div>
            </div>

            <div className="bg-pink-50 rounded-lg p-4 mb-6">
              <div className="text-pink-400 text-sm mb-1">Age</div>
              <div className="font-semibold">42</div>
            </div>

            <Button variant="outline" className="w-full justify-between mb-3 text-pink-600 border-pink-200" asChild>
              <Link href="/dashboard/appointments">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-pink-500" />
                  View Appointments
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" className="w-full justify-between text-pink-600 border-pink-200" asChild>
              <Link href="/dashboard/request-appointment">
                <div className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4 text-pink-500" />
                  Request Appointment
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-pink-600 mb-6">Reports</h2>

            <Tabs defaultValue="all-reports">
              <TabsList className="bg-pink-50 mb-6">
                <TabsTrigger
                  value="all-reports"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  All Reports
                </TabsTrigger>
                <TabsTrigger
                  value="mammograms"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  Mammograms
                </TabsTrigger>
                <TabsTrigger
                  value="ultrasounds"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
                >
                  Ultrasounds
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all-reports" className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Mammogram</div>
                    <div className="text-sm text-gray-500">24 April '23</div>
                  </div>
                </div>

                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Ultrasound</div>
                    <div className="text-sm text-gray-500">24 April '23</div>
                  </div>
                </div>

                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Biopsy</div>
                    <div className="text-sm text-gray-500">15 March '23</div>
                  </div>
                </div>

                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Blood Work</div>
                    <div className="text-sm text-gray-500">10 March '23</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mammograms">
                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Mammogram</div>
                    <div className="text-sm text-gray-500">24 April '23</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ultrasounds">
                <div className="bg-pink-50/50 rounded-lg p-4 relative">
                  <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Reviewed
                  </div>
                  <div className="flex justify-center mb-3">
                    <FileText className="h-10 w-10 text-pink-400" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Ultrasound</div>
                    <div className="text-sm text-gray-500">24 April '23</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-right mt-4">
              <Link
                href="/dashboard/reports"
                className="text-pink-500 hover:text-pink-600 text-sm flex items-center justify-end"
              >
                View All Reports
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Chat History */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-pink-600">Chat History</h2>
              <Link href="/dashboard/chat" className="text-pink-500 hover:text-pink-600 text-sm">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4 py-1">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-pink-600">Dr. Kartik Aryan</div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
                <p className="text-sm text-gray-700">
                  Your latest blood work shows improvement in white blood cell count. Continue with the current
                  medication regimen.
                </p>
              </div>

              <div className="border-l-4 border-pink-300 pl-4 py-1">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-pink-500">Care+ Assistant</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
                <p className="text-sm text-gray-700">
                  Reminder: Your appointment with Dr. Shilpa is scheduled for June 22nd. Please arrive 15 minutes early.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-4 py-1">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-pink-600">Dr. Shimron Hetmyer</div>
                  <div className="text-xs text-gray-500">1 week ago</div>
                </div>
                <p className="text-sm text-gray-700">
                  The latest scan shows the tumor has reduced in size by 15%. This is a positive response to treatment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Visits */}
          <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-pink-600 mb-6">Upcoming Visits</h2>

            <div className="space-y-4">
              <div className="bg-pink-50/50 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                  <div className="text-pink-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-droplet"
                    >
                      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Complete Blood Count (CBC)</div>
                  <div className="flex items-center text-sm text-pink-600">
                    <span className="bg-pink-200 text-pink-700 px-1 rounded text-xs mr-2">DSH</span>
                    Dr. Shimron Hetmyer
                  </div>
                </div>
                <div className="text-right text-pink-500">15 June '23</div>
              </div>

              <div className="bg-pink-50/50 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                  <div className="text-pink-600">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Clinic Visit Appointment</div>
                  <div className="flex items-center text-sm text-pink-600">
                    <span className="bg-pink-200 text-pink-700 px-1 rounded text-xs mr-2">DSR</span>
                    Dr. Shilpa Rao
                  </div>
                </div>
                <div className="text-right text-pink-500">22 June '23</div>
              </div>
            </div>
          </div>

          {/* Today's Medication */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-pink-600 mb-6">Today's Medication</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-medium">A</span>
                  </div>
                  <div>
                    <div className="font-medium">Albutin</div>
                    <div className="text-sm text-gray-500">20mg</div>
                  </div>
                </div>
                <div className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">1 pill</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-medium">V</span>
                  </div>
                  <div>
                    <div className="font-medium">Vitamin D</div>
                    <div className="text-sm text-gray-500">100mg</div>
                  </div>
                </div>
                <div className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">2 pills</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-medium">A</span>
                  </div>
                  <div>
                    <div className="font-medium">Aspirin</div>
                    <div className="text-sm text-gray-500">100mg</div>
                  </div>
                </div>
                <div className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">2 pills</div>
              </div>
            </div>

            <div className="text-right mt-6">
              <Link
                href="/dashboard/medication"
                className="text-pink-500 hover:text-pink-600 text-sm flex items-center justify-end"
              >
                View Full Schedule
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-6 flex items-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
            <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
          </svg>
          Chat with Care+
        </Button>
      </div>
    </div>
  )
}
