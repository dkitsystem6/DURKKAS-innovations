// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear, Power2 } from "gsap";
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { 
  FaCog, 
  FaBrain, 
  FaCloud, 
  FaCode, 
  FaChartLine,
  FaRobot
} from "react-icons/fa";
import { IconType } from "react-icons";

interface Service {
  title: string;
  icon: IconType;
  description: string;
}

const SERVICES: Service[] = [
  {
    title: "Automation",
    icon: FaCog,
    description:
      "Streamline your business processes with intelligent automation solutions that reduce manual work and increase efficiency.We help businesses eliminate repetitive manual tasks through smart automation powered by AI and process engineering. Our solutions streamline workflows across operations, finance, HR, sales and support-resulting in faster turnaround, fewer errors, and reduced operational costs. From rule-based systems to intelligent decision automation, we design end-to-end automated workflows that integrate smoothly with your existing tools and scale with your business growth.",
  },
  {
    title: "AI Application",
    icon: FaBrain,
    description:
      "We build advanced AI solutions that transform raw data into real business intelligence. Our expertise covers predictive analytics, NLP chatbots, recommendation engines, computer vision and autonomous decision systems. Each application is designed to enhance customer experience, optimize operations and unlock new strategic opportunities. With the DURKKAS Business Framework, our AI solutions follow a structured lifecycle - Data → Understand → Recommend → Keep → KPI tracking - to ensure measurable results.",
  },
  {
    title: "SaaS Development",
    icon: FaCloud,
    description:
      "We specialize in developing scalable SaaS platforms tailored to modern businesses. From concept design and UI/UX to multi-tenant architecture, cloud deployment, subscription management, analytics and continuous updates - our team builds SaaS products that are secure, reliable and future-proof. Whether it's a niche productivity tool or a large enterprise platform, we deliver SaaS solutions capable of serving global users with high performance and seamless experience.",
  },
  {
    title: "Custom Software",
    icon: FaCode,
    description:
      "Every business is unique, and we create software that reflects that. Our custom development services include ERP systems, CRM tools, workflow automation platforms, learning management systems, mobile apps and enterprise dashboards. We combine user-focused design with solid backend engineering to build solutions that solve real challenges, simplify complex processes, and drive long-term digital transformation.",
  },
  {
    title: "Digital Marketing",
    icon: FaChartLine,
    description:
      "We grow your brand using a full-spectrum digital marketing approach driven by data and strategy. Our services include SEO, social media marketing, performance ads, content creation, branding, and analytics. By integrating market insights with AI-powered tracking, we help you attract the right audience, strengthen your online presence, improve engagement, and generate consistent inbound leads-ensuring measurable ROI for every marketing effort.",
  },
];

