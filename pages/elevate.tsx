// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaArrowUp, FaChartLine, FaRocket } from "react-icons/fa";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import dynamic from "next/dynamic";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";

// Lazy load heavy components
const ElevateAboutSection = dynamic(() => import("@/components/home/elevate-about"), {
  loading: () => null,
});

const ElevateServicesSection = dynamic(() => import("@/components/home/elevate-services"), {
  loading: () => null,
});

const ElevateCollaborationSection = dynamic(() => import("@/components/home/elevate-collaboration"), {
  loading: () => null,
});

const DEBOUNCE_TIME = 100;

export const isSmallScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 767;
};
export const NO_MOTION_PREFERENCE_QUERY =
  "(prefers-reduced-motion: no-preference)";

export interface IDesktop {
  isDesktop: boolean;
}

export default function Elevate() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const [isDesktop, setisDesktop] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedDimensionCalculator = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const isDesktopResult =
        typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1;

      window.history.scrollRestoration = "manual";

      setisDesktop(isDesktopResult);
    }, DEBOUNCE_TIME);
  }, []);

  useEffect(() => {
    debouncedDimensionCalculator();

    window.addEventListener("resize", debouncedDimensionCalculator);
    return () => {
      window.removeEventListener("resize", debouncedDimensionCalculator);
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debouncedDimensionCalculator]);

  const renderBackdrop = (): React.ReactNode => (
    <div className="fixed top-0 left-0 h-screen w-screen -z-1" style={{ backgroundColor: '#05347e' }}></div>
  );

  return (
    <>
      <Head>
        <title>ELEVATE - {METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex overflow-x-hidden w-full">
          {renderBackdrop()}
          <div className="w-full relative select-none section-container flex-col flex py-8 justify-center min-h-screen items-center overflow-hidden">
            <style jsx global>{`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-15px);
                }
              }
              @keyframes glow {
                0%, 100% {
                  opacity: 0.6;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.9;
                  transform: scale(1.03);
                }
              }
              .floating-elevate {
                animation: float 4s ease-in-out infinite;
              }
              .glow-elevate {
                animation: glow 3s ease-in-out infinite;
              }
            `}</style>
            
            {/* Enhanced Background Gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(5, 52, 126, 1) 0%, rgba(5, 52, 126, 0.8) 30%, rgba(5, 52, 126, 0.6) 60%, rgba(5, 52, 126, 0.4) 100%)',
              }}
            />
            
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Animated gradient orbs */}
              <div 
                className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />
              <div 
                className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-15"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(10, 91, 168, 0.1) 50%, transparent 70%)',
                  animation: 'pulse 6s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              />
            </div>
            
            {/* Two Column Layout: Icon Left, Title Right */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-8 md:gap-12 px-4 z-10">
              {/* Left Side - ELEVATE Icon with Enhanced Effects */}
              <div className="relative flex-1 flex items-center justify-center md:justify-start w-full md:w-auto">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  {/* Glow effect background */}
                  <div 
                    className="absolute rounded-full blur-3xl opacity-40 glow-elevate"
                    style={{
                      width: '250px',
                      height: '250px',
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(10, 91, 168, 0.3) 50%, transparent 70%)',
                    }}
                  />
                  
                  {/* Main Growth/Elevation Icon */}
                  <div className="relative z-10 flex flex-col items-center justify-center floating-elevate">
                    {/* Large upward arrow with pulse */}
                    <div className="relative">
                      {React.createElement(FaArrowUp as React.ComponentType<any>, {
                        size: 140,
                        className: "text-[#FBBF24] drop-shadow-2xl",
                        style: {
                          filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.7))',
                          animation: 'pulse 2s ease-in-out infinite',
                        }
                      })}
                      
                      {/* Growth chart lines around arrow */}
                      <div className="absolute -top-10 -left-10">
                        {React.createElement(FaChartLine as React.ComponentType<any>, {
                          size: 48,
                          className: "text-[#0a5ba8] opacity-80",
                          style: {
                            transform: 'rotate(-45deg)',
                            filter: 'drop-shadow(0 0 10px rgba(10, 91, 168, 0.5))',
                          }
                        })}
                      </div>
                      <div className="absolute -top-10 -right-10">
                        {React.createElement(FaChartLine as React.ComponentType<any>, {
                          size: 42,
                          className: "text-[#0a5ba8] opacity-70",
                          style: {
                            transform: 'rotate(45deg)',
                            filter: 'drop-shadow(0 0 10px rgba(10, 91, 168, 0.5))',
                          }
                        })}
                      </div>
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                        {React.createElement(FaRocket as React.ComponentType<any>, {
                          size: 40,
                          className: "text-[#FBBF24] opacity-70",
                          style: {
                            transform: 'rotate(-45deg)',
                            filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))',
                            animation: 'pulse 2.5s ease-in-out infinite',
                          }
                        })}
                      </div>
                    </div>
                    
                    {/* Additional growth indicators */}
                    <div className="absolute top-6 left-6">
                      {React.createElement(FaArrowUp as React.ComponentType<any>, {
                        size: 28,
                        className: "text-[#0a5ba8] opacity-75",
                        style: {
                          filter: 'drop-shadow(0 0 8px rgba(10, 91, 168, 0.4))',
                        }
                      })}
                    </div>
                    <div className="absolute top-6 right-6">
                      {React.createElement(FaArrowUp as React.ComponentType<any>, {
                        size: 24,
                        className: "text-[#0a5ba8] opacity-70",
                        style: {
                          filter: 'drop-shadow(0 0 8px rgba(10, 91, 168, 0.4))',
                        }
                      })}
                    </div>
                    <div className="absolute bottom-6 left-6">
                      {React.createElement(FaArrowUp as React.ComponentType<any>, {
                        size: 22,
                        className: "text-[#FBBF24] opacity-65",
                        style: {
                          filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.4))',
                        }
                      })}
                    </div>
                    <div className="absolute bottom-6 right-6">
                      {React.createElement(FaArrowUp as React.ComponentType<any>, {
                        size: 26,
                        className: "text-[#0a5ba8] opacity-72",
                        style: {
                          filter: 'drop-shadow(0 0 8px rgba(10, 91, 168, 0.4))',
                        }
                      })}
                    </div>
                  </div>
                  
                  {/* Decorative rings */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-white/10 -z-10"
                    style={{
                      width: '110%',
                      height: '110%',
                      top: '-5%',
                      left: '-5%',
                    }}
                  />
                </div>
              </div>
              
              {/* Right Side - Title and Description */}
              <div className="relative flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-auto z-20">
                {/* Title with enhanced styling */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl text-center mb-4 md:mb-6 relative">
                  <span className="relative inline-block">
                    ELEVATE
                    {/* Subtle text glow */}
                    <span 
                      className="absolute inset-0 blur-sm opacity-30"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.8) 0%, rgba(10, 91, 168, 0.6) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        zIndex: -1,
                      }}
                    >
                      ELEVATE
                    </span>
                  </span>
                </h1>
                
                {/* Business Consulting & Remote Staffing Division with accent */}
                <div className="mb-6 relative w-full flex justify-center">
                  <div className="relative flex items-center gap-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-[#0a5ba8] via-[#FBBF24] to-[#05347e] rounded-full opacity-60"></div>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white text-center">
                      Business Consulting & Remote Staffing Division
                    </h2>
                  </div>
                </div>

                {/* Purpose with professional card design */}
                <div className="relative w-full max-w-3xl">
                  {/* Card background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0a5ba8]/20 via-[#05347e]/30 to-[#0a5ba8]/20 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl -z-10"></div>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FBBF24]/30 rounded-tl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FBBF24]/30 rounded-br-2xl"></div>
                  
                  <div className="flex items-start gap-4 p-5 md:p-6 relative">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-1.5 h-14 bg-gradient-to-b from-[#0a5ba8] via-[#FBBF24] to-[#05347e] rounded-full shadow-lg"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shadow-lg animate-pulse"></span>
                        Purpose:
                      </h3>
                      <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                        To empower businesses with strategic consulting, efficient remote staffing, and operational excellence that drives sustainable growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ElevateAboutSection />
          <ElevateServicesSection />
          <ElevateCollaborationSection />
          <Footer />
        </main>
        <Scripts />
        <ContactForm />
      </Layout>
    </>
  );
}

