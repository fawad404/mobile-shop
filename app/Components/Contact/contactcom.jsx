'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/app/Components/ui/card"
import { Input } from "@/app/Components/ui/input"
import { Textarea } from "@/app/Components/ui/textarea"
import { Button } from "@/app/Components/ui/button"
import { Label } from "@/app/Components/ui/label"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/app/Components/ui/alert-dialog"
import { Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      {/* Header Section */}
      <header className="px-4 md:px-8 lg:px-16 relative overflow-hidden py-32">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-black">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">We're here to help and answer any question you might have.</p>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-black-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
      </header>

      {/* Contact Info Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white shadow-inner">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <ContactCard icon={<Phone className="text-orange-600" size={24} />} title="Phone" content="+1 (555) 123-4567" />
          <ContactCard icon={<Mail className="text-orange-600" size={24} />} title="Email" content="contact@example.com" />
          <ContactCard icon={<MapPin className="text-orange-600" size={24} />} title="Address" content="123 Main St, Anytown, USA" />
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border border-gray-100 p-8 relative z-10">
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 text-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 text-gray-900"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="text-gray-700 font-medium">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 text-gray-900"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 text-gray-900"
                  rows={4}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-black text-white hover:from-orange-700 hover:to-black transform hover:scale-[1.02] transition-all duration-200"
              >
                Send Message
                <Send className="ml-2" size={16} />
              </Button>
            </motion.form>
          </Card>
        </div>
      </section>

      <AlertDialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <AlertDialogContent className="bg-white border-0 shadow-2xl rounded-2xl p-6 max-w-md mx-auto transform transition-all duration-300 ease-in-out">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AlertDialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <AlertDialogTitle className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-black">
                Message Sent Successfully!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-center mb-6">
                Thank you for reaching out! We'll get back to you within 24 hours.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center">
              <Button 
                onClick={() => setIsSubmitted(false)} 
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-black text-white rounded-lg font-medium hover:from-orange-700 hover:to-black transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Got it, thanks!
              </Button>
            </AlertDialogFooter>
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function ContactCard({ icon, title, content }) {
  return (
    <Card className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center text-center">
      <div className="mb-4 p-3 bg-orange-50 rounded-full">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </Card>
  )
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-700 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        <ArrowRight className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-300">{answer}</p>
      )}
    </div>
  )
}

