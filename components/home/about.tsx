import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const AboutSection = () => {
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
    const aboutScrollTriggerInstance = initAboutAnimation(
      quoteRef,
      targetSection
    );

    return aboutScrollTriggerInstance.kill;
  }, [quoteRef, targetSection]);

  const renderQuotes = (): React.ReactNode => (
    <h1
      ref={quoteRef}
      className="font-medium text-lg sm:text-xl md:text-3xl lg:text-5xl px-2 md:px-0"
    >
      <span
        className={`about-1 leading-tight block mb-4 text-justify ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        Durkkas Innovations Pvt.Ltd. stands as a holistic innovation ecosystem,
        bridging technology, learning and enterprise growth.
      </span>

      <span
        className={`about-2 leading-tight block text-justify ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        DIPL&apos;s mission and vision drive its commitment to transform
        industries, empower communities and create a future-ready digital
        society.
      </span>
    </h1>
  );

  return (
    <section
      className={`pt-4 md:pt-6 pb-4 md:pb-6 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderQuotes()}
    </section>
  );
};

export default AboutSection;
