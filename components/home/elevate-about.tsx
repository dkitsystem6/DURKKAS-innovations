import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ElevateAboutSection = () => {
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
    <h1 ref={quoteRef} className="font-medium text-lg sm:text-xl md:text-3xl lg:text-5xl px-2 md:px-0">
      <span
        className={`about-1 leading-tight block mb-4 text-justify ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        Durkkas ELEVATE is the operational backbone of DIPL, delivering reliable backoffice support, compliance services and process-driven business solutions across all divisions.{" "}
      </span>
      <span
        className={`about-2 leading-tight block text-justify ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        It empowers enterprises with streamlined operations, professional staffing and efficient administrative systems that enable sustainable growth and long-term business stability.
      </span>
    </h1>
  );

  return (
    <section
      id="about"
      className={`pt-4 md:pt-6 pb-4 md:pb-6 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderQuotes()}
    </section>
  );
};

export default ElevateAboutSection;



