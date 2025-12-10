// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const QuoteSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initQuoteAnimation = (
    quoteRef: MutableRefObject<HTMLDivElement>,
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
  };

  useEffect(() => {
    const quoteAnimationRef = initQuoteAnimation(quoteRef, targetSection);

    return quoteAnimationRef.kill;
  }, [quoteRef, targetSection]);

  const renderQuote = (): React.ReactNode => (
    <div className="py-2 md:py-4 section-container px-4">
      <h1
        ref={quoteRef}
        className={`font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center ${
          willChange ? "will-change-opacity" : ""
        }`}
      >
        <span className="innovate-color">Innovate.</span> <span className="educate-color font-bold">Educate.</span> <span className="elevate-color">Elevate.</span>
      </h1>
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-6 lg:gap-8 mt-8 md:mt-12 flex-nowrap md:flex-wrap">
        <Image
          src="/projects/info circle.png"
          alt="Info"
          width={110}
          height={110}
          className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-[180px] lg:h-[180px]"
        />
        <Image
          src="/projects/dare.png"
          alt="Dare"
          width={150}
          height={150}
          className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-[180px] lg:h-[180px] rounded-3xl"
        />
        <Image
          src="/projects/edu crop.png"
          alt="Edu"
          width={120}
          height={120}
          className="object-contain w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-[180px] lg:h-[180px]"
        />
      </div>
    </div>
  );

  return (
    <section className="w-full relative select-none overflow-x-hidden" ref={targetSection}>
      {renderQuote()}
    </section>
  );
};

export default QuoteSection;
