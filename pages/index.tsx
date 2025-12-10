// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { METADATA } from "../constants";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import dynamic from "next/dynamic";
import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import HeroSection from "@/components/home/hero";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";

// Lazy load heavy components below the fold
const AboutSection = dynamic(() => import("@/components/home/about"), {
  loading: () => null,
});

const ProjectsSection = dynamic(() => import("@/components/home/projects"), {
  loading: () => null,
});

const QuoteSection = dynamic(() => import("@/components/home/quote"), {
  loading: () => null,
});

const SkillsSection = dynamic(() => import("@/components/home/skills"), {
  loading: () => null,
});

const TimelineSection = dynamic(() => import("@/components/home/timeline"), {
  loading: () => null,
  ssr: false, // Timeline has complex SVG generation
});

const CollaborationSection = dynamic(() => import("@/components/home/collaboration"), {
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

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const [isDesktop, setisDesktop] = useState(true);

  let timer: NodeJS.Timeout = null;

  const debouncedDimensionCalculator = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const isDesktopResult =
        typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1;

      window.history.scrollRestoration = "manual";

      setisDesktop(isDesktopResult);
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    debouncedDimensionCalculator();

    window.addEventListener("resize", debouncedDimensionCalculator);
    return () =>
      window.removeEventListener("resize", debouncedDimensionCalculator);
  }, [timer]);

  const renderBackdrop = (): React.ReactNode => (
    <div className="fixed top-0 left-0 h-screen w-screen -z-1" style={{ backgroundColor: '#05347e' }}></div>
  );

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex">
          {renderBackdrop()}
          <HeroSection />
          <AboutSection />
          <ProjectsSection isDesktop={isDesktop} />
          <QuoteSection />
          <SkillsSection />
          <TimelineSection isDesktop={isDesktop} />
          <CollaborationSection />
          <Footer />
        </main>
        <Scripts />
        <ContactForm />
      </Layout>
    </>
  );
}
