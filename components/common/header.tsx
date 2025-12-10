// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Menu from "@/components/common/menu";

const Header = () => {
  const [menuVisible, setmenuVisible] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <header className="w-full fixed top-0 py-8 select-none z-50 bg-gradient-to-b from-gray-900 to-transparent">
      <div className="flex justify-between section-container">
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
        <nav className={`outer-menu ${menuVisible ? "menu-visible" : ""}`}>
          <button
            className="hamburger w-6 h-6 flex items-center justify-center link relative -ml-4 md:ml-0"
            onClick={setmenuVisible.bind(null, !menuVisible)}
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
