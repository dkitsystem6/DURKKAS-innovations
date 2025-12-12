

import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register GSAP plugins only on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
}

// Components
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";
import Footer from "@/components/common/footer";

// Lazy load heavy components with loading states
const InnovateHeroSection = dynamic(
  () => import("@/components/home/innovate-hero").then(mod => mod.default),
  { loading: () => <div className="min-h-screen bg-[#0d4a8f]" /> }
);

const InnovateAboutSection = dynamic(
  () => import("@/components/home/innovate-about").then(mod => mod.default),
  { loading: () => <div className="h-[50vh] bg-[#0d4a8f]" /> }
);

const InnovateServicesSection = dynamic(
  () => import("@/components/home/innovate-services").then(mod => mod.default),
  { loading: () => <div className="h-[80vh] bg-[#0d4a8f]" /> }
);

// Matter.js requires client-side only
const InnovateTechPlaceholder = dynamic(
  () => import("@/components/home/innovate-tech-placeholder").then(mod => mod.default),
  { 
    loading: () => <div className="h-[80vh] bg-[#05347e]" />,
    ssr: false 
  }
);

const InnovateCollaborationSection = dynamic(
  () => import("@/components/home/innovate-collaboration").then(mod => mod.default),
  { loading: () => <div className="h-[80vh] bg-[#0d4a8f]" /> }
);

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
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<GSAPTween | null>(null);

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const debouncedDimensionCalculator = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (typeof window === 'undefined') return;
      
      const isDesktopResult =
        typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1;

      window.history.scrollRestoration = "manual";
      setIsDesktop(isDesktopResult);
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

  // Animate sections with intersection observer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Only animate once when the section comes into view
          if (!entry.target.hasAttribute('data-animated')) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                (entry.target as HTMLElement).style.willChange = 'auto';
              }
            });
            entry.target.setAttribute('data-animated', 'true');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections except the first one (hero)
    const sections = document.querySelectorAll('main > section:not(:first-child)');
    sections.forEach(section => {
      // Set initial styles
      gsap.set(section, { 
        opacity: 0,
        y: 30,
        willChange: 'opacity, transform'
      });
      observer.observe(section);
    });

    return () => {
      if (observer) {
        sections.forEach(section => observer.unobserve(section));
      }
    };
  }, [isMounted]);

  const renderBackdrop = (): React.ReactNode => (
    <div 
      className="fixed top-0 left-0 h-screen w-screen -z-1 page-backdrop" 
      style={{ 
        willChange: 'transform' // Optimize for performance
      }}
    />
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
        <main className="flex-col flex pb-0 overflow-x-hidden w-full">
          {renderBackdrop()}
          {isMounted && (
            <>
              <InnovateHeroSection onBulbClick={() => {}} />
              <InnovateAboutSection />
              <InnovateServicesSection />
              <InnovateTechPlaceholder />
              <div className="h-[1in] w-full" />
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

