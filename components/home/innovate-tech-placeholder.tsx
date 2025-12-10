// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use client";

import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// @ts-ignore - matter-js types may not be available
import * as Matter from "matter-js";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  // Web Technologies
  SiHtml5,
  SiCss3,
  SiMysql,
  // Digital Marketing Icons
  SiGoogleanalytics,
  SiGoogleads,
  SiHubspot,
  SiMailchimp,
  SiSalesforce,
  SiAdobe,
  SiSemrush,
  SiGoogletagmanager,
  SiGooglesearchconsole,
} from "react-icons/si";

// Tech stack configuration
interface TechItem {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

// Fallback component for Java (since SiJava doesn't exist)
const JavaIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8.851 18.56s-.849.951.778 1.105c2.12.2 3.926.117 6.768-.123 0 0 .515.403 1.15.403 2.026 0 3.515-2.12 3.515-3.515 0-1.459-1.105-2.559-1.105-2.559l1.105-1.105s1.459 1.459 1.459 3.664c0 3.515-2.678 5.173-5.173 5.173-1.459 0-2.026-.291-2.026-.291s.602.291 1.459.291c1.459 0 2.559-.403 2.559-.403-2.678-1.808-5.173-1.808-7.67-1.105-.291 0-.515-.117-.515-.117zm-2.559-1.459s-1.808 1.35.291 1.808c2.559.515 5.173.515 8.031.291 0 0 .403.291.849.291 1.808 0 3.515-1.105 3.515-2.678 0-1.808-1.35-2.678-1.35-2.678l.849-.849s1.808 1.808 1.808 3.515c0 2.678-2.12 4.486-4.486 4.486-1.35 0-1.808-.2-1.808-.2s.403.2 1.105.2c1.808 0 3.515-.849 3.515-.849-3.515-1.808-6.768-1.808-9.264-.849-.403 0-.602-.117-.602-.117zm-.2-2.678s-1.459 1.105.403 1.35c2.12.291 4.486.291 7.245.117 0 0 .291.2.602.2 1.459 0 2.678-.849 2.678-2.12 0-1.459-1.105-2.12-1.105-2.12l.849-.849s1.459 1.459 1.459 2.678c0 2.12-1.808 3.664-3.664 3.664-.849 0-1.105-.117-1.105-.117s.291.117.849.117c1.459 0 2.678-.602 2.678-.602-2.678-1.459-5.173-1.459-7.245-.849-.291 0-.403-.117-.403-.117z"/>
  </svg>
);

