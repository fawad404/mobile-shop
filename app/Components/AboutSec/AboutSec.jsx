'use client'
import React from 'react';
import { ArrowRight, Smartphone, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import headerIphone from '@/public/assets/Images/header-Iphone.png'
import Link from 'next/link';
import Image from 'next/image';
const AboutPage = () => {
  const features = [
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Cutting-Edge Devices",
      description: "Access the latest smartphones with advanced features and technology."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Lightning-Fast Service",
      description: "Experience rapid repairs and efficient customer support."
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Unmatched Protection",
      description: "Safeguard your device with our comprehensive insurance plans."
    }
  ];

  const stats = [
    { value: "1M+", label: "Happy Customers" },
    { value: "50+", label: "Store Locations" },
    { value: "24/7", label: "Customer Support" },
    { value: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-gradient-to-br from-black via-gray-800 to-orange-700 min-h-[90vh] relative overflow-hidden rounded-b-[3rem] shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCAwTDUgNVpNNSAwTDAgNVoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')] opacity-20" />
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="space-y-8 z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight animate-fadeIn">
              Your One-Stop<br />Store For<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-black hover:from-black hover:to-orange-400 transition-all duration-300">
                Mobile
              </span>
            </h1>
            <p className="text-gray-200 max-w-md text-xl leading-relaxed">
              Best deals on all types of Mobile phones, Accessories, Trade-Ins & Repairs
            </p>
            <Link href='/shop'>
            <button className="group relative overflow-hidden bg-white text-black font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:text-white">
              <span className="relative z-10">Shop Now!</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full bg-gradient-to-r from-orange-500 to-black origin-left"></div>
            </button>
            </Link>
          </div>
          
          <div className="relative mt-12 md:mt-0">
            <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] animate-float">
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

      <main className="container mx-auto px-4 py-16">
        {/* Features Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">Our Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 group">
                <div className="p-8">
                  <div className="mb-6 text-black group-hover:text-orange-500 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-black transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-24 bg-gradient-to-r from-black to-orange-100 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHBhdGggZD0iTTAgMEw2MCA2MFpNNjAgMEwwIDYwWiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50" />
          <h2 className="text-4xl font-bold mb-12 text-center relative z-10 text-black">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <div className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-black to-orange-600">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-24">
          <h2 className="text-4xl font-bold mb-6 text-black">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join millions of satisfied customers and discover why NextGen Mobile is the leader in mobile innovation.
          </p>
          <Link href='/shop'>
          <button className="bg-gradient-to-r from-black to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-black transition-all duration-300 group shadow-lg hover:shadow-xl">
             Explore Our Products
            <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
        </section>
      </main>
      
    </div>
  );
};

export default AboutPage;

