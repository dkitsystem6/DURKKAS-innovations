import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Menu from "@/components/common/menu";

const Header = () => {
  const [menuVisible, setmenuVisible] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  // Detect scroll – hide logo after section-1
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setHideLogo(true); // hide after 50% scroll
      } else {
        setHideLogo(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none w-full fixed top-0 py-8 select-none z-50 bg-transparent">
      <div className="flex justify-between section-container">
        {/* Logo — hide on scroll */}
        <div
          className={`pointer-events-auto transition-all duration-500 ${
            hideLogo
              ? "opacity-0 translate-x-[-20px] pointer-events-none"
              : "opacity-100"
          }`}
        >
          {isHomePage ? (
            <a href="#home" className="link">
              <Image
                src="/favicon.png"
                alt="DURKKAS Logo"
                width={40}
                height={40}
              />
            </a>
          ) : (
            <Link href="/">
              <a className="link">
                <Image
                  src="/favicon.png"
                  alt="DURKKAS Logo"
                  width={40}
                  height={40}
                />
              </a>
            </Link>
          )}
        </div>

        {/* Menu — always visible */}
        <nav
          className={`pointer-events-auto outer-menu ${
            menuVisible ? "menu-visible" : ""
          }`}
        >
          <button
            className={`hamburger w-6 h-6 flex items-center justify-center link relative -ml-4 md:ml-0 ${
              menuVisible ? "z-[100]" : "z-10"
            }`}
            onClick={() => setmenuVisible(!menuVisible)}
            aria-label={menuVisible ? "Close menu" : "Open menu"}
          >
            <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center"></div>
          </button>

          <Menu setmenuVisible={setmenuVisible} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
