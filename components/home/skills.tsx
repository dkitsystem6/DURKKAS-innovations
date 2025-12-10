// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { MENULINKS } from "../../constants";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState, useCallback } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React from "react";

const SKILL_STYLES = {
  SECTION:
    "w-full relative select-none mb-0 section-container py-2 md:py-4 flex flex-col justify-center",
  SKILL_TITLE: "section-title-sm mb-4 seq",
};

const SkillsSection = React.memo(() => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const [willChange, setwillChange] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const initRevealAnimation = useCallback((
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger | null => {
    if (!targetSection.current) return null;

    const skillsWrapper = targetSection.current.querySelector(".skills-wrapper");
    if (!skillsWrapper) return null;

    // Cleanup previous instances
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timelineRef.current = revealTl;
    
    const seqElements = targetSection.current.querySelectorAll(".seq");
    if (seqElements.length === 0) return null;

    revealTl.from(
      seqElements,
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: skillsWrapper,
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
      onToggle: (self) => {
        setwillChange(self.isActive);
        // Optimize will-change property
        if (self.isActive) {
          seqElements.forEach((el) => {
            (el as HTMLElement).style.willChange = 'opacity';
          });
        } else {
          seqElements.forEach((el) => {
            (el as HTMLElement).style.willChange = 'auto';
          });
        }
      },
    });

    scrollTriggerRef.current = scrollTrigger;
    return scrollTrigger;
  }, []);

  useEffect(() => {
    if (!targetSection.current) return;

    const revealAnimationRef = initRevealAnimation(targetSection);
    const targetSectionElement = targetSection.current; // Store ref value at effect start

    return () => {
      // Proper cleanup
      if (revealAnimationRef) {
        revealAnimationRef.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      // Cleanup will-change - use stored ref value
      if (targetSectionElement) {
        const seqElements = targetSectionElement.querySelectorAll(".seq");
        seqElements.forEach((el) => {
          (el as HTMLElement).style.willChange = 'auto';
        });
      }
    };
  }, [targetSection, initRevealAnimation]);

  // Handle resize for proper cleanup and reinitialization
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!targetSection.current) return;

        // Refresh ScrollTrigger on resize
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSectionTitle = (): React.ReactNode => (
    <div className="flex flex-col">
      <p className="section-title-sm seq">Vision & Mission</p>
      <h1 className="section-heading seq mt-2">Our Vision for the Future</h1>
      <h2 className="text-2xl md:max-w-2xl w-full seq mt-2">
        Empowering society through digital transformation, continuous learning and sustainable growth.
      </h2>
    </div>
  );

  const renderBackgroundPattern = (): React.ReactNode => (
    <>
      <div className="absolute right-0 -bottom-1/3 w-1/5 max-w-xs md:flex hidden justify-end">
        <Image
          src="/pattern-r.svg"
          loading="lazy"
          height={700}
          width={320}
          alt="pattern"
        />
      </div>
      <div className="absolute left-0 -bottom-3.5 w-1/12 max-w-xs md:block hidden">
        <Image
          src="/pattern-l.svg"
          loading="lazy"
          height={335}
          width={140}
          alt="pattern"
        />
      </div>
    </>
  );

  const renderVisionMission = (): React.ReactNode => (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Vision Section */}
      <div className="seq group">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a5ba8]/20 via-[#05347e]/30 to-[#0a5ba8]/10 backdrop-blur-sm border border-[#0a5ba8]/30 p-5 md:p-6 transition-all duration-300 hover:border-[#0a5ba8]/50 hover:shadow-[0_0_30px_rgba(10,91,168,0.3)] h-full">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0a5ba8]/10 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#05347e]/20 rounded-full blur-2xl -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a5ba8] to-[#05347e] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0a5ba8] via-white to-[#0a5ba8] bg-clip-text text-transparent">
                Vision
              </h3>
            </div>
            
            <p className="text-base md:text-lg text-gray-200 mb-5 leading-relaxed">
          To become a leading innovation-driven ecosystem that bridges technology, 
          education and enterprise services — empowering society through digital transformation, 
          continuous learning and sustainable growth.
        </p>
            
        <div className="space-y-3">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#0a5ba8] to-[#05347e] rounded-full"></span>
                Vision Pathways
              </h4>
              <ul className="space-y-2">
                {[
                  "Integrate all Durkkas divisions into a digitally unified ecosystem",
                  "Lead the region's transformation in AI education, automation and business innovation",
                  "Create career-ready individuals through EDUKOOT's mentorship and training programs",
                  "Build long-term industry collaborations with partners like STEMpedia, AICRA and ISML",
                  "Establish DIPL as a model for sustainable, tech-enabled corporate growth"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group/item gap-2 p-2 rounded-lg hover:bg-[#0a5ba8]/10 transition-all duration-200">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#0a5ba8] to-[#05347e] flex items-center justify-center mt-0.5 shadow-md">
                      <span className="text-white text-[10px] font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-200 text-sm md:text-base leading-relaxed flex-1">{item}</span>
            </li>
                ))}
          </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="seq group">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05347e]/30 via-[#0a5ba8]/20 to-[#05347e]/10 backdrop-blur-sm border border-[#0a5ba8]/30 p-5 md:p-6 transition-all duration-300 hover:border-[#0a5ba8]/50 hover:shadow-[0_0_30px_rgba(10,91,168,0.3)] h-full">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#05347e]/10 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#0a5ba8]/20 rounded-full blur-2xl -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05347e] to-[#0a5ba8] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#05347e] via-white to-[#0a5ba8] bg-clip-text text-transparent">
                Mission
              </h3>
            </div>
            
            <p className="text-base md:text-lg text-gray-200 mb-5 leading-relaxed">
          To empower individuals, institutions and enterprises through innovative 
          technology, transformative education and sustainable business solutions — creating a 
          connected ecosystem that drives growth, knowledge and digital excellence.
        </p>
            
        <div className="space-y-3">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-[#05347e] to-[#0a5ba8] rounded-full"></span>
                Mission Focus
              </h4>
              <ul className="space-y-2">
                {[
                  "Empower Individuals through education, skill development, and career guidance under DARE Centre and EDUKOOT",
                  "Enable Institutions with scalable technology, automation, and learning management systems through Durkkas InfoTech",
                  "Support Enterprises with compliance, staffing, and process efficiency through Durkkas Associates",
                  "Foster Innovation by developing proprietary frameworks like the Durkkas Business Framework (DBF) for research and consultancy",
                  "Promote Collaboration by building a unified digital ecosystem that connects education, technology, and business operations seamlessly"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group/item gap-2 p-2 rounded-lg hover:bg-[#0a5ba8]/10 transition-all duration-200">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#05347e] to-[#0a5ba8] flex items-center justify-center mt-0.5 shadow-md">
                      <span className="text-white text-[10px] font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-200 text-sm md:text-base leading-relaxed flex-1">{item}</span>
            </li>
                ))}
          </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-x-hidden w-full">
      {renderBackgroundPattern()}
      <div
        className={SKILL_STYLES.SECTION}
        id={MENULINKS[2].ref}
        ref={targetSection}
      >
        <div className="flex flex-col skills-wrapper">
          {renderSectionTitle()}
          {renderVisionMission()}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
