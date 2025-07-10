"use client";
import React, { useState, useEffect } from "react";

const AnimatedFlowerFrame = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        {/* Animated Flower Frame SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 400 500"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Main Frame Path - starts from bottom center and goes around */}
          <path
            d="M200 480 Q120 480 80 420 Q40 360 40 280 L40 120 Q40 60 80 30 Q120 0 200 0 Q280 0 320 30 Q360 60 360 120 L360 280 Q360 360 320 420 Q280 480 200 480"
            fill="none"
            stroke="url(#frameGradient)"
            strokeWidth="3"
            className="transition-all duration-3000 ease-in-out"
            style={{
              strokeDasharray: isAnimating ? "none" : "1200",
              strokeDashoffset: isAnimating ? "0" : "1200",
              opacity: isAnimating ? 1 : 0,
            }}
          />

          {/* Bottom Center Flowers - Starting Point */}
          <g
            className={`transition-all duration-1000 delay-1000 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <circle cx="200" cy="470" r="10" fill="#ff6b9d" opacity="0.8" />
            <circle cx="195" cy="465" r="8" fill="#ff8fab" opacity="0.7" />
            <circle cx="205" cy="465" r="8" fill="#ff8fab" opacity="0.7" />
            <circle cx="200" cy="460" r="6" fill="#ffb3c6" opacity="0.5" />
            <circle cx="190" cy="470" r="4" fill="#ffc8dd" opacity="0.6" />
            <circle cx="210" cy="470" r="4" fill="#ffc8dd" opacity="0.6" />
          </g>

          {/* Left Side Flowers */}
          <g
            className={`transition-all duration-1000 delay-1500 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {/* Bottom left */}
            <circle cx="60" cy="350" r="8" fill="#c77dff" opacity="0.8" />
            <circle cx="55" cy="345" r="6" fill="#d4a5ff" opacity="0.6" />
            <circle cx="65" cy="345" r="6" fill="#d4a5ff" opacity="0.6" />

            {/* Mid left */}
            <circle cx="50" cy="240" r="7" fill="#ff6b9d" opacity="0.7" />
            <circle cx="45" cy="235" r="5" fill="#ff8fab" opacity="0.5" />
            <circle cx="55" cy="235" r="5" fill="#ff8fab" opacity="0.5" />

            {/* Top left */}
            <circle cx="70" cy="120" r="6" fill="#c77dff" opacity="0.6" />
            <circle cx="65" cy="115" r="4" fill="#d4a5ff" opacity="0.4" />
            <circle cx="75" cy="115" r="4" fill="#d4a5ff" opacity="0.4" />
          </g>

          {/* Top Flowers */}
          <g
            className={`transition-all duration-1000 delay-2000 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {/* Center top */}
            <circle cx="200" cy="10" r="12" fill="#ff6b9d" opacity="0.9" />
            <circle cx="195" cy="5" r="9" fill="#ff8fab" opacity="0.7" />
            <circle cx="205" cy="5" r="9" fill="#ff8fab" opacity="0.7" />
            <circle cx="200" cy="0" r="6" fill="#ffb3c6" opacity="0.5" />

            {/* Left top */}
            <circle cx="150" cy="25" r="7" fill="#c77dff" opacity="0.7" />
            <circle cx="145" cy="20" r="5" fill="#d4a5ff" opacity="0.5" />

            {/* Right top */}
            <circle cx="250" cy="25" r="7" fill="#c77dff" opacity="0.7" />
            <circle cx="255" cy="20" r="5" fill="#d4a5ff" opacity="0.5" />
          </g>

          {/* Right Side Flowers */}
          <g
            className={`transition-all duration-1000 delay-2500 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {/* Top right */}
            <circle cx="330" cy="120" r="6" fill="#ff6b9d" opacity="0.6" />
            <circle cx="325" cy="115" r="4" fill="#ff8fab" opacity="0.4" />
            <circle cx="335" cy="115" r="4" fill="#ff8fab" opacity="0.4" />

            {/* Mid right */}
            <circle cx="350" cy="240" r="7" fill="#c77dff" opacity="0.7" />
            <circle cx="345" cy="235" r="5" fill="#d4a5ff" opacity="0.5" />
            <circle cx="355" cy="235" r="5" fill="#d4a5ff" opacity="0.5" />

            {/* Bottom right */}
            <circle cx="340" cy="350" r="8" fill="#ff6b9d" opacity="0.8" />
            <circle cx="335" cy="345" r="6" fill="#ff8fab" opacity="0.6" />
            <circle cx="345" cy="345" r="6" fill="#ff8fab" opacity="0.6" />
          </g>

          {/* Decorative Leaves */}
          <g
            className={`transition-all duration-1000 delay-3000 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {/* Bottom leaves */}
            <ellipse
              cx="170"
              cy="475"
              rx="18"
              ry="8"
              fill="#90EE90"
              opacity="0.6"
              transform="rotate(-30 170 475)"
            />
            <ellipse
              cx="230"
              cy="475"
              rx="18"
              ry="8"
              fill="#90EE90"
              opacity="0.6"
              transform="rotate(30 230 475)"
            />
            <ellipse
              cx="185"
              cy="465"
              rx="12"
              ry="5"
              fill="#98FB98"
              opacity="0.4"
              transform="rotate(-15 185 465)"
            />
            <ellipse
              cx="215"
              cy="465"
              rx="12"
              ry="5"
              fill="#98FB98"
              opacity="0.4"
              transform="rotate(15 215 465)"
            />

            {/* Side leaves */}
            <ellipse
              cx="40"
              cy="200"
              rx="15"
              ry="6"
              fill="#90EE90"
              opacity="0.5"
              transform="rotate(-60 40 200)"
            />
            <ellipse
              cx="360"
              cy="200"
              rx="15"
              ry="6"
              fill="#90EE90"
              opacity="0.5"
              transform="rotate(60 360 200)"
            />

            {/* Top leaves */}
            <ellipse
              cx="180"
              cy="15"
              rx="14"
              ry="6"
              fill="#90EE90"
              opacity="0.5"
              transform="rotate(-45 180 15)"
            />
            <ellipse
              cx="220"
              cy="15"
              rx="14"
              ry="6"
              fill="#90EE90"
              opacity="0.5"
              transform="rotate(45 220 15)"
            />
          </g>

          {/* Small decorative dots */}
          <g
            className={`transition-all duration-1000 delay-3500 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <circle cx="100" cy="100" r="3" fill="#ffc8dd" opacity="0.6" />
            <circle cx="300" cy="100" r="3" fill="#ffc8dd" opacity="0.6" />
            <circle cx="80" cy="300" r="2" fill="#e0aaff" opacity="0.5" />
            <circle cx="320" cy="300" r="2" fill="#e0aaff" opacity="0.5" />
            <circle cx="120" cy="400" r="2" fill="#ffc8dd" opacity="0.4" />
            <circle cx="280" cy="400" r="2" fill="#ffc8dd" opacity="0.4" />
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient
              id="frameGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="25%" stopColor="#c77dff" />
              <stop offset="50%" stopColor="#ff6b9d" />
              <stop offset="75%" stopColor="#c77dff" />
              <stop offset="100%" stopColor="#ff6b9d" />
            </linearGradient>
          </defs>
        </svg>

        {/* Content Container */}
        <div className="relative z-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mx-4">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-serif text-gray-800 leading-tight">
              Beautiful Content
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              This is your content area. The animated flower frame grows around
              this div, starting from the bottom center and blooming outward in
              a beautiful sequence.
            </p>
            <p className="text-gray-500">
              Perfect for wedding invitations, special announcements, or any
              content that deserves a magical touch.
            </p>
            <div className="pt-4">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Click Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes drawPath {
          0% {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
          }
          100% {
            stroke-dasharray: 1200;
            stroke-dashoffset: 0;
          }
        }

        svg path {
          animation: ${isAnimating
            ? "drawPath 3s ease-in-out forwards"
            : "none"};
        }
      `}</style>
    </div>
  );
};

export default AnimatedFlowerFrame;
