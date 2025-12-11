// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { isSmallScreen, NO_MOTION_PREFERENCE_QUERY } from "pages";

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-30 md:opacity-20 text-base sm:text-lg md:text-5xl lg:text-7xl font-bold whitespace-nowrap w-full md:w-auto",
  SECTION:
    "w-full relative select-none py-4 md:py-6 flex flex-col overflow-x-hidden md:overflow-x-visible",
  TITLE: "mt-6 md:mt-8 font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4",
};

const CollaborationSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initTextGradientAnimation = (
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

  const initSlidingTextAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ) => {
    // Disable scroll-triggered animation on mobile
    if (isSmallScreen()) return; // Return undefined if mobile

    const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    slidingTl
      .to(targetSection.current.querySelector(".ui-left"), {
        xPercent: -150,
      })
      .from(
        targetSection.current.querySelector(".ui-right"),
        { xPercent: -150 },
        "<"
      );

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      animation: slidingTl,
    });
  };

  useEffect(() => {
    const textBgAnimation = initTextGradientAnimation(targetSection);
    let slidingAnimation: ScrollTrigger | undefined;

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    if (matches) {
      slidingAnimation = initSlidingTextAnimation(targetSection);
    }

    return () => {
      textBgAnimation.kill();
      slidingAnimation?.kill();
    };
  }, [quoteRef, targetSection]);

  // Auto-scrolling animation for mobile
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return; // Only for mobile

    const leftText = document.querySelector('.ui-left span');
    const rightText = document.querySelector('.ui-right span');
    let leftAnimation: gsap.core.Tween;
    let rightAnimation: gsap.core.Tween;

    // Function to create continuous scroll animation
    const createInfiniteScroll = (element: Element, direction: 'left' | 'right') => {
      if (!element) return null;
      
      const content = element.innerHTML;
      
      // Repeat content enough times to ensure smooth infinite scroll
      // For mobile, we generally need more duplication to cover the scroll area
      element.innerHTML = content + content + content + content; 
      
      // We are duplicating 4 times. 
      // The animation should move by the width of 1 unit (1/4th of total now)
      // or simply rely on xPercent.
      
      // Reset position
      gsap.set(element, { x: 0, xPercent: 0 });
      
      // For seamless loop: move -50% if we doubled, or calculate based on content width.
      // Simpler approach for text: just move indefinitely and rely on the repetition.
      // But to be "seamless", the restart point must match the start point.
      // If we have [A B A B], and we move from 0 to -width(AB), it looks like we are back at 0? 
      // No, we need to move by exactly width(A). 
      // If we have [A A A A], we move by width(A), then reset to 0.
      
      // Let's assume the span contains "Text Text" initially (from render function).
      // If we append 3 more copies: "Text Text" + "Text Text" + ... 
      // It becomes effectively A A A A A A A A.
      
      // Use xPercent for better responsiveness
      // We want to move 1 "chunk" to the left (or right) and then reset.
      // If we appended content 3 times (total 4 chunks), moving -25% corresponds to 1 chunk.
      
      // Direction handling:
      // Left: move from 0 to -25%
      // Right: move from -25% to 0 (start at -25%)
      
      if (direction === 'right') {
        gsap.set(element, { xPercent: -25 });
        return gsap.to(element, {
          xPercent: 0,
          duration: 10, // Adjust speed
          ease: 'none',
          repeat: -1
        });
      } else {
        gsap.set(element, { xPercent: 0 });
        return gsap.to(element, {
          xPercent: -25,
          duration: 10, // Adjust speed
          ease: 'none',
          repeat: -1
        });
      }
    };

    // Create animations
    if (leftText) {
      leftAnimation = createInfiniteScroll(leftText, 'left');
    }

    if (rightText) {
      rightAnimation = createInfiniteScroll(rightText, 'right');
    }

    return () => {
      leftAnimation?.kill();
      rightAnimation?.kill();
    };
  }, []);

  const renderSlidingText = (text: string, layoutClasses: string) => {
    const isLeft = layoutClasses.includes('ui-left');
    const isRight = layoutClasses.includes('ui-right');
    
    return (
      <div className="relative w-full overflow-hidden">
        <p className={`${layoutClasses} ${COLLABORATION_STYLE.SLIDING_TEXT} md:overflow-visible`}>
          <span className="inline-block md:inline whitespace-nowrap">
            {text.trim()} {text.trim()}
          </span>
        </p>
      </div>
    );
  };

  const renderTitle = () => (
    <h1
      ref={quoteRef}
      className={`${COLLABORATION_STYLE.TITLE} ${
        willChange ? "will-change-opacity" : ""
      }`}
    >
      Ready to Grow with <span className="text-strong font-bold" style={{ color: '#FBBF24', background: 'none', WebkitBackgroundClip: 'unset', backgroundClip: 'unset', WebkitTextFillColor: '#FBBF24' }}>DURKKAS</span>?
    </h1>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
<div className="w-full">
        {renderSlidingText(
          " We build smart technology solutions for seamless digital transformation. ",
          "ui-left"
        )}
      </div>

      {renderTitle()}

      <div className="w-full">
        {renderSlidingText(
          "Innovating Technology, Transforming Education, Empowering Businesses.",
          "mt-6 md:mt-8 ui-right"
        )}
      </div>
    </section>
  );
};

export default CollaborationSection;
