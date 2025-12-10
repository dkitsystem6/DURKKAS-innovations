
import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const InnovateAboutSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initAboutAnimation = (
    quoteRef: MutableRefObject<HTMLDivElement>,
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });
    timeline
      .fromTo(
        quoteRef.current.querySelector(".about-1"),
        { opacity: 0.2 },
        { opacity: 1 }
      )
      .to(quoteRef.current.querySelector(".about-1"), {
        opacity: 0.2,
        delay: 0.5,
      })
      .fromTo(
        quoteRef.current.querySelector(".about-2"),
        { opacity: 0.2 },
        { opacity: 1 },
        "<"
      )
      .to(quoteRef.current.querySelector(".about-2"), {
        opacity: 0.2,
        delay: 1,
      });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
    return scrollTriggerInstance;
  };

  useEffect(() => {
    if (!quoteRef.current || !targetSection.current) return;
    
    const aboutScrollTriggerInstance = initAboutAnimation(
      quoteRef,
      targetSection
    );

    return () => {
      if (aboutScrollTriggerInstance) {
        aboutScrollTriggerInstance.kill();
      }
    };
  }, [quoteRef, targetSection]);

  const renderQuotes = (): React.ReactNode => (
    <h1 ref={quoteRef} className="font-medium text-xl sm:text-2xl md:text-4xl lg:text-6xl px-2 md:px-0 text-left">
      <span
        className={`about-1 leading-tight block mb-4 ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        Durkkas INNOVATE is the technology engine of DIPL, driving intelligent solutions, digital transformation and innovation-led growth across all divisions.{" "}
      </span>
      <span
        className={`about-2 leading-tight block ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        It empowers businesses with smart systems, automation and modern development that shape a future-ready digital ecosystem.
      </span>
    </h1>
  );

  return (
    <section
      id="about"
      className={`tall:pt-20 tall:pb-16 pt-20 md:pt-40 pb-12 md:pb-24 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderQuotes()}
    </section>
  );
};

export default InnovateAboutSection;

