'use client'
import React from 'react';

const AnimatedServiceSVG = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        {/* Enhanced Background with Gradient */}
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8F9FA" />
            <stop offset="100%" stopColor="#E9ECEF" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
          </filter>
        </defs>

        <circle
          cx="200"
          cy="150"
          r="130"
          fill="url(#bgGradient)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />

        {/* Enhanced Phone with Shadow */}
        <g filter="url(#shadow)">
          <rect x="140" y="70" width="80" height="160" rx="10" fill="#2D3748" />
          <rect x="145" y="75" width="70" height="150" rx="8" fill="#FFFFFF" />
          
          {/* Screen Content */}
          <rect x="150" y="80" width="60" height="140" fill="#F7FAFC" />
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <rect x="155" y="90" width="50" height="8" rx="2" fill="#E2E8F0" />
            <rect x="155" y="105" width="35" height="8" rx="2" fill="#E2E8F0" />
          </g>
        </g>

        {/* Animated Location Pin with Pulse Effect */}
        <g className="animate-bounce" style={{ animationDuration: '1.5s' }}>
          <circle 
            cx="180" 
            cy="140" 
            r="12" 
            fill="#FCD34D"
            className="animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <path 
            d="M180 130 C186 130 190 134 190 140 C190 148 180 160 180 160 C180 160 170 148 170 140 C170 134 174 130 180 130Z" 
            fill="#F59E0B"
          />
          <circle cx="180" cy="140" r="3" fill="white" />
        </g>

        {/* Enhanced Person */}
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          {/* Body with Gradient */}
          <rect x="50" y="100" width="40" height="80" fill="#F59E0B" rx="5" />
          
          {/* Head with better details */}
          <circle cx="70" cy="85" r="15" fill="#4B5563" />
          <circle cx="70" cy="82" r="12" fill="#6B7280" />
          
          {/* Improved Waving Arm */}
          <g className="origin-[70px_110px]" style={{
            animation: 'wave 2s ease-in-out infinite',
            transformBox: 'fill-box',
            transformOrigin: 'left'
          }}>
            <path 
              d="M80 110 C90 108 100 106 110 110" 
              stroke="#F59E0B" 
              strokeWidth="12" 
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Enhanced Tools */}
        <g className="origin-center" style={{
          animation: 'spin 4s linear infinite',
          transformOrigin: 'center'
        }}>
          <rect x="280" y="120" width="60" height="12" rx="6" fill="#4B5563" />
          <rect x="340" y="122" width="20" height="8" rx="4" fill="#F59E0B" />
          <circle cx="290" cy="126" r="4" fill="#9CA3AF" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(10deg); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedServiceSVG;

