// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear, Power2 } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SERVICES = [
  {
    title: "Remote Business Associate",
    description: "Comprehensive remote business support covering Finance, Admin, Sales & Marketing, and HR Operations. Get dedicated professionals to handle your business functions remotely with efficiency and expertise.",
  },
  {
    title: "Accounting & Auditing",
    description: "Professional accounting and auditing services to maintain accurate financial records, ensure compliance, and provide insights for informed business decisions.",
  },
  {
    title: "Company Formation & Compliance",
    description: "Complete support for company formation, registration, and ongoing compliance management. Navigate legal requirements seamlessly with expert guidance.",
  },
  {
    title: "GST/ITR/TDS Compliance Filing Returns",
    description: "Expert tax compliance services including GST filing, Income Tax Returns (ITR), and TDS returns. Ensure timely and accurate filing to stay compliant with tax regulations.",
  },
  {
    title: "Payroll Service",
    description: "Comprehensive payroll management services including salary processing, statutory compliance, tax deductions, and employee record management for seamless HR operations.",
  },
];

const ElevateServicesSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const cardsContainerRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [willChange, setwillChange] = useState(false);

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

    return () => {
      if (servicesScrollTriggerInstance) {
        servicesScrollTriggerInstance.kill();
      }
    };
  }, [targetSection]);

  // Animate cards on scroll
  useEffect(() => {
    if (!cardsContainerRef.current || cardRefs.current.length === 0) return;

    const cards = cardRefs.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card, 
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: Power2.easeOut,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);


  const renderContent = (): React.ReactNode => (
    <div className="flex flex-col inner-container">
      <p className="section-title-sm seq">Our Services</p>
      <h1 className="section-heading seq mt-2">Explore our comprehensive</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl md:max-w-3xl w-full seq max-w-sm mt-2 px-2 md:px-0">
        Business Consulting & Remote Staffing Division
      </h2>

      {/* Services Grid */}
      <div className="mt-12 md:mt-16 seq">
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="group relative"
              onMouseEnter={() => {
                if (cardRefs.current[index]) {
                  gsap.to(cardRefs.current[index], {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              }}
              onMouseLeave={() => {
                if (cardRefs.current[index]) {
                  gsap.to(cardRefs.current[index], {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }
              }}
            >
              <div className="bg-gradient-to-br from-[#0a5ba8]/30 via-[#05347e]/40 to-[#0a5ba8]/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20 h-full flex flex-col transition-all duration-300 hover:border-white/40 hover:shadow-[0_10px_40px_rgba(10,91,168,0.3)] min-h-[350px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0a5ba8]/10 rounded-full blur-3xl -z-0"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#05347e]/20 rounded-full blur-2xl -z-0"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-[#FBBF24] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-white/70 leading-relaxed flex-1 mb-4">
                    {service.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      {/* Learn more - Left side */}
                      <a 
                        href="https://www.durkkas.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-white/60 text-sm group-hover:text-white/80 transition-colors cursor-pointer"
                      >
                        <span>Learn more</span>
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      
                      {/* Enquiry button - Right side */}
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent("openContactModal"));
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#0a5ba8] to-[#05347e] text-white text-sm font-medium rounded-lg hover:from-[#05347e] hover:to-[#0a5ba8] transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
};

export default ElevateServicesSection;