const TECH_STACK: TechItem[] = [
  // Development Technologies
  { name: "React", icon: SiReact as React.ComponentType<any>, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs as React.ComponentType<any>, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs as React.ComponentType<any>, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript as React.ComponentType<any>, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript as React.ComponentType<any>, color: "#F7DF1E" },
  { name: "Python", icon: SiPython as React.ComponentType<any>, color: "#3776AB" },
  { name: "Java", icon: JavaIcon, color: "#ED8B00" },
  // Web Technologies
  { name: "HTML5", icon: SiHtml5 as React.ComponentType<any>, color: "#E34F26" },
  { name: "CSS3", icon: SiCss3 as React.ComponentType<any>, color: "#1572B6" },
  { name: "Tailwind", icon: SiTailwindcss as React.ComponentType<any>, color: "#06B6D4" },
  // DevOps & Cloud
  { name: "Docker", icon: SiDocker as React.ComponentType<any>, color: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes as React.ComponentType<any>, color: "#326CE5" },
  { name: "AWS", icon: SiAmazonwebservices as React.ComponentType<any>, color: "#FF9900" },
  // Databases
  { name: "MongoDB", icon: SiMongodb as React.ComponentType<any>, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql as React.ComponentType<any>, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql as React.ComponentType<any>, color: "#4479A1" },
  { name: "Redis", icon: SiRedis as React.ComponentType<any>, color: "#DC382D" },
  { name: "GraphQL", icon: SiGraphql as React.ComponentType<any>, color: "#E10098" },
  // Version Control
  { name: "Git", icon: SiGit as React.ComponentType<any>, color: "#F05032" },
  { name: "GitHub", icon: SiGithub as React.ComponentType<any>, color: "#181717" },
  // Digital Marketing & Analytics
  { name: "Google Analytics", icon: SiGoogleanalytics as React.ComponentType<any>, color: "#FFC107" },
  { name: "Google Ads", icon: SiGoogleads as React.ComponentType<any>, color: "#4285F4" },
  { name: "Google Tag Manager", icon: SiGoogletagmanager as React.ComponentType<any>, color: "#34A853" },
  { name: "Google Search Console", icon: SiGooglesearchconsole as React.ComponentType<any>, color: "#EA4335" },
  { name: "HubSpot", icon: SiHubspot as React.ComponentType<any>, color: "#FF7A59" },
  { name: "Mailchimp", icon: SiMailchimp as React.ComponentType<any>, color: "#FFE01B" },
  { name: "Salesforce", icon: SiSalesforce as React.ComponentType<any>, color: "#00A1E0" },
  { name: "Adobe", icon: SiAdobe as React.ComponentType<any>, color: "#FF0000" },
  { name: "SEMrush", icon: SiSemrush as React.ComponentType<any>, color: "#FF652F" },
];

interface TechBoxPosition {
  x: number;
  y: number;
  angle: number;
}

