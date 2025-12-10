
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MENULINKS, INNOVATE_MENULINKS, EDUCATE_MENULINKS, ELEVATE_MENULINKS } from "../../constants";

const Menu = ({
  setmenuVisible,
}: {
  setmenuVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const isInnovatePage = router.pathname === "/innovate";
  const isEducatePage = router.pathname === "/educate";
  const isElevatePage = router.pathname === "/elevate";
  const menuLinks = isInnovatePage ? INNOVATE_MENULINKS : isEducatePage ? EDUCATE_MENULINKS : isElevatePage ? ELEVATE_MENULINKS : MENULINKS;

  return (
    <section
      className="menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-center"
      style={{ visibility: "hidden" }}
    >
      <div className="flex-none overflow-hidden flex items-center justify-center">
        <div className="text-center opacity-0 overflow-y-auto flex flex-none justify-center items-center max-h-screen">
          <ul
            className="list-none py-4 px-0 m-0 block max-h-screen"
            role="menu"
          >
            {menuLinks.map((el) => (
              <li
                className="p-0 m-6 text-2xl block"
                key={el.name}
                role="menuitem"
              >
                {(el as any).isExternal ? (
                  <Link href={el.ref}>
                    <a
                      className="link relative inline font-bold text-5xl duration-300 hover:no-underline"
                      onClick={setmenuVisible.bind(null, false)}
                    >
                      {el.name}
                    </a>
                  </Link>
                ) : (
                <a
                  className="link relative inline font-bold text-5xl duration-300 hover:no-underline"
                  href={`#${el.ref}`}
                  onClick={setmenuVisible.bind(null, false)}
                >
                  {el.name}
                </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Menu;
