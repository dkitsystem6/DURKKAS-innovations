import { useEffect, useRef, MutableRefObject } from "react";
import { MENULINKS } from "../../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IDesktop } from "../../../pages";
import ProjectTile from "./ProjectTile/ProjectTile";

// Division interface matching the project structure
interface IDivision {
  name: string;
  image: string;
  blurImage: string;
  description: string;
  gradient: [string, string];
  url: string;
  tech: string[];
}

// Divisions data - INNOVATE, EDUCATE, ELEVATE
const DIVISIONS: IDivision[] = [
  {
    name: "INNOVATE",
    image: "/projects/innovate.jpg",
    blurImage: "/projects/blur/figgen-blur.jpg",
    description: "Technology, Digital Solutions & Automation Division",
    gradient: ["#1F6582", "#1ABCFE"],
    url: "/innovate",
    tech: ["figma", "angular", "react", "html", "css"],
  },
  {
    name: "EDUCATE",
    image: "/projects/educate.png",
    blurImage: "/projects/blur/myokr-blur.jpg",
    description: "Education, Research & Career Development Division",
    gradient: ["#153BB9", "#0E2C8B"],
    url: "/educate",
    tech: ["robotic", "french", "finance", "stempediaa"],
  },
  {
    name: "ELEVATE",
    image: "/projects/elevate.jpg",
    blurImage: "/projects/blur/dlt-website-blur.jpg",
    description: "Business Consulting & Remote Staffing Division",
    gradient: ["#245B57", "#004741"],
    url: "/elevate",
    tech: ["user", "headset", "bank", "light"],
  },
];

interface DivisionProps extends IDesktop {
  clientHeight?: number;
}

const Division = ({ isDesktop, clientHeight = 650 }: DivisionProps) => {
  const sectionRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const sectionTitleRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    let projectsScrollTrigger: ScrollTrigger | undefined;
    let projectsTimeline: GSAPTimeline | undefined;

    if (isDesktop) {
      [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
    } else {
      const projectWrapper =
        sectionRef.current?.querySelector(".project-wrapper") as HTMLElement;
      if (projectWrapper) {
        projectWrapper.style.width = "calc(100vw - 1rem)";
        projectWrapper.style.overflowX = "scroll";
      }
    }

    const [revealTimeline, revealScrollTrigger] = getRevealSt();

    return () => {
      projectsScrollTrigger && projectsScrollTrigger.kill();
      projectsTimeline && projectsTimeline.kill();
      revealScrollTrigger && revealScrollTrigger.kill();
      revealTimeline && revealTimeline.progress(1);
    };
  }, [sectionRef, sectionTitleRef, isDesktop]);

  const getRevealSt = (): [GSAPTimeline, ScrollTrigger] => {
    const revealTl = gsap.timeline({ defaults: { ease: "none" } });
    revealTl.from(
      sectionRef.current?.querySelectorAll(".staggered-reveal") || [],
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      animation: revealTl,
    });

    return [revealTl, scrollTrigger];
  };

  const getProjectsSt = (): [GSAPTimeline, ScrollTrigger] => {
    const timeline = gsap.timeline({ defaults: { ease: "none" } });
    
    if (!sectionRef.current) {
      return [timeline, ScrollTrigger.create({})];
    }

    const innerContainer = sectionRef.current.querySelector(".inner-container") as HTMLElement;
    const projectWrapper = sectionRef.current.querySelector(".project-wrapper") as HTMLElement;
    
    if (!innerContainer || !projectWrapper) {
      return [timeline, ScrollTrigger.create({})];
    }

    const sidePadding =
      document.body.clientWidth - innerContainer.clientWidth;
    const elementWidth = sidePadding + projectWrapper.clientWidth;

    sectionRef.current.style.width = `${elementWidth}px`;

    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;

    timeline
      .to(sectionRef.current, { x: width })
      .to(sectionTitleRef.current, { x: -width }, "<");

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    return [timeline, scrollTrigger];
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className={`${
        isDesktop && "min-h-screen"
      } w-full relative select-none section-container transform-gpu`}
    >
      <div className="flex flex-col py-4 md:py-6 justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu"
          ref={sectionTitleRef}
        >
          <p className="section-title-sm seq">EMPOWERING THE FUTURE</p>
          <h1 className="section-heading seq mt-2">An Eco System to</h1>
          <h2 className="text-2xl md:max-w-2xl w-full seq mt-2 break-words">
            {/* Desktop + Tablet */}
            <span className="hidden md:block">
              From ideas to execution, we empower people with the tools,
              knowledge, and support needed to rise, lead, and transform their
              future.
            </span>

            {/* Mobile only */}
            <span className="block md:hidden">
              From ideas to execution,we
              <br />
              empower people with, the tools,
              <br />
              knowledge and support needed to
              <br />
              rise, lead and transform their future.
            </span>
          </h2>
        </div>
        <div
          className={`${
            clientHeight > 650 ? "mt-8 sm:mt-12" : "mt-6 sm:mt-8"
          } flex project-wrapper no-scrollbar w-fit staggered-reveal overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6`}
        >
          {DIVISIONS.map((division, index) => (
            <ProjectTile
              classes={
                index === DIVISIONS.length - 1
                  ? "snap-center"
                  : "mr-4 sm:mr-6 md:mr-8 lg:mr-12 snap-center"
              }
              project={division}
              key={division.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Division;