const InnovateServicesSection = React.memo(() => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const cardsContainerRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const [services, setServices] = useState(SERVICES);
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [willChange, setwillChange] = useState(false);

  // Optimize hover handlers with useCallback
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const initServicesAnimation = (
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
      onToggle: (self) => setwillChange(self.isActive),
    });
    return scrollTriggerInstance;
  };

  useEffect(() => {
    if (!targetSection.current) return;
    
    const servicesScrollTriggerInstance = initServicesAnimation(targetSection);

    // Initialize click sound
    clickSoundRef.current = new Audio("/sound/mouse-click.mp3");
    clickSoundRef.current.volume = 0.5;

    return () => {
      if (servicesScrollTriggerInstance) {
        servicesScrollTriggerInstance.kill();
      }
      if (clickSoundRef.current) {
        clickSoundRef.current = null;
      }
    };
  }, [targetSection]);

  // Animate cards based on their position - one by one from back effect
  useEffect(() => {
    if (!cardsContainerRef.current || cardRefs.current.length === 0) return;

    const cards = cardRefs.current.filter(Boolean);
    
    // Use requestAnimationFrame for smoother updates
    const rafId = requestAnimationFrame(() => {
      cards.forEach((card, index) => {
        if (!card) return;

        // Only first card (index 0) is visible, others are completely hidden
        const opacity = index === 0 ? 1 : 0;
        const scale = index === 0 ? 1 : 0.95;
        const yOffset = index * 5; // Slight vertical offset for stacked effect
        const zIndex = -index * 10; // More pronounced z-index for depth

        // One by one from back effect - card comes from behind
        if (index === 0) {
          // New card comes from back with depth effect
          gsap.fromTo(card, 
            {
              opacity: 0,
              scale: 0.85, // Start smaller (further back)
              y: 20, // Start slightly below
              zIndex: -100, // Start way behind
            },
            {
              opacity: opacity,
              scale: scale,
              y: yOffset,
              zIndex: zIndex,
              duration: 0.8, // Slower for smooth one-by-one effect
              ease: "power2.out",
              overwrite: true,
              delay: 0.1, // Small delay for one-by-one feel
            }
          );
        } else {
          // Other cards move back smoothly
          gsap.to(card, {
            scale: 0.95 - (index * 0.02), // Gradually smaller as they go back
            opacity: 0,
            y: yOffset,
            zIndex: zIndex,
            duration: 0.6,
            ease: Power2.easeOut,
            transformStyle: "preserve-3d",
            overwrite: true,
            delay: index * 0.05, // Stagger delay for one-by-one effect
          });
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [services]); // Removed isHovering dependency - cards should only animate when services change (button click)

  const handleServiceClick = (index: number) => {
    // Play click sound
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch((error) => {
        // Handle autoplay restrictions
        console.warn("Could not play sound:", error);
      });
    }

    const currentActiveIndex = services.findIndex((s, i) => {
      const serviceIndex = SERVICES.findIndex(service => service.title === s.title);
      return serviceIndex === index;
    });

    // If clicking the same service, don't do anything
    if (currentActiveIndex === 0) return;

    // Original style: Simply reorder services array - card comes from back
    const updatedServices = [...SERVICES];
    const selectedService = updatedServices.splice(index, 1);
    updatedServices.unshift(selectedService[0]);
    setServices(updatedServices);
    setActiveService(0);
  };

  const renderContent = (): React.ReactNode => (
    <div className="flex flex-col inner-container">
      <p className="section-title-sm seq">Our Services</p>
      <h1 className="section-heading seq mt-2">Explore our comprehensive</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl md:max-w-3xl w-full seq max-w-sm mt-2 px-2 md:px-0">
        digital solutions designed to elevate your business.
      </h2>

      {/* Services Tabs */}
      <div className="mt-12 md:mt-16 seq">
        <div 
          className="flex flex-wrap gap-4 justify-center mb-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ willChange: 'transform' }}
        >
          {SERVICES.map((service, index) => {
            const serviceIndex = services.findIndex(s => s.title === service.title);
            const isActive = serviceIndex === 0;
            const IconComponent = service.icon;
            
            return (
              <button
                key={service.title}
                onClick={() => handleServiceClick(index)}
                className={`relative px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 group ${
                  isActive
                    ? "bg-white text-[#05347e]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
                title={service.title}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white rounded-full" />
                )}
                <span className={`relative top-[3px] flex items-center gap-2 ${!isActive && "group-hover:text-gray-light-3"}`}>
                  {IconComponent && (
                    <span className="inline-flex items-center">
                      {React.createElement(IconComponent as React.ComponentType<any>, {
                        className: `transition-transform duration-300 ${isActive ? "text-[#05347e]" : "text-white group-hover:scale-110"}`,
                        size: 18
                      })}
                    </span>
                  )}
                  <span>{service.title}</span>
                </span>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {service.title}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stacked Cards Container */}
        <div 
          ref={cardsContainerRef}
          className="relative w-full h-[400px] md:h-[500px] mt-8 perspective-1000 overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, index) => {
            const isAutomation = service.title === "Automation";
            const isAIApplication = service.title === "AI Application";
            const isSaaSDevelopment = service.title === "SaaS Development";
            const isCustomSoftware = service.title === "Custom Software";
            const isDigitalMarketing = service.title === "Digital Marketing";
            
            return (
              <div
                key={`${service.title}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform, opacity",
                }}
              >
                {isAutomation ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto order-1 md:order-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Large Automation Image/Icon and Buttons - Scrollable on Mobile */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 order-2 md:order-2">
                      <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-center mb-4" style={{ minHeight: '250px', maxHeight: '300px' }}>
                        {/* Glow effect background */}
                        <div 
                          className="absolute rounded-full blur-2xl opacity-40"
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(10, 91, 168, 0.2) 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite',
                          }}
                        />
                        
                        {/* Main icon/image container */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          {/* Try to load robotic.svg image */}
                          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            <Image
                              src="/projects/tech/robotic.svg"
                              alt="Automation & Robotics"
                              width={256}
                              height={256}
                              className="w-full h-full object-contain drop-shadow-lg"
                              onError={(e) => {
                                // Fallback to icon if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const iconContainer = target.parentElement?.querySelector('.icon-fallback');
                                if (iconContainer) {
                                  (iconContainer as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            {/* Fallback icon - Robot with rotating gears */}
                            <div className="icon-fallback hidden absolute inset-0 items-center justify-center">
                              {React.createElement(FaRobot as React.ComponentType<any>, {
                                size: 120,
                                className: "text-[#FBBF24] drop-shadow-lg",
                                style: {
                                  filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                                }
                              })}
                              {React.createElement(FaCog as React.ComponentType<any>, {
                                size: 60,
                                className: "text-[#0a5ba8] absolute top-1/4 right-1/4",
                                style: {
                                  filter: 'drop-shadow(0 0 10px rgba(10, 91, 168, 0.5))',
                                  animation: 'spin 3s linear infinite',
                                }
                              })}
                              {React.createElement(FaCog as React.ComponentType<any>, {
                                size: 48,
                                className: "text-[#FBBF24] absolute bottom-1/4 left-1/4",
                                style: {
                                  filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.5))',
                                  animation: 'spin 4s linear infinite reverse',
                                }
                              })}
                            </div>
                          </div>
                          
                          {/* Additional automation gear icons */}
                          <div className="absolute -top-4 -right-4">
                            {React.createElement(FaCog as React.ComponentType<any>, {
                              size: 40,
                              className: "text-[#0a5ba8] opacity-70",
                              style: {
                                animation: 'spin 4s linear infinite',
                              }
                            })}
                          </div>
                          <div className="absolute -bottom-4 -left-4">
                            {React.createElement(FaCog as React.ComponentType<any>, {
                              size: 32,
                              className: "text-[#FBBF24] opacity-60",
                              style: {
                                animation: 'spin 5s linear infinite reverse',
                              }
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Below SVG */}
                      <div className="flex items-center justify-center gap-3 md:gap-4 w-full mt-4 md:mt-6 mb-2 md:mb-0">
                        <a
                          href="https://www.durkkasinfo.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Learn more
                        </a>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent("openContactModal"));
                          }}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isAIApplication ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto order-1 md:order-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Large AI Icon/Image and Buttons */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 order-2 md:order-2">
                      <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-center mb-4" style={{ minHeight: '250px', maxHeight: '300px' }}>
                        {/* Glow effect background */}
                        <div 
                          className="absolute rounded-full blur-2xl opacity-40"
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(10, 91, 168, 0.2) 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite',
                          }}
                        />
                        
                        {/* Main icon container */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Large Brain Icon for AI */}
                            {React.createElement(FaBrain as React.ComponentType<any>, {
                              size: 140,
                              className: "text-[#FBBF24] drop-shadow-lg",
                              style: {
                                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                              }
                            })}
                            {/* Neural network nodes around brain */}
                            <div className="absolute top-4 left-4">
                              {React.createElement(FaBrain as React.ComponentType<any>, {
                                size: 24,
                                className: "text-[#0a5ba8] opacity-70",
                              })}
                            </div>
                            <div className="absolute top-4 right-4">
                              {React.createElement(FaBrain as React.ComponentType<any>, {
                                size: 20,
                                className: "text-[#0a5ba8] opacity-60",
                              })}
                            </div>
                            <div className="absolute bottom-4 left-4">
                              {React.createElement(FaBrain as React.ComponentType<any>, {
                                size: 18,
                                className: "text-[#FBBF24] opacity-50",
                              })}
                            </div>
                            <div className="absolute bottom-4 right-4">
                              {React.createElement(FaBrain as React.ComponentType<any>, {
                                size: 22,
                                className: "text-[#0a5ba8] opacity-65",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Below SVG */}
                      <div className="flex items-center justify-center gap-3 md:gap-4 w-full mt-4 md:mt-6 mb-2 md:mb-0">
                        <a
                          href="https://www.durkkasinfo.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Learn more
                        </a>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent("openContactModal"));
                          }}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isSaaSDevelopment ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto order-1 md:order-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Large SaaS Icon/Image and Buttons */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 order-2 md:order-2">
                      <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-center mb-4" style={{ minHeight: '250px', maxHeight: '300px' }}>
                        {/* Glow effect background */}
                        <div 
                          className="absolute rounded-full blur-2xl opacity-40"
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(10, 91, 168, 0.2) 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite',
                          }}
                        />
                        
                        {/* Main icon container */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Large Cloud Icon for SaaS */}
                            {React.createElement(FaCloud as React.ComponentType<any>, {
                              size: 140,
                              className: "text-[#FBBF24] drop-shadow-lg",
                              style: {
                                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                              }
                            })}
                            {/* Additional cloud icons */}
                            <div className="absolute -top-2 -left-2">
                              {React.createElement(FaCloud as React.ComponentType<any>, {
                                size: 40,
                                className: "text-[#0a5ba8] opacity-70",
                              })}
                            </div>
                            <div className="absolute -top-2 -right-2">
                              {React.createElement(FaCloud as React.ComponentType<any>, {
                                size: 36,
                                className: "text-[#0a5ba8] opacity-60",
                              })}
                            </div>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              {React.createElement(FaCloud as React.ComponentType<any>, {
                                size: 32,
                                className: "text-[#FBBF24] opacity-50",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Below SVG */}
                      <div className="flex items-center justify-center gap-3 md:gap-4 w-full mt-4 md:mt-6 mb-2 md:mb-0">
                        <a
                          href="https://www.durkkasinfo.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Learn more
                        </a>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent("openContactModal"));
                          }}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isCustomSoftware ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto order-1 md:order-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Large Custom Software Icon/Image and Buttons */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 order-2 md:order-2">
                      <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-center mb-4" style={{ minHeight: '250px', maxHeight: '300px' }}>
                        {/* Glow effect background */}
                        <div 
                          className="absolute rounded-full blur-2xl opacity-40"
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(10, 91, 168, 0.2) 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite',
                          }}
                        />
                        
                        {/* Main icon container */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Large Code Icon for Custom Software */}
                            {React.createElement(FaCode as React.ComponentType<any>, {
                              size: 140,
                              className: "text-[#FBBF24] drop-shadow-lg",
                              style: {
                                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                              }
                            })}
                            {/* Additional code elements */}
                            <div className="absolute top-4 left-4">
                              {React.createElement(FaCode as React.ComponentType<any>, {
                                size: 28,
                                className: "text-[#0a5ba8] opacity-70",
                              })}
                            </div>
                            <div className="absolute top-4 right-4">
                              {React.createElement(FaCode as React.ComponentType<any>, {
                                size: 24,
                                className: "text-[#0a5ba8] opacity-60",
                              })}
                            </div>
                            <div className="absolute bottom-4 left-4">
                              {React.createElement(FaCode as React.ComponentType<any>, {
                                size: 22,
                                className: "text-[#FBBF24] opacity-50",
                              })}
                            </div>
                            <div className="absolute bottom-4 right-4">
                              {React.createElement(FaCode as React.ComponentType<any>, {
                                size: 26,
                                className: "text-[#0a5ba8] opacity-65",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Below SVG */}
                      <div className="flex items-center justify-center gap-3 md:gap-4 w-full mt-4 md:mt-6 mb-2 md:mb-0">
                        <a
                          href="https://www.durkkasinfo.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Learn more
                        </a>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent("openContactModal"));
                          }}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isDigitalMarketing ? (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto order-1 md:order-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Large Digital Marketing Icon/Image and Buttons */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 order-2 md:order-2">
                      <div className="relative w-full max-w-xs md:max-w-md flex items-center justify-center mb-4" style={{ minHeight: '250px', maxHeight: '300px' }}>
                        {/* Glow effect background */}
                        <div 
                          className="absolute rounded-full blur-2xl opacity-40"
                          style={{
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(10, 91, 168, 0.2) 50%, transparent 70%)',
                            animation: 'pulse 3s ease-in-out infinite',
                          }}
                        />
                        
                        {/* Main icon container */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                            {/* Large Chart Icon for Digital Marketing */}
                            {React.createElement(FaChartLine as React.ComponentType<any>, {
                              size: 140,
                              className: "text-[#FBBF24] drop-shadow-lg",
                              style: {
                                filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))',
                              }
                            })}
                            {/* Additional chart/marketing elements */}
                            <div className="absolute top-4 left-4">
                              {React.createElement(FaChartLine as React.ComponentType<any>, {
                                size: 28,
                                className: "text-[#0a5ba8] opacity-70",
                              })}
                            </div>
                            <div className="absolute top-4 right-4">
                              {React.createElement(FaChartLine as React.ComponentType<any>, {
                                size: 24,
                                className: "text-[#0a5ba8] opacity-60",
                              })}
                            </div>
                            <div className="absolute bottom-4 left-4">
                              {React.createElement(FaChartLine as React.ComponentType<any>, {
                                size: 22,
                                className: "text-[#FBBF24] opacity-50",
                              })}
                            </div>
                            <div className="absolute bottom-4 right-4">
                              {React.createElement(FaChartLine as React.ComponentType<any>, {
                                size: 26,
                                className: "text-[#0a5ba8] opacity-65",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons - Below SVG */}
                      <div className="flex items-center justify-center gap-3 md:gap-4 w-full mt-4 md:mt-6 mb-2 md:mb-0">
                        <a
                          href="https://www.durkkasinfo.tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Learn more
                        </a>
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent("openContactModal"));
                          }}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 h-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 overflow-y-auto md:overflow-hidden">
                    {/* Left Side - Content */}
                    <div className="flex-1 flex flex-col justify-center w-full md:w-auto">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Right Side - Buttons */}
                    <div className="flex flex-col items-center justify-center w-full md:w-auto mt-4 md:mt-0 gap-3 md:gap-4">
                      <a
                        href="https://www.durkkasinfo.tech/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-white/20 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30 hover:border-white/50"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Learn more
                      </a>
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("openContactModal"));
                        }}
                        className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-xs md:text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Enquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="services"
      className={`tall:pt-20 tall:pb-16 pt-20 md:pt-40 pb-12 md:pb-24 w-full relative select-none section-container`}
      ref={targetSection}
    >
      {renderContent()}
    </section>
  );
});

InnovateServicesSection.displayName = "InnovateServicesSection";

export default InnovateServicesSection;
