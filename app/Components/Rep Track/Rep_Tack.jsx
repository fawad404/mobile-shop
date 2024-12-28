'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/app/Components/ui/input"
import { Button } from "@/app/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/Components/ui/card"
import { Smartphone, PenToolIcon as Tool, CheckCircle, Truck, Package, AlertCircle, ArrowLeft, Clock, Calendar, User } from 'lucide-react'

const repairSteps = [
  { id: 1, title: 'Received', icon: Package, color: 'text-blue-500', description: 'Your device has been received at our repair center.' },
  { id: 2, title: 'Diagnosing', icon: AlertCircle, color: 'text-yellow-500', description: 'Our technicians are diagnosing the issue with your device.' },
  { id: 3, title: 'Repairing', icon: Tool, color: 'text-orange-500', description: 'Repairs are in progress on your device.' },
  { id: 4, title: 'Testing', icon: Smartphone, color: 'text-purple-500', description: 'Your device is undergoing final testing to ensure quality.' },
  { id: 5, title: 'Ready for Pickup', icon: CheckCircle, color: 'text-green-500', description: 'Your device is repaired and ready for pickup.' },
  { id: 6, title: 'Delivered', icon: Truck, color: 'text-indigo-500', description: 'Your device has been delivered or picked up.' },
]

// Temporary data for demonstration
const tempRepairData = {
  'REP001': { 
    name: 'John Doe', 
    currentStep: 3, 
    device: 'iPhone 12', 
    issue: 'Broken Screen',
    estimatedCompletion: '2023-12-20',
    lastUpdate: '2023-12-18 14:30',
    technician: 'Mike Smith'
  },
  'REP002': { 
    name: 'Jane Smith', 
    currentStep: 5, 
    device: 'Samsung Galaxy S21', 
    issue: 'Battery Replacement',
    estimatedCompletion: '2023-12-19',
    lastUpdate: '2023-12-18 16:45',
    technician: 'Sarah Johnson'
  },
  'REP003': { 
    name: 'Bob Johnson', 
    currentStep: 1, 
    device: 'Google Pixel 5', 
    issue: 'Software Issue',
    estimatedCompletion: '2023-12-22',
    lastUpdate: '2023-12-18 09:15',
    technician: 'Alex Brown'
  },
}

export default function MobileRepairTracker() {
  const [ticketId, setTicketId] = useState('')
  const [name, setName] = useState('')
  const [repairStatus, setRepairStatus] = useState(null)
  const [showForm, setShowForm] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const status = tempRepairData[ticketId]
    if (status && status.name.toLowerCase() === name.toLowerCase()) {
      setRepairStatus(status)
      setShowForm(false)
    } else {
      setRepairStatus(null)
      alert('No matching repair found. Please check your Ticket ID and Name.')
    }
  }

  const handleBack = () => {
    setShowForm(true)
    setRepairStatus(null)
    setTicketId('')
    setName('')
  }

  return (
    <div className=" bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">
      <Card className="max-w-4xl mx-auto shadow-2xl mt-28">
        <CardHeader className="bg-gradient-to-br from-[#d1d5db] via-[#6b7280] to-[#374151]">
          <CardTitle className="text-3xl font-bold text-center">Mobile Repair Tracker</CardTitle>
          <CardDescription className="text-center text-blue-100">Track the status of your device repair</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
                    <Input
                      id="ticketId"
                      type="text"
                      placeholder="e.g., REP001"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="flex mx-auto px-4 py-4 bg-orange-600 hover:bg-orange-500/95 text-white">
                    Track Repair
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <Button onClick={handleBack} variant="outline" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tracker
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Repair Status for {repairStatus.name}</h2>
                  <p className="text-gray-600">Ticket ID: {ticketId}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard icon={Smartphone} title="Device" content={repairStatus.device} />
                  <InfoCard icon={AlertCircle} title="Issue" content={repairStatus.issue} />
                  <InfoCard icon={Calendar} title="Est. Completion" content={repairStatus.estimatedCompletion} />
                  <InfoCard icon={Clock} title="Last Update" content={repairStatus.lastUpdate} />
                  <InfoCard icon={User} title="Technician" content={repairStatus.technician} />
                </div>
                <div className="relative pt-8">
                 
                  <div className="relative z-10">
                    {repairSteps.map((step) => (
                      <motion.div
                        key={step.id}
                        className={`flex items-start mb-8 ${
                          step.id <= repairStatus.currentStep ? 'opacity-100' : 'opacity-50'
                        }`}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: step.id * 0.1 }}
                      >
                        <div className={`rounded-full p-2 ${step.color} bg-white shadow-lg`}>
                          <step.icon size={24} />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          {step.id === repairStatus.currentStep && (
                            <p className="text-sm font-semibold text-blue-600 mt-1">Current Status</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoCard({ icon: Icon, title, content }) {
  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-4 flex items-center">
        <Icon className="h-8 w-8 text-blue-500 mr-4" />
        <div>
          <h3 className="font-semibold text-gray-700">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </CardContent>
    </Card>
  )
}

