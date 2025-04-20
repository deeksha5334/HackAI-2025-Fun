"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, ChevronRight, Heart, FileText, Droplet, PlusCircle, X } from "lucide-react"
import { ChatbotDialog } from "@/components/chatbot-dialog"
import { CalmCorner } from "@/components/calm-corner"
import { ReportCard } from "@/components/report-card"
import { ChatMessage } from "@/components/chat-message"
import { NavigationBar } from "@/components/navigation-bar"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function Dashboard() {
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [calmCornerOpen, setCalmCornerOpen] = useState(false)

  const reports = [
    { id: 1, type: "Mammogram", date: "24 April '23", status: "Reviewed" },
    { id: 2, type: "Ultrasound", date: "24 April '23", status: "Reviewed" },
    { id: 3, type: "Biopsy", date: "15 March '23", status: "Reviewed" },
    { id: 4, type: "Blood Work", date: "10 March '23", status: "Reviewed" },
  ]

  const chatHistory = [
    {
      id: 1,
      sender: "Dr. Agastya Ram",
      avatar: "/Users/riyan/Desktop/Group 37.png",
      message:
        "Your latest blood work shows improvement in white blood cell count. Continue with the current medication regimen.",
      time: "Yesterday",
      type: "doctor",
    },
    {
      id: 2,
      sender: "Care+ Assistant",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "Reminder: Your appointment with Dr. Shilpa is scheduled for June 22nd. Please arrive 15 minutes early.",
      time: "3 days ago",
      type: "assistant",
    },
    {
      id: 3,
      sender: "Dr. Shimron Hetmyer",
      avatar: "/placeholder.svg?height=40&width=40",
      message: "The latest scan shows the tumor has reduced in size by 15%. This is a positive response to treatment.",
      time: "1 week ago",
      type: "doctor",
    },
  ]

  const upcomingVisits = [
    {
      id: 1,
      type: "Complete Blood Count (CBC)",
      date: "15 June '23",
      doctor: "Dr. Shimron Hetmyer",
    },
    {
      id: 2,
      type: "Clinic Visit Appointment",
      date: "22 June '23",
      doctor: "Dr. Shilpa Rao",
    },
  ]

  const medications = [
    { id: 1, name: "Albutin", dosage: "20mg", pills: 1 },
    { id: 2, name: "Vitamin D", dosage: "100mg", pills: 2 },
    { id: 3, name: "Aspirin", dosage: "100mg", pills: 2 },
  ]

  return (
    <div className="container mx-auto px-4 pb-20">
      <NavigationBar />

      <div className="mt-6 rounded-xl bg-gradient-to-r from-pink-100 to-pink-200 p-6 shadow-md">
        <div className="text-sm text-pink-700">Diagnosis</div>
        <h1 className="text-3xl font-bold text-pink-600">Invasive Ductal Carcinoma</h1>
        <div className="mt-1 text-pink-600">Breast Cancer - Stage 2A</div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile */}
        <Card className="bg-white/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-pink-500">Welcome, Natasha</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 bg-pink-200">
              <AvatarFallback className="text-4xl text-pink-500">NJ</AvatarFallback>
            </Avatar>
            <div className="mt-4 rounded-full border border-dashed border-pink-300 px-6 py-2 text-center">Natasha Julie</div>
            <div className="mt-6 w-full rounded-lg bg-pink-100 p-4">
              <div className="text-sm text-pink-500">Patient ID</div>
              <div className="font-medium">BC-2023-0042</div>
            </div>
            <div className="mt-4 w-full rounded-lg bg-pink-100 p-4">
              <div className="text-sm text-pink-500">Age</div>
              <div className="font-medium">42</div>
            </div>
            <div className="mt-6 w-full space-y-4">
              <Button variant="outline" className="w-full justify-between" asChild>
                <a href="#">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-pink-500" />
                    View Appointments
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <a href="#">
                  <div className="flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4 text-pink-500" />
                    Request Appointment
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports */}
        <Card className="bg-white/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-pink-500">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
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
              <TabsContent value="all" className="mt-4 grid grid-cols-2 gap-4">
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </TabsContent>
              <TabsContent value="mammograms" className="mt-4 grid grid-cols-2 gap-4">
                {reports
                  .filter((r) => r.type === "Mammogram")
                  .map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
              </TabsContent>
              <TabsContent value="ultrasounds" className="mt-4 grid grid-cols-2 gap-4">
                {reports
                  .filter((r) => r.type === "Ultrasound")
                  .map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
              </TabsContent>
            </Tabs>
            <div className="mt-4 flex justify-end">
              <Button variant="link" className="text-pink-500" asChild>
                <a href="#">
                  View All Reports <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chat History */}
        <Card className="bg-white/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-pink-500">Chat History</CardTitle>
            <Button variant="link" className="text-pink-500" asChild>
              <a href="#">View All</a>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chatHistory.map((chat) => (
                <ChatMessage key={chat.id} message={chat} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Visits */}
        <Card className="bg-white/80 shadow-md md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-pink-500">Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="rounded-lg bg-pink-100 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {visit.type.includes("Blood") ? (
                        <div className="mr-4 rounded-full bg-pink-300 p-3">
                          <Droplet className="h-5 w-5 text-pink-600" />
                        </div>
                      ) : (
                        <div className="mr-4 rounded-full bg-pink-300 p-3">
                          <FileText className="h-5 w-5 text-pink-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{visit.type}</h3>
                        <div className="flex items-center mt-1">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-pink-200 text-pink-600 text-xs">
                              {visit.doctor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-pink-600">{visit.doctor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-pink-600">{visit.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Medication */}
        <Card className="bg-white/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-pink-500">Today's Medication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-pink-300 p-2">
                      <span className="text-xs font-bold text-pink-600">{med.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium">{med.name}</div>
                      <div className="text-sm text-gray-500">{med.dosage}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-pink-100 text-pink-600">
                    {med.pills} {med.pills === 1 ? "pill" : "pills"}
                  </Badge>
                </div>
              ))}
              <Separator className="my-2 bg-pink-100" />
              <div className="flex justify-end">
                <Button variant="link" className="text-pink-500" asChild>
                  <a href="#">
                    View Full Schedule <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton />

      {/* Chatbot Dialog */}
      <ChatbotDialog open={chatbotOpen} onOpenChange={setChatbotOpen} />

      {/* Calm Corner Widget */}
      <div className="fixed right-4 top-20 z-50">
        <Button
          onClick={() => setCalmCornerOpen(!calmCornerOpen)}
          className="rounded-full bg-pink-400 p-3 shadow-lg hover:bg-pink-500"
          size="icon"
        >
          {calmCornerOpen ? <X className="h-5 w-5 text-white" /> : <Heart className="h-5 w-5 text-white" />}
        </Button>
      </div>

      {calmCornerOpen && <CalmCorner />}
    </div>
  )
}
