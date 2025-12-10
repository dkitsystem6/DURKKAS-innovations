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

import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import Footer from "@/components/common/footer";
import Scripts from "@/components/common/scripts";
import ContactForm from "@/components/common/contact-form";
import EducateGallerySection from "@/components/home/educate-gallery";

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

export default function EducateGallery() {
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
    return () => {
      window.removeEventListener("resize", debouncedDimensionCalculator);
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [timer]);

  const renderBackdrop = (): React.ReactNode => (
    <div className="fixed top-0 left-0 h-screen w-screen -z-1" style={{ backgroundColor: '#05347e' }}></div>
  );

  return (
    <>
      <Head>
        <title>EDUCATE GALLERY - {METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex">
          {renderBackdrop()}
          <EducateGallerySection />
          <Footer />
        </main>
        <Scripts />
        <ContactForm />
      </Layout>
    </>
  );
}



