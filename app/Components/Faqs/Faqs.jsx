'use client'
import { React, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "What types of phones do you offer?",
    answer: "We offer a wide range of mobile phones, including the latest models from popular brands such as Apple, Samsung, Google, and more. We also have a selection of refurbished phones for budget-conscious customers."
  },
  {
    question: "Do you provide repair services for all phone brands?",
    answer: "Yes, our expert technicians are trained to repair most major phone brands. We can handle issues ranging from screen replacements to battery changes and software problems. If we can't fix it, you don't pay!"
  },
  {
    question: "What is your warranty policy on repaired phones?",
    answer: "We offer a 90-day warranty on all our repair services. If you experience the same issue within this period, we'll fix it free of charge. For refurbished phones, we provide a 6-month warranty."
  },
  {
    question: "Can I trade in my old phone?",
    answer: "We offer a trade-in program where you can exchange your old phone for credit towards a new purchase or for cash. The trade-in value depends on the model and condition of your device."
  },
  {
    question: "Do you offer any financing options?",
    answer: "Yes, we partner with several financing providers to offer flexible payment plans. This allows you to spread the cost of your new phone over several months. Terms and conditions apply, and approval is subject to credit check."
  }
]

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-blue-200/20">
      <button
        className="flex justify-between items-center w-full py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium ">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 " />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-5 text-gray-800/80">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-white to-amber-300 text-black  py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    
  )
}

