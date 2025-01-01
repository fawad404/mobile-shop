'use client'
import React from 'react';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Plan Your Goals",
    description: "Outline your project objectives and set clear, actionable goals to achieve success.",
    icon: <FileText size={48} className="text-orange-500" />,
  },
  {
    id: 2,
    title: "Design the Strategy",
    description: "Craft a personalized approach to streamline your workflow with modern tools.",
    icon: <CheckCircle size={48} className="text-orange-500" />,
  },
  {
    id: 3,
    title: "Achieve Milestones",
    description: "Track progress and celebrate key achievements along the way to project completion.",
    icon: <ArrowRight size={48} className="text-orange-500" />,
  },
];

const EnhancedSteps = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-16 relative overflow-hidden">
      {/* Background Blob SVG */}
      <svg
        className="absolute -top-10 -left-20 w-96 opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 600"
      >
        <g fill="#ff9800" opacity="0.1">
          <circle cx="200" cy="200" r="200" />
          <circle cx="600" cy="400" r="300" />
        </g>
      </svg>

      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
          How It Works
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white shadow-lg rounded-lg p-8 relative group hover:bg-gradient-to-br hover:from-orange-500 hover:to-black transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              {/* Icon */}
              <div className="flex justify-center items-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">
                {step.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600 group-hover:text-gray-200 transition-colors">
                {step.description}
              </p>
              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-orange-500 rounded-lg transition-all"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Shape SVG */}
      <svg
        className="absolute -bottom-20 right-0 w-40 opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon points="50,0 100,100 0,100" fill="#ff9800" />
      </svg>
    </section>
  );
};

export default EnhancedSteps;