const InnovateTechPlaceholder = React.memo(() => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const renderRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [boxPositions, setBoxPositions] = useState<Map<string, TechBoxPosition>>(new Map());

  const initTechAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });
    
    timeline.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 80%",
      end: "top top",
      scrub: 0,
      animation: timeline,
      onEnter: () => setIsVisible(true),
    });
    return scrollTriggerInstance;
  };

  useEffect(() => {
    if (!targetSection.current) return;
    
    const techScrollTriggerInstance = initTechAnimation(targetSection);

    return () => {
      if (techScrollTriggerInstance) {
        techScrollTriggerInstance.kill();
      }
    };
  }, [targetSection]);

  useEffect(() => {
    if (!isVisible || !containerRef.current || isInitialized) return;

    const container = containerRef.current;
    
    // Wait for container to be properly sized
    const checkSize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) {
        setTimeout(checkSize, 100);
        return;
      }
      
      // First time: Start icons above container (rain effect)
      // After first time: Start icons inside container
      const initialPositions = new Map<string, TechBoxPosition>();
      
      if (!hasAnimated) {
        // First time - rain effect from top of container (scattered like dust particles)
        TECH_STACK.forEach((tech, index) => {
          // Random scattered positions across the width, start at top of container
          const x = Math.random() * width;
          const y = 20 + Math.random() * 30; // Start at top of container (visible)
          
          initialPositions.set(tech.name, {
            x,
            y,
            angle: (Math.random() - 0.5) * 0.5, // Random slight rotation
          });
        });
        setHasAnimated(true);
      } else {
        // After first time - start inside container
        const cols = Math.ceil(Math.sqrt(TECH_STACK.length));
        const initialBoxSize = Math.min(width / 8, 70);
        TECH_STACK.forEach((tech, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const spacing = Math.min(width / (cols + 1), 100);
          const x = spacing * (col + 1);
          const y = Math.max(50, height * 0.2) + row * (initialBoxSize + 20);
          
          initialPositions.set(tech.name, {
            x,
            y,
            angle: 0,
          });
        });
      }
      setBoxPositions(initialPositions);

      // Create Matter.js engine with optimized settings
      const engine = Matter.Engine.create();
      engine.world.gravity.y = 1; // Stronger gravity
      engine.world.gravity.scale = 0.001;
      engine.positionIterations = 6; // Reduce iterations for performance
      engine.velocityIterations = 4; // Reduce iterations for performance

      // Create boundaries (invisible walls)
      const boundaryThickness = 50;
      const boundaries = [
        // Top
        Matter.Bodies.rectangle(width / 2, -boundaryThickness / 2, width, boundaryThickness, {
          isStatic: true,
          render: { visible: false },
        }),
        // Bottom
        Matter.Bodies.rectangle(width / 2, height + boundaryThickness / 2, width, boundaryThickness, {
          isStatic: true,
          render: { visible: false },
        }),
        // Left
        Matter.Bodies.rectangle(-boundaryThickness / 2, height / 2, boundaryThickness, height, {
          isStatic: true,
          render: { visible: false },
        }),
        // Right
        Matter.Bodies.rectangle(width + boundaryThickness / 2, height / 2, boundaryThickness, height, {
          isStatic: true,
          render: { visible: false },
        }),
      ];

      // Create tech icon boxes with physics - smaller on mobile
      const mobileCheck = width < 768;
      setIsMobile(mobileCheck);
      const boxSize = mobileCheck ? Math.min(width / 6, 55) : Math.min(width / 8, 70);
      const boxes: Matter.Body[] = [];

      TECH_STACK.forEach((tech, index) => {
        let x: number, y: number;
        
        if (!hasAnimated) {
          // First time - start at top of container (scattered like dust particles)
          x = Math.random() * width;
          y = 20 + Math.random() * 30; // Start at top of container (visible)
        } else {
          // After first time - start inside container
          const cols = Math.ceil(Math.sqrt(TECH_STACK.length));
          const row = Math.floor(index / cols);
          const col = index % cols;
          const spacing = Math.min(width / (cols + 1), 100);
          x = spacing * (col + 1);
          y = Math.max(50, height * 0.2) + row * (boxSize + 20);
        }

        const box = Matter.Bodies.rectangle(x, y, boxSize, boxSize, {
          restitution: 0.6, // Bounce
          friction: 0.1,
          frictionAir: 0.02, // Slightly more air resistance for floating effect
          density: 0.001,
          render: { visible: false },
          label: tech.name,
        });

        // Add random initial velocity for scattered dust particle effect
        if (!hasAnimated) {
          // Set velocity immediately
          Matter.Body.setVelocity(box, {
            x: (Math.random() - 0.5) * 2, // Random horizontal velocity
            y: Math.random() * 1.5 + 0.5, // Random downward velocity
          });
          Matter.Body.setAngularVelocity(box, (Math.random() - 0.5) * 0.1); // Random rotation
        }

        (box as any).techInfo = tech;
        boxes.push(box);
      });

      // Add all bodies to world
      Matter.World.add(engine.world, [...boundaries, ...boxes]);

      // Create mouse constraint for dragging
      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      Matter.World.add(engine.world, mouseConstraint);

      // Update positions in state (throttled for performance)
      let lastUpdateTime = 0;
      const UPDATE_INTERVAL = 16; // ~60fps
      
      const updatePositions = () => {
        const now = performance.now();
        if (now - lastUpdateTime < UPDATE_INTERVAL) return;
        lastUpdateTime = now;

        const positions = new Map<string, TechBoxPosition>();
        boxes.forEach((box) => {
          const techInfo = (box as any).techInfo;
          if (techInfo) {
            positions.set(techInfo.name, {
              x: box.position.x,
              y: box.position.y,
              angle: box.angle,
            });
          }
        });
        setBoxPositions(positions);
      };

      // Run engine with optimized settings
      const runner = Matter.Runner.create({
        delta: 1000 / 60, // 60fps
        isFixed: true,
      });
      Matter.Runner.run(runner, engine);

      // Optimized animation loop - pause when not visible
      let isPaused = false;
      const animate = () => {
        if (!isPaused) {
          Matter.Engine.update(engine, 1000 / 60); // Fixed timestep
          updatePositions();
        }
        renderRef.current = requestAnimationFrame(animate);
      };
      animate();

      // Pause when section is not in viewport
      let observer: IntersectionObserver | null = null;
      if (container) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              isPaused = !entry.isIntersecting;
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(container);
      }

      // Store refs
      engineRef.current = engine;
      runnerRef.current = runner;
      mouseConstraintRef.current = mouseConstraint;
      setIsInitialized(true);

      // Handle resize
      const handleResize = () => {
        const newRect = container.getBoundingClientRect();
        if (newRect.width !== width || newRect.height !== height) {
          // Cleanup and reinitialize
          if (renderRef.current) {
            cancelAnimationFrame(renderRef.current);
          }
          if (runner) Matter.Runner.stop(runner);
          if (engine) Matter.Engine.clear(engine);
          setIsInitialized(false);
          setTimeout(() => setIsInitialized(true), 100);
        }
      };
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        if (observer) {
          observer.disconnect();
        }
        if (renderRef.current) {
          cancelAnimationFrame(renderRef.current);
        }
        if (runner) Matter.Runner.stop(runner);
        if (engine) Matter.Engine.clear(engine);
        if (mouseConstraint) Matter.World.remove(engine.world, mouseConstraint);
        setIsInitialized(false);
      };
    };
    
    checkSize();
  }, [isVisible, isInitialized, hasAnimated]);

  const renderContent = (): React.ReactNode => {
    return (
      <div className="flex flex-col inner-container">
        <p className="section-title-sm seq">Our Technology</p>
        <h1 className="section-heading seq mt-2">Cutting-edge solutions</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl md:max-w-3xl w-full seq max-w-sm mt-2 px-2 md:px-0">
          powered by the latest technologies and innovative frameworks.
        </h2>

        {/* Physics Container */}
        <div
          ref={containerRef}
          className="mt-8 md:mt-16 seq relative w-full h-[300px] sm:h-[350px] md:h-[500px] rounded-xl md:rounded-2xl overflow-visible bg-white/5 backdrop-blur-sm border border-white/10"
          style={{ touchAction: "none" }}
        >
          {TECH_STACK.map((tech) => {
            const position = boxPositions.get(tech.name);
            const IconComponent = tech.icon as React.ComponentType<any>;
            
            if (!position) return null;

            // Smaller boxes on mobile, normal on desktop
            const displayBoxSize = isMobile ? 55 : 70;
            const halfSize = displayBoxSize / 2;
            const iconSize = isMobile ? 24 : 32;

            return (
              <div
                key={tech.name}
                className="absolute flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-10"
                style={{
                  left: `${position.x - halfSize}px`,
                  top: `${position.y - halfSize}px`,
                  transform: `rotate(${position.angle}rad)`,
                  width: `${displayBoxSize}px`,
                  height: `${displayBoxSize}px`,
                  backgroundColor: `${tech.color}20`,
                  border: `2px solid ${tech.color}`,
                  borderRadius: isMobile ? "8px" : "12px",
                  pointerEvents: "none",
                  transition: "none",
                  boxShadow: `0 4px 12px ${tech.color}40`,
                }}
              >
                <IconComponent
                  size={iconSize}
                  color={tech.color}
                  style={{ pointerEvents: "none" }}
                />
                <span
                  className="text-[8px] md:text-[10px] font-semibold mt-0.5 md:mt-1 px-0.5 text-center leading-tight"
                  style={{ color: tech.color }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
          <div className="absolute bottom-4 left-4 text-white/60 text-xs md:text-sm z-20">
            Drag the tech icons to interact
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="tech"
      className={`tall:pt-20 tall:pb-16 pt-20 md:pt-40 pb-12 md:pb-24 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderContent()}
    </section>
  );
});

InnovateTechPlaceholder.displayName = "InnovateTechPlaceholder";

export default InnovateTechPlaceholder;
