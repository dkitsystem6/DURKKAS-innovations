

import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState, useCallback, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import dynamic from "next/dynamic";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import InnovateHeroSection from "@/components/home/innovate-hero";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";

// Lazy load heavy components
const InnovateAboutSection = dynamic(() => import("@/components/home/innovate-about"), {
  loading: () => null,
});

const InnovateServicesSection = dynamic(() => import("@/components/home/innovate-services"), {
  loading: () => null,
});

// Matter.js requires client-side only
const InnovateTechPlaceholder = dynamic(() => import("@/components/home/innovate-tech-placeholder"), {
  loading: () => null,
  ssr: false,
});

const InnovateCollaborationSection = dynamic(() => import("@/components/home/innovate-collaboration"), {
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

export default function Innovate() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const [isDesktop, setisDesktop] = useState(true);
  const [isBulbOn, setIsBulbOn] = useState(false);
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

    window.addEventListener("resize", debouncedDimensionCalculator, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedDimensionCalculator);
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [debouncedDimensionCalculator]);

  // Animate sections when bulb turns on - optimized
  useEffect(() => {
    if (!isBulbOn) return;

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('main > section:not(:first-child)');
      
      if (sections.length > 0) {
        gsap.fromTo(sections, 
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            onComplete: () => {
              // Remove will-change after animation for better performance
              sections.forEach((section) => {
                (section as HTMLElement).style.willChange = 'auto';
              });
            }
          }
        );
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isBulbOn]);

  const renderBackdrop = (): React.ReactNode => (
    <div className="fixed top-0 left-0 h-screen w-screen -z-1" style={{ backgroundColor: '#05347e' }}></div>
  );

  return (
    <>
      <Head>
        <title>INNOVATE - {METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex pb-0">
          {renderBackdrop()}
          <InnovateHeroSection onBulbClick={() => setIsBulbOn(true)} />
          {isBulbOn && (
            <>
              <InnovateAboutSection />
              <InnovateServicesSection />
              <InnovateTechPlaceholder />
              <InnovateCollaborationSection />
              <Footer />
            </>
          )}
        </main>
        <Scripts />
        <ContactForm />
      </Layout>
    </>
  );
}

