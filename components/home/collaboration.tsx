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

const CollaborationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* ---------------- AUTO MARQUEE (ALL DEVICES) ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const left = sectionRef.current.querySelector(".ui-left span");
    const right = sectionRef.current.querySelector(".ui-right span");

    const createInfiniteScroll = (
      el: Element | null,
      direction: "left" | "right"
    ) => {
      if (!el) return;

      const content = el.innerHTML;
      el.innerHTML = content.repeat(4);

      gsap.set(el, {
        xPercent: direction === "right" ? -25 : 0,
      });

      return gsap.to(el, {
        xPercent: direction === "right" ? 0 : -25,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    };

    const leftAnim = createInfiniteScroll(left, "left");
    const rightAnim = createInfiniteScroll(right, "right");

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
        "We build smart technology solutions for seamless digital transformation.",
        "ui-left"
      )}

      <h1 className={COLLABORATION_STYLE.TITLE}>
        Ready to Grow with{" "}
        <span className="font-bold text-yellow-400">DURKKAS</span>?
      </h1>

      {renderSlidingText(
        "Innovating Technology, Transforming Education, Empowering Businesses.",
        "mt-6 md:mt-8 ui-right"
      )}
    </section>
  );
};

export default CollaborationSection;
