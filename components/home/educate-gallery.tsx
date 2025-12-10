// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const EducateGallerySection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const galleryListRef: MutableRefObject<HTMLUListElement> = useRef(null);
  const galleryContainerRef: MutableRefObject<HTMLDivElement> = useRef(null);

  // Generate image paths: 1.JPG to 9.JPG, 10.JPG to 14.JPG, and 15.jpeg to 17.jpeg
  const imagePaths: string[] = [];
  for (let i = 1; i <= 9; i++) {
    imagePaths.push(`/gallery/${i}.JPG`);
  }
  for (let i = 10; i <= 14; i++) {
    imagePaths.push(`/gallery/${i}.JPG`);
  }
  for (let i = 15; i <= 17; i++) {
    imagePaths.push(`/gallery/${i}.jpeg`);
  }

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

  // Mouse wheel scroll functionality
  useEffect(() => {
    if (!galleryContainerRef.current) return;

    const container = galleryContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;
      const isAtEnd = currentScroll >= maxScroll - 1; // Allow 1px tolerance

      // If not at the end, scroll horizontally and prevent vertical scroll
      if (!isAtEnd) {
        e.preventDefault();
        const scrollAmount = e.deltaY * 0.5; // Adjust scroll speed
        container.scrollLeft += scrollAmount;
      }
      // If at the end, allow normal vertical scroll to next section
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const renderContent = (): React.ReactNode => (
    <div className="flex flex-col inner-container">
      <p className="section-title-sm seq">Our Gallery</p>
      <h1 className="section-heading seq mt-2">Explore our gallery</h1>
      <h2 className="text-lg sm:text-xl md:text-2xl md:max-w-3xl w-full seq max-w-sm mt-2 px-2 md:px-0">
        showcasing moments from our educational journey and achievements.
      </h2>

      {/* Gallery Container */}
      <div className="mt-12 md:mt-16 seq w-full">
        <style jsx>{`
          .gallery-container {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            scroll-behavior: smooth;
            padding: 2rem 0;
          }

          .gallery-container::-webkit-scrollbar {
            background-color: rgba(255, 255, 255, 0.1);
            height: 8px;
          }

          .gallery-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 99em;
          }

          .gallery-list {
            display: inline-flex;
            list-style: none;
            padding: 0;
            margin: 0;
            gap: 1rem;
          }

          .gallery-item {
            position: sticky;
            left: 0;
            width: min(50vw, 350px);
            flex-shrink: 0;
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: -10px 0 30px 0 rgba(0, 0, 0, 0.25);
            transition: transform 0.3s ease;
          }

          .gallery-item:hover {
            transform: scale(1.05);
          }

          .gallery-item img {
            display: block;
            width: 100%;
            height: auto;
            object-fit: cover;
            margin-bottom: 0;
          }

          @media (max-width: 768px) {
            .gallery-item {
              width: min(70vw, 300px);
            }
          }
        `}</style>
        
        <div ref={galleryContainerRef} className="gallery-container">
          <ul ref={galleryListRef} className="gallery-list">
            {imagePaths.map((imagePath, index) => (
              <li key={index} className="gallery-item">
                <Image 
                  src={imagePath} 
                  alt={`Gallery image ${index + 1}`}
                  width={350}
                  height={350}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="gallery"
      className={`pt-4 md:pt-6 pb-4 md:pb-6 w-full relative select-none section-container overflow-x-hidden`}
      ref={targetSection}
    >
      {renderContent()}
    </section>
  );
};

export default EducateGallerySection;
