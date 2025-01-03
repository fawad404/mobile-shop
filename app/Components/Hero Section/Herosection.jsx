'use client'
import React from 'react'
import headerIphone from '@/public/assets/Images/header-Iphone.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] via-[#9ca3af] to-[#4b5563] min-h-[85vh] relative overflow-hidden rounded-3xl  my-4 shadow-2xl">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 mt-16">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 md:space-y-8 z-10 md:flex-1"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight">
            Your One-Stop<br />Store For<br />
            <span className="text-orange-500 hover:text-orange-400 transition-colors duration-300 relative">
              Mobile
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </h1>
          
          <p className="text-gray-700 max-w-md text-base sm:text-lg md:text-xl leading-relaxed">
            Best deals on all types of Mobile phones, Mobile Accessories, Mobile Trade In & Mobile Repair
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10">
              <a href="/Shop" className="flex items-center">
                Shop Now!
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </span>
            <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-black origin-left"></div>
          </motion.button>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-12 md:mt-0 md:flex-1"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] mx-auto md:mt-16">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
              className="relative w-full h-full"
            >
              <Image
                src={headerIphone}
                alt="iPhone front view"
                fill
                priority
                className="object-contain transform hover:scale-105 transition-transform duration-300 filter drop-shadow-2xl"
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-3xl opacity-30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


