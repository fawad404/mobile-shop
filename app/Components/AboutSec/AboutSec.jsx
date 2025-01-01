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
      <div className="bg-gradient-to-br from-[#f3f4f6] via-[#9ca3af] to-[#4b5563] min-h-[85vh] relative overflow-hidden rounded-3xl  my-4 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-2xl mx-auto px-6 py-12 md:py-16 lg:py-20 mt-16">
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
              
             <Link href='/shop'>
            <button className="group relative overflow-hidden mt-4 bg-white text-black font-bold px-10 py-4 rounded-full text-lg transition-all duration-300 hover:text-white">
              <span className="relative z-10">Shop Now!</span>
              <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full bg-orange-500 to-black origin-left"></div>
            </button>
            </Link>
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
          <button className=" bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600  transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-95">
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

