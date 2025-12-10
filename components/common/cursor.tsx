// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import styles from "./Cursor.module.scss";
import { MutableRefObject, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { IDesktop, isSmallScreen } from "pages";

const CURSOR_STYLES = {
  CURSOR: "fixed hidden bg-white w-4 h-4 select-none pointer-events-none z-50",
  FOLLOWER: "fixed hidden h-8 w-8 select-none pointer-events-none z-50",
};

const Cursor = ({ isDesktop }: IDesktop) => {
  const cursor: MutableRefObject<HTMLDivElement> = useRef(null);
  const follower: MutableRefObject<HTMLDivElement> = useRef(null);
  const rafIdRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const onHover = () => {
    if (cursor.current && follower.current) {
      gsap.to(cursor.current, {
        scale: 0.5,
        duration: 0.3,
      });
      gsap.to(follower.current, {
        scale: 3,
        duration: 0.3,
      });
    }
  };

  const onUnhover = () => {
    if (cursor.current && follower.current) {
      gsap.to(cursor.current, {
        scale: 1,
        duration: 0.3,
      });
      gsap.to(follower.current, {
        scale: 1,
        duration: 0.3,
      });
    }
  };

  // Throttle mouse move for better performance using requestAnimationFrame
  const moveCircle = (e: MouseEvent) => {
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (cursor.current && follower.current) {
          // Use CSS transforms directly for better performance
          cursor.current.style.transform = `translate(${lastPosRef.current.x}px, ${lastPosRef.current.y}px)`;
          gsap.to(follower.current, {
            x: lastPosRef.current.x,
            y: lastPosRef.current.y,
            duration: 0.3,
            ease: Linear.easeNone,
          });
        }
        rafIdRef.current = null;
      });
    }
  };

  useEffect(() => {
    if (!isDesktop || isSmallScreen()) return;
    if (!cursor.current || !follower.current) return;
    
    follower.current.classList.remove("hidden");
    cursor.current.classList.remove("hidden");

    document.addEventListener("mousemove", moveCircle, { passive: true });

    const links = document.querySelectorAll(".link");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onHover, { passive: true });
      el.addEventListener("mouseleave", onUnhover, { passive: true });
    });

    return () => {
      document.removeEventListener("mousemove", moveCircle);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onHover);
        el.removeEventListener("mouseleave", onUnhover);
      });
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isDesktop]);

  return (
    <>
      <div
        ref={cursor}
        className={`${styles.cursor} ${CURSOR_STYLES.CURSOR}`}
      ></div>
      <div
        ref={follower}
        className={`${styles.cursorFollower} ${CURSOR_STYLES.FOLLOWER}`}
      ></div>
    </>
  );
};

export default Cursor;
