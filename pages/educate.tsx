// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import dynamic from "next/dynamic";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";
import Footer from "@/components/common/footer";

// Lazy load heavy components
const EducateAboutSection = dynamic(() => import("@/components/home/educate-about"), {
  loading: () => null,
});

const EducateDivisionSection = dynamic(() => import("@/components/home/educate-division"), {
  loading: () => null,
});

const EducateGallerySection = dynamic(() => import("@/components/home/educate-gallery"), {
  loading: () => null,
});

const EducateCollaborationSection = dynamic(() => import("@/components/home/educate-collaboration"), {
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

export default function Educate() {
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
    <div className="fixed top-0 left-0 h-screen w-screen -z-1 page-backdrop"></div>
  );

  return (
    <>
      <Head>
        <title>EDUCATE - {METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex overflow-x-hidden w-full">
          {renderBackdrop()}
          <div className="w-full relative select-none section-container flex-col flex py-8 justify-center min-h-screen items-center overflow-hidden">
            <style jsx global>{`
              @keyframes rotateWorld {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .rotating-world {
                animation: rotateWorld 30s linear infinite !important;
                transform-origin: center center;
              }
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-20px);
                }
              }
              @keyframes glow {
                0%, 100% {
                  opacity: 0.5;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.8;
                  transform: scale(1.05);
                }
              }
              .floating-cap {
                animation: float 3s ease-in-out infinite;
              }
              .glow-effect {
                animation: glow 3s ease-in-out infinite;
              }
            `}</style>
            
            {/* Enhanced Background Gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(13, 74, 143, 1) 0%, rgba(13, 74, 143, 0.8) 30%, rgba(13, 74, 143, 0.6) 60%, rgba(13, 74, 143, 0.4) 100%)',
              }}
            />
            
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Animated gradient orbs */}
              <div 
                className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(10, 91, 168, 0.4) 0%, transparent 70%)',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />
              <div 
                className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-15"
                style={{
                  background: 'radial-gradient(circle, rgba(10, 91, 168, 0.3) 0%, transparent 70%)',
                  animation: 'pulse 5s ease-in-out infinite',
                  animationDelay: '1s',
                }}
              />
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
                style={{
                  background: 'radial-gradient(circle, rgba(10, 91, 168, 0.2) 0%, transparent 70%)',
                  animation: 'pulse 6s ease-in-out infinite',
                  animationDelay: '2s',
                }}
              />
            </div>
            
            {/* Two Column Layout: Image Left, Title Right */}
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-8 md:gap-12 px-4 z-10">
              {/* Left Side - World Image with Enhanced Effects */}
              <div className="relative flex-1 flex items-center justify-center md:justify-start w-full md:w-auto">
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px]">
                  {/* Glow ring around world */}
                  <div 
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: 'radial-gradient(circle, rgba(10, 91, 168, 0.3) 0%, transparent 70%)',
                      width: '110%',
                      height: '110%',
                      top: '-5%',
                      left: '-5%',
                      filter: 'blur(30px)',
                      animation: 'pulse 3s ease-in-out infinite',
                    }}
                  />
                  
                  {/* World/Globe Image with 360 degree rotation */}
                  <div className="w-full h-full rotating-world relative z-10">
                    <Image
                      src="/world.png"
                      alt="World"
                      width={600}
                      height={600}
                      className="w-full h-full object-contain rounded-full drop-shadow-2xl"
                      priority
                      style={{
                        filter: 'drop-shadow(0 0 30px rgba(10, 91, 168, 0.5))',
                      }}
                      onError={(e) => {
                        // Fallback if image doesn't exist - create a circular placeholder
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.parentElement?.querySelector('.world-fallback') as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                  </div>
                  
                  {/* Fallback circular world if image doesn't exist */}
                  <div 
                    className="world-fallback hidden absolute inset-0 rounded-full rotating-world"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #0a5ba8 0%, #05347e 50%, #1e7bd8 100%)',
                      boxShadow: 'inset -20px -20px 50px rgba(0, 0, 0, 0.3), inset 20px 20px 50px rgba(255, 255, 255, 0.1)',
                    }}
                  />
                  
                  {/* Decorative rings */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-white/10 -z-10"
                    style={{
                      width: '105%',
                      height: '105%',
                      top: '-2.5%',
                      left: '-2.5%',
                    }}
                  />
                </div>
              </div>
              
              {/* Right Side - Cap Image above Title and Description */}
              <div className="relative flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-auto z-20">
                {/* Cap Image positioned above title with floating animation */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 -mb-12 md:-mb-16 lg:-mb-20 xl:-mb-24 floating-cap">
                  {/* Glow effect behind cap */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-full blur-2xl glow-effect"
                    style={{
                      background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
                      width: '120%',
                      height: '120%',
                      top: '-10%',
                      left: '-10%',
                    }}
                  />
                  <Image
                    src="/cap.png"
                    alt="Cap"
                    width={320}
                    height={320}
                    className="w-full h-full object-contain drop-shadow-lg relative z-10"
                    priority
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.4))',
                    }}
                  />
                </div>
                
                {/* Title positioned below cap with enhanced styling */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white drop-shadow-2xl text-center md:text-left mb-4 md:mb-6 relative z-10 -mt-4 md:-mt-6 lg:-mt-8">
                  <span className="relative inline-block">
                    EDUCATE
                    {/* Subtle text glow */}
                    <span 
                      className="absolute inset-0 blur-sm opacity-30"
                      style={{
                        background: 'linear-gradient(135deg, rgba(10, 91, 168, 0.8) 0%, rgba(251, 191, 36, 0.6) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        zIndex: -1,
                      }}
                    >
                      EDUCATE
                    </span>
                  </span>
                </h1>
                
                {/* Education, Research & Career Development Division with accent */}
                <div className="mb-6 relative w-full">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0a5ba8] via-[#FBBF24] to-[#05347e] rounded-full opacity-60"></div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white text-center md:text-left pl-4 relative">
                    Education, Research & Career Development Division
                  </h2>
                </div>

                {/* Purpose with professional card design */}
                <div className="relative w-full">
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
                        To empower learners and professionals through tech-integrated education and guided career growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EducateAboutSection />
          <EducateDivisionSection />
          <EducateGallerySection />
          <EducateCollaborationSection />
          <Footer />
        </main>
        <Scripts />
        <ContactForm />
      </Layout>
    </>
  );
}

