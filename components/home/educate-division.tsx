// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Power2 } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface Division {
  name: string;
  description?: string;
  features?: string[];
}

const DIVISIONS: Division[] = [
  {
    name: "School of AI & Robotics",
    description: "School of AI & Robotics, teaming up with STEMpedia, is reinventing K-12 education by exposing children to cutting-edge technology such as AI, robots, and STEM. Our programs, tailored for students aged 7 to 18, are intended to build crucial 21st-century skills such as coding, computational thinking, and imaginative problem-solving.",
    features: [
      "21st century skills",
      "Activity Based Learning with DIY projects",
      "STEAM education methodology"
    ]
  },
  {
    name: "School of Languages",
    description: "School of Languages provides exciting and effective language learning courses in Tamil, English, and Hindi. Additionally, we collaborate with the Indian School For Foreign Languages for French, German, and Japanese. Our dynamic and immersive learning methods are intended to improve speaking, writing, and listening abilities, ensuring overall competency.",
    features: [
      "Skill-Focused LSRW Course",
      "Interactive Learning with the Harkness Method",
      "Inclusive for All Learners"
    ]
  },
  {
    name: "School of Business",
    description: "School of Business helps students develop essential entrepreneurial, managerial, and leadership skills for today's dynamic world. With practical learning and real case studies, we prepare learners to think strategically and excel in modern business environments.",
    features: [
      "21st Century Business Skills",
      "Hands-on Learning with Real Case Studies",
      "Entrepreneurship & Leadership Development"
    ]
  },
  {
    name: "School of Finance",
    description: "School of Finance helps students build strong financial literacy and smart money-management skills. Through practical activities and simple real-life examples, learners understand budgeting, saving, investing, and financial planning with confidence.",
    features: [
      "Financial Literacy for Everyday Life",
      "Hands-on Budgeting & Investment Activities",
      "Builds Strong Analytical Skills"
    ]
  },
];

const EducateDivisionSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const containerRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!targetSection.current) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top 80%",
      end: "bottom top",
      scrub: 0,
    });

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, []);

  // Animate cards based on active index
  useEffect(() => {
    if (!containerRef.current || cardRefs.current.length === 0) return;

    const cards = cardRefs.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      if (!card) return;

      const isActive = index === activeIndex;
      const distance = Math.abs(index - activeIndex);
      
      // Calculate rotation and z-index based on position
      let rotation = 0;
      let zIndex = 4 - distance;
      
      if (index < activeIndex) {
        // Cards before active - rotate left
        rotation = -5 - (activeIndex - index) * 2;
      } else if (index > activeIndex) {
        // Cards after active - rotate right
        rotation = 10 + (index - activeIndex) * 2;
      }

      // Animate card
      gsap.to(card, {
        rotation: rotation,
        zIndex: zIndex,
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.95,
        duration: 0.8,
        ease: Power2.easeOut,
      });
    });
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    
    // Animate out current card
    const currentCard = cardRefs.current[activeIndex];
    if (currentCard) {
      gsap.to(currentCard, {
        opacity: 0,
        rotation: activeIndex < index ? -360 : 360,
        scale: 0,
        duration: 0.5,
        ease: Power2.easeIn,
        onComplete: () => {
          setActiveIndex(index);
        },
      });
    } else {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % DIVISIONS.length;
    handleCardClick(nextIndex);
  };

  const renderContent = (): React.ReactNode => (
    <div className="flex flex-col inner-container">
      <p className="section-title-sm seq">Our Division</p>
      <h1 className="section-heading seq mt-2">Explore our divisions</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl md:max-w-3xl w-full seq max-w-sm mt-2 px-2 md:px-0">
        specialized schools dedicated to excellence in education and career development.
      </h2>

      {/* Stacked Cards Container */}
      <div className="mt-12 md:mt-16 seq w-full">
        <style jsx>{`
          .stacked-container {
            width: 100%;
            height: 500px;
            position: relative;
            margin: 100px auto;
            max-width: 1200px;
          }

          .stacked-card {
            position: absolute;
            width: 70%;
            height: 500px;
            margin: auto;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-size: cover;
            background-position: center;
            background-color: rgba(5, 52, 126, 0.8);
            box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.5);
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
          }

          .stacked-card:hover {
            transform: translate(-50%, -50%) scale(1.02);
          }

          .card-bg-0 {
            background: linear-gradient(135deg, #05347e 0%, #0a5ba8 100%);
          }

          .card-bg-1 {
            background: linear-gradient(135deg, #0a5ba8 0%, #1e7bd8 100%);
          }

          .card-bg-2 {
            background: linear-gradient(135deg, #1e7bd8 0%, #3b9ae8 100%);
          }

          .card-bg-3 {
            background: linear-gradient(135deg, #3b9ae8 0%, #5ab5f0 100%);
          }

          .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 2rem;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
            color: white;
          }

          .card-title {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: white;
          }

          .card-description {
            font-size: 0.95rem;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1rem;
          }

          .card-features {
            list-style: none;
            padding: 0;
            margin: 0.5rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .card-feature {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          /* Increase text sizes for tablet and desktop only */
          @media (min-width: 768px) {
            .card-title {
              font-size: 2.25rem;
            }

            .card-description {
              font-size: 1.15rem;
              line-height: 1.7;
            }

            .card-feature {
              font-size: 1rem;
            }
          }

          @media (min-width: 1024px) {
            .card-title {
              font-size: 2.5rem;
            }

            .card-description {
              font-size: 1.25rem;
              line-height: 1.8;
            }

            .card-feature {
              font-size: 1.1rem;
            }
          }

          .card-feature::before {
            content: "•";
            color: #FBBF24;
            font-weight: bold;
            font-size: 1.2rem;
          }

          .card-nav {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            color: white;
            cursor: pointer;
            transition: transform 0.3s ease;
            z-index: 10;
          }

          .card-nav:hover {
            transform: translateX(5px);
          }

          .card-nav svg {
            width: 30px;
            height: 30px;
            fill: white;
          }

          .learn-more-btn {
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }

          .learn-more-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: rgba(255, 255, 255, 0.5);
          }

          @media (max-width: 768px) {
            .stacked-container {
              height: 400px;
            }

            .stacked-card {
              width: 85%;
              height: 400px;
            }

            .card-content {
              padding: 1.25rem;
            }

            .card-title {
              font-size: 1.25rem;
              margin-bottom: 0.4rem;
            }

            .card-description {
              font-size: 0.80rem;
              line-height: 1.4;
              margin-bottom: 0.75rem;
            }

            .card-features {
              margin: 0.4rem 0;
              gap: 0.35rem;
            }

            .card-feature {
              font-size: 0.7rem;
            }

            .learn-more-btn {
              padding: 0.75rem 1rem;
              font-size: 0.75rem;
              margin-top: 0.75rem;
            }
          }
        `}</style>
        
        <div ref={containerRef} className="stacked-container">
          {DIVISIONS.map((division, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`stacked-card card-bg-${index}`}
              onClick={() => handleCardClick(index)}
              style={{
                transform: `translate(-50%, -50%) rotate(${
                  index === 0 ? -5 : index === 1 ? 10 : index === 2 ? -5 : 10
                }deg)`,
                zIndex: 4 - index,
                opacity: index === 0 ? 1 : 0.7,
              }}
            >
              <div className="card-content">
                <h3 className="card-title">{division.name}</h3>
                {division.description && (
                  <p className="card-description">{division.description}</p>
                )}
                {division.features && division.features.length > 0 && (
                  <ul className="card-features">
                    {division.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="card-feature">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="card-buttons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                  {/* Learn more - Left side */}
                  <a
                    href="https://www.darecentre.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="learn-more-btn"
                    onClick={(e) => e.stopPropagation()}
                    style={{ margin: 0, padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}
                  >
                    Learn more
                  </a>
                  
                  {/* Enquiry Now button - Right side */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent("openContactModal"));
                    }}
                    className="enquiry-btn"
                    style={{
                      padding: '0.75rem 1.25rem',
                      background: 'linear-gradient(to right, #0a5ba8, #05347e)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Enquiry Now
                  </button>
                </div>
                {index === activeIndex && (
                  <div className="card-nav" onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}>
                    <svg viewBox="0 0 448 512" fill="white">
                      <title>Next</title>
                      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="division"
      className={`pt-2 md:pt-4 pb-2 md:pb-4 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderContent()}
    </section>
  );
};

export default EducateDivisionSection;

