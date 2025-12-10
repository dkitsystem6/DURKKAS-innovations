// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { gsap, Linear } from "gsap";
import Image from "next/image";

const HERO_STYLES = {
  SECTION:
    "w-full flex md:items-center py-4 md:py-6 section-container min-h-screen relative mb-0 overflow-x-hidden",
  CONTENT: "font-medium flex flex-col md:flex-row md:items-center md:justify-between pt-32 md:pt-0 select-none w-full max-w-full gap-8 md:gap-12",
  BG_WRAPPER:
    "absolute hero-bg right-0 md:right-0 md:left-auto md:mx-0 bottom-8 md:bottom-0 -z-1 w-full max-w-sm md:w-1/2 md:max-w-none scale-100 md:scale-100 flex items-center justify-center md:items-end md:justify-end",
};

interface InnovateHeroSectionProps {
  onBulbClick: () => void;
}

const InnovateHeroSection = React.memo(({ onBulbClick }: InnovateHeroSectionProps) => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const bulbRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const [isBulbOn, setIsBulbOn] = useState(false);

  const initRevealAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): GSAPTimeline => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, y: 20, duration: 0.6, stagger: 0.2 },
        "<"
      );

    return revealTl;
  };

  useEffect(() => {
    if (!targetSection.current) return;
    initRevealAnimation(targetSection);
  }, [targetSection]);

  // Handle bulb click
  const handleHeroClick = () => {
    if (isBulbOn) return; // Already on, don't do anything
    
    setIsBulbOn(true);
    
    // Animate bulb turning on
    if (bulbRef.current) {
      gsap.to(bulbRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }
    
    // Call parent callback after animation
    setTimeout(() => {
      onBulbClick();
    }, 600);
  };

  const renderHeroContent = (): React.ReactNode => (
    <div className={HERO_STYLES.CONTENT} onClick={handleHeroClick} style={{ cursor: isBulbOn ? 'default' : 'pointer' }}>
      {/* Left Side - Original Image with Bulb Effect */}
      <div className="flex-1 flex items-center justify-center md:justify-start seq">
        <div 
          ref={bulbRef}
          className="w-full max-w-md md:max-w-2xl lg:max-w-3xl relative"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative w-full h-auto transition-all duration-600"
            style={{
              transformStyle: "preserve-3d",
              willChange: isBulbOn ? "auto" : "transform, filter",
              transform: "translateZ(0)", // GPU acceleration
              filter: isBulbOn 
                ? "brightness(1.2) drop-shadow(0 0 40px rgba(251, 191, 36, 0.6))"
                : "brightness(0.6) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))",
            }}
          >
            <Image
              src="/innovate2.png"
              alt="Innovate"
              width={800}
              height={800}
              className="w-full h-auto object-contain pointer-events-auto"
              priority
            />
            {isBulbOn && (
              <div 
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                  width: '150%',
                  height: '150%',
                  top: '-25%',
                  left: '-25%',
                  filter: 'blur(40px)',
                  willChange: 'opacity',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Side - INNOVATE Text and Content */}
      <div className="flex-1 flex flex-col justify-center seq">
        {/* INNOVATE Text */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center md:text-left">
            <span className="hero-durkkas-text">INNOVATE</span>
          </h1>
        </div>

        {/* Technology, Digital Solutions & Automation Division */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white text-center md:text-left">
            Technology, Digital Solutions & Automation Division
          </h2>
        </div>

        {/* Purpose */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-1 h-12 bg-gradient-to-b from-[#0a5ba8] to-[#05347e] rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Purpose:
            </h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              To drive business and digital transformation through innovative technology services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={HERO_STYLES.SECTION}
      ref={targetSection}
      style={{ opacity: 0 }}
    >
      {renderHeroContent()}
      {!isBulbOn && (
        <div 
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center text-white text-sm"
          style={{
            animation: 'textPulse 2s ease-in-out infinite',
          }}
        >
          Click anywhere to illuminate
        </div>
      )}
    </section>
  );
});

InnovateHeroSection.displayName = "InnovateHero";

export default InnovateHeroSection;



