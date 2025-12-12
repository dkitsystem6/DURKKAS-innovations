// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { MENULINKS, SOCIAL_LINKS, INNOVATE_MENULINKS, EDUCATE_MENULINKS, ELEVATE_MENULINKS } from "../../constants";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const isInnovatePage = router.pathname === "/innovate";
  const isEducatePage = router.pathname === "/educate";
  const isElevatePage = router.pathname === "/elevate";
  
  // Get menu links based on current page
  const menuLinks = isInnovatePage ? INNOVATE_MENULINKS : isEducatePage ? EDUCATE_MENULINKS : isElevatePage ? ELEVATE_MENULINKS : MENULINKS;

  const renderSocialIcons = (): React.ReactNode => {
    return Object.keys(SOCIAL_LINKS).map((el: keyof typeof SOCIAL_LINKS) => (
      <a
        href={SOCIAL_LINKS[el]}
        key={el}
        className="link hover:opacity-80 duration-300 md:px-2 px-1"
        rel="noreferrer"
        target="_blank"
      >
        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
      </a>
    ));
  };

  const renderQuickLinks = (): React.ReactNode => {
    // Always show index page (MENULINKS) in Quick Links section
    return MENULINKS.map((link) => {
      return (
        <li key={link.name} className="mb-2 md:mb-3">
          <Link href={`#${link.ref}`} scroll={false}>
            <a 
              onClick={(e) => {
                // Handle navigation - if not on home page, navigate to home page with hash
                if (router.pathname !== '/') {
                  e.preventDefault();
                  router.push(`/#${link.ref}`).then(() => {
                    // Wait for page to load, then scroll
                    setTimeout(() => {
                      const element = document.getElementById(link.ref);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  });
                } else {
                  // Already on home page, just scroll
                  e.preventDefault();
                  const element = document.getElementById(link.ref);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
              className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          </Link>
        </li>
      );
    });
  };

  const renderMenuLinks = (): React.ReactNode => {
    return menuLinks.map((link) => {
      const isExternal = (link as any).isExternal;
      let href = link.ref;
      
      // If not external, check if it's a hash link or needs page navigation
      if (!isExternal) {
        // If it's a hash link (starts with #), use it as is
        if (link.ref.startsWith('#')) {
          href = link.ref;
        } else {
          // Otherwise, it's a section on current page - use hash link
          href = `#${link.ref}`;
        }
      }
      
      return (
        <li key={link.name} className="mb-2 md:mb-3">
          {isExternal ? (
            <Link href={href}>
              <a className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300">
                {link.name}
              </a>
            </Link>
          ) : (
            <Link href={href} scroll={false}>
              <a 
                onClick={(e) => {
                  // Handle navigation - if not on home page, navigate to home page with hash
                  if (router.pathname !== '/') {
                    e.preventDefault();
                    router.push(`/#${link.ref}`).then(() => {
                      // Wait for page to load, then scroll
                      setTimeout(() => {
                        const element = document.getElementById(link.ref);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    });
                  } else {
                    // Already on home page, just scroll
                    e.preventDefault();
                    const element = document.getElementById(link.ref);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300 cursor-pointer"
              >
                {link.name}
              </a>
            </Link>
          )}
        </li>
      );
    });
  };

  const renderFooterContent = (): React.ReactNode => (
    <>
      <div className="w-full max-w-6xl mx-auto">
        {/* Social Media Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center px-4 mb-6 md:mb-8">
            Connect with us on social media
          </h1>
          <div className="flex justify-center flex-wrap gap-4">{renderSocialIcons()}</div>
        </div>

        {/* Address and Links Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 mb-8 md:mb-12">
          {/* Address - Left Side - Full width on mobile, centered on mobile */}
          <div className="text-center md:text-left w-full md:flex-1 md:min-w-[200px] lg:min-w-[250px]">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white/90">
              Our Location
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed mb-4 md:hidden">
              NO. 58/2, MDR NAGAR NORTH,<br />
              CHOKKALINGAPURAM, ARUPPUKOTTAI,<br />
              VIRUDHUNAGAR-626101, TAMILNADU
            </p>
            {/* Google Maps Embed */}
            <div className="w-full max-w-[300px] mx-auto md:mx-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.9289154596004!2d78.10286547367897!3d9.51490568119652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0130022d4768e3%3A0x4609380ecf6051b4!2sDurkkas%20Innovations%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1765529065181!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Divider Line */}
          <div className="hidden md:flex items-center justify-center mx-2">
            <div className="w-px h-32 bg-white/20"></div>
          </div>

          {/* Links Grid - Hidden on mobile, Desktop: single row with Quick Links */}
          <div className="hidden md:flex md:flex-row gap-6 md:gap-4 lg:gap-6 w-full md:w-auto">
            {/* Quick Links - Always shows index page links - Hidden on mobile, visible on tablet and desktop */}
            <div className="hidden md:block text-center md:text-left md:flex-1 md:min-w-[120px] lg:min-w-[140px]">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white/90">
                Quick Links
              </h2>
              <ul className="list-none p-0 m-0">
                {renderQuickLinks()}
              </ul>
            </div>

            {/* Divider Line */}
            <div className="hidden md:flex items-center justify-center mx-2">
              <div className="w-px h-32 bg-white/20"></div>
            </div>

            {/* Innovate Section */}
            <div className="text-center md:text-left md:flex-1 md:min-w-[120px] lg:min-w-[140px]">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white/90">
                Innovate
              </h2>
              <ul className="list-none p-0 m-0">
                {INNOVATE_MENULINKS.map((link) => {
                  const isExternal = link.isExternal;
                  let href = link.ref;
                  
                  // If not external, it's a section on the innovate page
                  if (!isExternal) {
                    href = `/innovate#${link.ref}`;
                  }
                  
                  return (
                    <li key={link.name} className="mb-2 md:mb-3">
                      {isExternal ? (
                        <Link href={href}>
                          <a className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300">
                            {link.name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={href} scroll={false}>
                          <a 
                            onClick={(e) => {
                              // Handle navigation and scroll
                              if (router.pathname !== '/innovate') {
                                router.push(`/innovate#${link.ref}`);
                              } else {
                                e.preventDefault();
                                const element = document.getElementById(link.ref);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }}
                            className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300 cursor-pointer"
                          >
                            {link.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Divider Line */}
            <div className="hidden md:flex items-center justify-center mx-2">
              <div className="w-px h-32 bg-white/20"></div>
            </div>

            {/* Educate Section */}
            <div className="text-center md:text-left md:flex-1 md:min-w-[120px] lg:min-w-[140px]">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white/90">
                Educate
              </h2>
              <ul className="list-none p-0 m-0">
                {EDUCATE_MENULINKS.map((link) => {
                  const isExternal = link.isExternal;
                  let href = link.ref;
                  
                  // If not external, it's a section on the educate page
                  if (!isExternal) {
                    href = `/educate#${link.ref}`;
                  }
                  
                  return (
                    <li key={link.name} className="mb-2 md:mb-3">
                      {isExternal ? (
                        <Link href={href}>
                          <a className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300">
                            {link.name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={href} scroll={false}>
                          <a 
                            onClick={(e) => {
                              if (router.pathname !== '/educate') {
                                router.push(`/educate#${link.ref}`);
                              } else {
                                e.preventDefault();
                                const element = document.getElementById(link.ref);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }}
                            className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300 cursor-pointer"
                          >
                            {link.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Divider Line */}
            <div className="hidden md:flex items-center justify-center mx-2">
              <div className="w-px h-32 bg-white/20"></div>
            </div>

            {/* Elevate Section */}
            <div className="text-center md:text-left md:flex-1 md:min-w-[120px] lg:min-w-[140px]">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-white/90">
                Elevate
              </h2>
              <ul className="list-none p-0 m-0">
                {ELEVATE_MENULINKS.map((link) => {
                  const isExternal = link.isExternal;
                  let href = link.ref;
                  
                  // If not external, it's a section on the elevate page
                  if (!isExternal) {
                    href = `/elevate#${link.ref}`;
                  }
                  
                  return (
                    <li key={link.name} className="mb-2 md:mb-3">
                      {isExternal ? (
                        <Link href={href}>
                          <a className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300">
                            {link.name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={href} scroll={false}>
                          <a 
                            onClick={(e) => {
                              if (router.pathname !== '/elevate') {
                                router.push(`/elevate#${link.ref}`);
                              } else {
                                e.preventDefault();
                                const element = document.getElementById(link.ref);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }}
                            className="text-xs sm:text-sm md:text-base text-white/70 hover:text-white/90 transition-colors duration-300 cursor-pointer"
                          >
                            {link.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 md:pt-8">
          <p className="text-center text-xs sm:text-sm md:text-base text-white px-4">
            © 2025 Durkkas Innovations Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );

  const { ref: footerRef } = MENULINKS[4];

  return (
    <footer
      className="w-full relative select-none flex flex-col items-stretch pb-0 mb-0"
      id={footerRef}
      style={{ 
        minHeight: "auto",
        backgroundColor: '#0d4a8f'
      }}
    >
      <div className="h-full w-full pb-0 mb-0">
        <div className="section-container flex-col flex h-full justify-end z-10 items-center py-12 pb-8 mb-0">
          {renderFooterContent()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

