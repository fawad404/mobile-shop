import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "../../Components/ui/Input"
import { Button } from "../../Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/ui/card"
import { Smartphone, PenToolIcon as Tool, CheckCircle, Truck, Package, AlertCircle, User, Info, Clipboard } from 'lucide-react'

const repairSteps = [
  { id: 1, title: 'Received', icon: Package, color: 'text-blue-500' },
  { id: 2, title: 'Diagnosing', icon: AlertCircle, color: 'text-yellow-500' },
  { id: 3, title: 'Repairing', icon: Tool, color: 'text-orange-500' },
  { id: 4, title: 'Testing', icon: Smartphone, color: 'text-purple-500' },
  { id: 5, title: 'Ready for Pickup', icon: CheckCircle, color: 'text-green-500' },
  { id: 6, title: 'Delivered', icon: Truck, color: 'text-indigo-500' },
]

// Temporary data for demonstration
const tempRepairData = {
  'REP001': { name: 'John Doe', currentStep: 3, device: 'iPhone 12', issue: 'Broken Screen', details: 'Screen has been replaced and is being tested.' },
  'REP002': { name: 'Jane Smith', currentStep: 5, device: 'Samsung Galaxy S21', issue: 'Battery Replacement', details: 'Battery has been replaced and is ready for pickup.' },
  'REP003': { name: 'Bob Johnson', currentStep: 1, device: 'Google Pixel 5', issue: 'Software Issue', details: 'Device has been received and is awaiting diagnosis.' },
  'REP004': { name: 'Alice Brown', currentStep: 2, device: 'OnePlus 9', issue: 'Camera Issue', details: 'Diagnosing the camera issue.' },
  'REP005': { name: 'Charlie Davis', currentStep: 4, device: 'iPhone SE', issue: 'Water Damage', details: 'Device is being tested after water damage repair.' },
}

export default function MobileRepairTracker() {
  const [ticketId, setTicketId] = useState('')
  const [name, setName] = useState('')
  const [repairStatus, setRepairStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const status = tempRepairData[ticketId]
    if (status && status.name.toLowerCase() === name.toLowerCase()) {
      setRepairStatus(status)
    } else {
      setRepairStatus(null)
      alert('No matching repair found. Please check your Ticket ID and Name.')
    }
  }

  return (
    <div className="p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Mobile Repair Tracker</CardTitle>
        </CardHeader>
        <CardContent>
        <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white  w-full max-w-md mx-auto "
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Track Your Repair</h2>
      <p className="text-gray-500 text-center mb-6">
        Enter your Ticket ID and Name to get repair details.
      </p>

      {/* Input: Ticket ID */}
      <div className="relative">
        
        <input
          type="text"
          placeholder="Ticket ID (e.g., REP001)"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          required
          className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 pl-10 rounded-lg w-full text-gray-800 placeholder-gray-400 transition duration-200"
        />
      </div>

      {/* Input: Name */}
      <div className="relative">
        
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 pl-10 rounded-lg w-full text-gray-800 placeholder-gray-400 transition duration-200"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow hover:shadow-lg"
      >
        Track Repair
      </button>
    </form>

          {repairStatus && (
  <div className="space-y-10 p-6 bg-gray-50 rounded-lg shadow-md">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Repair Status for {repairStatus.name}</h2>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2 text-gray-700">
          <User size={20} className="text-indigo-500" />
          <p className="text-lg font-medium">{repairStatus.name}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Smartphone size={20} className="text-indigo-500" />
          <p className="text-lg font-medium">{repairStatus.device}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <AlertCircle size={20} className="text-indigo-500" />
          <p className="text-lg font-medium">{repairStatus.issue}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Clipboard size={20} className="text-indigo-500" />
          <p className="text-lg font-medium">{repairStatus.details}</p>
        </div>
      </div>
    </div>

    <div className="relative mt-8">
      <div className="relative z-10 space-y-6">
        {repairSteps.map((step) => (
          <motion.div
            key={step.id}
            className={`flex items-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform ${
              step.id <= repairStatus.currentStep ? 'bg-white scale-105' : 'bg-gray-100'
            }`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: step.id * 0.1 }}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md ${
                step.id <= repairStatus.currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              <step.icon size={24} />
            </div>
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              {step.id === repairStatus.currentStep && (
                <p className="text-sm text-indigo-500 font-medium">Current Status</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
)}
        </CardContent>
      </Card>
    </div>
  )
}

