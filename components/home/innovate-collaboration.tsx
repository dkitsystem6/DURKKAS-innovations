

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

const InnovateCollaborationSection = () => {
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
    if (!quoteRef.current || !targetSection.current) return;
    
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
      element.innerHTML = content + content + content + content; 
      
      if (direction === 'right') {
        gsap.set(element, { xPercent: -25 });
        return gsap.to(element, {
          xPercent: 0,
          duration: 10,
          ease: 'none',
          repeat: -1
        });
      } else {
        gsap.set(element, { xPercent: 0 });
        return gsap.to(element, {
          xPercent: -25,
          duration: 10,
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
      {/* Ready to Grow with <span className="text-strong font-bold">DURKKAS</span>? */}
      Ready to Innovate with <span className="text-strong font-bold" style={{ color: '#FBBF24', background: 'none', WebkitBackgroundClip: 'unset', backgroundClip: 'unset', WebkitTextFillColor: '#FBBF24' }}>DURKKAS</span>?
    </h1>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      <div className="w-full">
        {renderSlidingText(
          "We innovate intelligent technology solutions that power seamless digital transformation. ",
          "ui-left"
        )}

        {renderTitle()}

        {renderSlidingText(
          "Engineering Innovation, Accelerating Digital Growth, Empowering the Future.",
          "mt-6 md:mt-8 ui-right"
        )}
      </div>
    </section>
  );
};

export default InnovateCollaborationSection;

