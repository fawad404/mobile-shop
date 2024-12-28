'use client'
import React from 'react'
import headerIphone from '@/public/assets/Images/header-Iphone.png'
import Image from 'next/image';
import { motion } from 'framer-motion';
export default function HeroSection() {

    return (
      <div className="bg-gradient-to-br from-[#d1d5db] via-[#6b7280] to-[#374151] min-h-[85vh] relative overflow-hidden rounded-3xl md:p-16 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto max-sm:mt-32">
          <div className="space-y-6 md:space-y-8 z-10 p-6 md:p-0">
            <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight animate-fadeIn">
              Your One-Stop<br />Store For<br />
              <span className="text-orange-500 hover:text-orange-400 transition-colors duration-300">
                Mobile
              </span>
            </h1>
            <p className="text-gray-700 max-w-md text-lg md:text-xl leading-relaxed">
              Best deals on all types of Mobile phones, Mobile Accessories, Mobile Trade In & Mobile Repair
            </p>
            <button className="group relative overflow-hidden bg-orange-500 text-white font-bold px-10 py-4 rounded-full text-lg transition-all duration-300">
              <span className="relative z-10"><a href="/shop">Shop Now!</a></span>
              <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full bg-black origin-center"></div>
            </button>
          </div>
          
          <div className="relative mt-12 md:mt-0">
            <div className="relative w-[450px] h-[450px] md:w-[600px] md:h-[600px] animate-float">
            <motion.div 
              className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Image
                              src={headerIphone}
                              alt="iPhone front view"
                              width={6000}
                              height={6000}
                              className="absolute top-0 right-0 w-auto transform rotate-12 z-20 hover:scale-105 transition-transform duration-300"
                            />
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    )
  }


