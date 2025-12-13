"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const COLLABORATION_STYLE = {
  SLIDING_TEXT:
    "opacity-30 md:opacity-20 text-base sm:text-lg md:text-5xl lg:text-7xl font-bold whitespace-nowrap w-full",
  SECTION: "w-full relative select-none py-6 flex flex-col overflow-x-hidden",
  TITLE:
    "mt-6 md:mt-8 font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4",
};

const ElevateCollaborationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ---------------- AUTO MARQUEE (ALL DEVICES) ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const leftText = sectionRef.current.querySelector(".ui-left span");
    const rightText = sectionRef.current.querySelector(".ui-right span");

    const createInfiniteScroll = (
      element: Element | null,
      direction: "left" | "right"
    ) => {
      if (!element) return;

      const content = element.innerHTML;
      element.innerHTML = content.repeat(4);

      gsap.set(element, {
        xPercent: direction === "right" ? -25 : 0,
      });

      return gsap.to(element, {
        xPercent: direction === "right" ? 0 : -25,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    };

    const leftAnim = createInfiniteScroll(leftText, "left");
    const rightAnim = createInfiniteScroll(rightText, "right");

    return () => {
      leftAnim?.kill();
      rightAnim?.kill();
    };
  }, []);

  /* ---------------- UI ---------------- */
  const renderSlidingText = (text: string, cls: string) => (
    <div className="relative w-full overflow-hidden">
      <p className={`${cls} ${COLLABORATION_STYLE.SLIDING_TEXT}`}>
        <span className="inline-block whitespace-nowrap">
          {text.trim()} {text.trim()}
        </span>
      </p>
    </div>
  );

  return (
    <section ref={sectionRef} className={COLLABORATION_STYLE.SECTION}>
      {renderSlidingText(
        "We elevate businesses with reliable backoffice support, smart operations and streamlined compliance solutions.",
        "ui-left"
      )}

      <h1 className={COLLABORATION_STYLE.TITLE}>
        Ready to Elevate Your Business with{" "}
        <span className="font-bold text-yellow-400">DURKKAS</span>?
      </h1>

      {renderSlidingText(
        "Optimizing Processes, Strengthening Operations, Empowering Enterprise Growth.",
        "mt-6 md:mt-8 ui-right"
      )}
    </section>
  );
};

export default ElevateCollaborationSection;
