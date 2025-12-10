// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from "../../constants";
import React, { MutableRefObject, useEffect, useRef } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { gsap, Linear } from "gsap";
import Button, { ButtonTypes } from "../common/button";
import HeroImage from "./hero-image";

const HERO_STYLES = {
  SECTION:
    "w-full flex md:items-center py-2 md:py-4 section-container min-h-screen relative mb-0 overflow-x-hidden",
  CONTENT: "font-medium flex flex-col pt-32 md:pt-0 select-none items-center md:items-start w-full max-w-full",
  SOCIAL_LINK: "link hover:opacity-80 duration-300 md:mr-4 mr-2",
  BG_WRAPPER:
    "absolute hero-bg left-0 right-0 mx-auto md:right-0 md:left-auto md:mx-0 bottom-8 md:bottom-0 -z-1 w-full max-w-sm md:w-3/4 md:max-w-none scale-100 md:scale-100 flex items-center justify-center md:items-end md:justify-end",
  TYPED_SPAN: "text-xl sm:text-2xl md:text-4xl seq",
};

const HeroSection = React.memo(() => {
  const typedSpanElement: MutableRefObject<HTMLSpanElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const initTypeAnimation = (
    typedSpanElement: MutableRefObject<HTMLSpanElement>
  ): Typed => {
    return new Typed(typedSpanElement.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 8000,
      loop: true,
      contentType: 'html', // Allow HTML content
    });
  };

  const initRevealAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): GSAPTimeline => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl
      .to(targetSection.current, { opacity: 1, duration: 2 })
      .from(
        targetSection.current.querySelectorAll(".seq"),
        { opacity: 0, duration: 0.5, stagger: 0.5 },
        "<"
      );

    return revealTl;
  };

  useEffect(() => {
    if (!typedSpanElement.current) return;
    
    const typed = initTypeAnimation(typedSpanElement);
    initRevealAnimation(targetSection);

    return () => {
      if (typed && typed.destroy) {
        try {
          typed.destroy();
        } catch (error) {
          // Typed.js instance might already be destroyed
          console.warn("Typed.js cleanup error:", error);
        }
      }
    };
  }, [typedSpanElement, targetSection]);

  const renderBackgroundImage = (): React.ReactNode => (
    <div className={HERO_STYLES.BG_WRAPPER} style={{ maxHeight: "650px" }}>
      <HeroImage />
    </div>
  );

  const renderSocialLinks = (): React.ReactNode =>
    Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className={HERO_STYLES.SOCIAL_LINK}
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));

  const renderHeroContent = (): React.ReactNode => (
    <div className={HERO_STYLES.CONTENT}>
      {/* H2 Tag - Separate Div */}
      <div className="mb-3 -mt-16 md:-mt-16 hero-h2-wrapper md:block md:w-auto">
        <h2 className="text-3xl md:text-5xl lg:text-6xl seq hero-h2-mobile md:text-left">
          Welcome to <br className="hidden md:block lg:block" /> 
          <span className="hero-durkkas-text durkkas-keyboard">
            <span className="durkkas-key">D</span>
            <span className="durkkas-key">U</span>
            <span className="durkkas-key">R</span>
            <span className="durkkas-key">K</span>
            <span className="durkkas-key">K</span>
            <span className="durkkas-key">A</span>
            <span className="durkkas-key">S</span>
          </span>
        </h2>
      </div>
      
      {/* Typed String - Separate Div */}
      <div className="mb-4 mt-4 md:mt-0 text-center md:text-left">
        <span className={HERO_STYLES.TYPED_SPAN} ref={typedSpanElement}></span>
      </div>
      
      {/* Social Media Icons - Separate Div - Hidden on mobile, shown below hero image */}
      <div className="hidden md:flex seq mb-5">
        {renderSocialLinks()}
      </div>
    </div>
  );

  const { ref: heroSectionRef } = MENULINKS[0];

  return (
    <section
      className={HERO_STYLES.SECTION}
      id={heroSectionRef}
      ref={targetSection}
      style={{ opacity: 0 }}
    >
      {renderHeroContent()}
      {renderBackgroundImage()}
      {/* Social Media Icons - Mobile View Only - Below Hero Image */}
      <div className="md:hidden flex seq justify-center absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full">
        {renderSocialLinks()}
      </div>
    </section>
  );
});

HeroSection.displayName = "LandingHero";

export default HeroSection;
