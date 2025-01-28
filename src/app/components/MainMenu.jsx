"use client";

import { Icon } from "@iconify/react";
import Logo from "./Logo";
import Button from "./Button";
import { listMenu } from "../../../mainMenuItems";
import Link from "next/link";
import { Hamburger } from "./Hamburger";
import { useEffect, useState } from "react";

export default function MainMenu({ page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHeightReduced, setIsHeightReduced] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollThreshold = 100; // Le seuil de scroll que tu souhaites
  const scrollTolerance = 50; // La tolérance de défilement
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsXL(window.innerWidth >= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOpenMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Vérification du seuil avec une tolérance
    if (scrollTop > scrollThreshold + scrollTolerance && !isHeightReduced) {
      setIsHeightReduced(true); // Réduire la hauteur si on dépasse le seuil + tolérance
    } else if (
      scrollTop < scrollThreshold - scrollTolerance &&
      isHeightReduced
    ) {
      setIsHeightReduced(false);
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHeightReduced]);

  const classGeneral =
    page === "home"
      ? isHeightReduced
        ? "sticky"
        : "block xl:fixed"
      : "sticky";

  const classDisposition = isHeightReduced
    ? "h-16 m-0 bg-white shadow-lg"
    : page != "home"
      ? "h-32 m-2 rounded-xl bg-white"
      : "h-32 m-2 rounded-xl bg-white xl:bg-transparent";

  const classHamburger =
    page == "home"
      ? isHeightReduced
        ? "block xl:hidden"
        : "block"
      : "block xl:hidden";

  const classDispositionLogo =
    page == "home"
      ? isHeightReduced
        ? "ml-6 w-20"
        : "w-44 xl:w-80 absolute top-4 left-1/2 -translate-x-1/2"
      : isHeightReduced
        ? "ml-6 w-20"
        : "w-44";

  const classLogo =
    page == "home"
      ? isHeightReduced
        ? "color"
        : isXL
          ? "white"
          : "color"
      : "color";

  const classMainMenu =
    page == "home"
      ? isHeightReduced
        ? "hidden xl:flex"
        : "hidden"
      : "hidden xl:flex";

  const colorHamburger =
    page == "home"
      ? isHeightReduced
        ? "#000"
        : isXL
          ? "#FFF"
          : "#000"
      : "#000";

  return (
    <div
      className={`${classGeneral} w-full top-0 z-20 rounded-xl mx-auto transform duration-100`}
    >
      <div
        className={` ${classDisposition}
          p-3 flex items-center justify-between transform duration-500 top-0 z-50 animate__animated animate__bounceInDown animate__delay`}
      >
        <button className={`${classHamburger}`} onClick={toggleOpenMenu}>
          <Hamburger color={colorHamburger} size={isHeightReduced ? 24 : 48} />
        </button>
        <div
          className={`flex-0.5 transform duration-300 ${classDispositionLogo}`}
        >
          <Logo theme={classLogo} />
        </div>
        <div className={`${classMainMenu}  justify-center w-full flex-1`}>
          <div className="flex items-center justify-center space-x-2">
            {listMenu.map((item) => (
              <div
                key={item.label}
                className={`${page == "home"
                    ? isHeightReduced
                      ? "hover:bg-secondary"
                      : "hover:bg-or-light"
                    : "hover:bg-secondary"
                  } rounded-lg group relative transform duration-200 z-50 cursor-pointer`}
              >
                <Link
                  href={item.link}
                  className="group-hover:text-primary text-secondary transform duration-500 flex items-center space-x-1 px-4 py-2"
                >
                  {/* <Icon
                    icon={item.icon}
                    width="24"
                    height="24"
                    className={`${page == "home"
                        ? isHeightReduced
                          ? "group-hover:text-primary text-secondary"
                          : "group-hover:text-black text-white"
                        : "group-hover:text-primary text-secondary"
                      } cursor-pointer transform duration-700 delay-300`}
                  /> */}
                  <span
                    className={`${page == "home"
                        ? isHeightReduced
                          ? "group-hover:text-primary text-secondary"
                          : "group-hover:text-black text-white text-lg"
                        : "group-hover:text-primary text-secondary"
                      } transform duration-500`}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.children?.length > 0 && (
                  <div className="absolute top-full left-0 hidden group-hover:block overflow-hidden">
                    <div className="mt-2 p-4 w-96 bg-white border rounded-xl shadow-lg ">
                      <div>
                        {item.children.map((child) => (
                          <Link
                            href={child.link}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-secondary hover:text-primary text-secondary rounded-lg duration-150 transform"
                            key={child.label}
                          >
                            <Icon icon={child.icon} width="20" height="20" />
                            <div>{child.label}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-end space-x-4 flex-0.5">
          <a href="/contact">
            <Button color="primary" text="Contact" size="small" />
          </a>
          <a href="https://extranet.marbrerie-pythagore.fr">
            <Button color="or" text="Espace pro" size="small" />
          </a>
        </div>
      </div>
      {isOpen && (
        <div
          className={`fixed inset-0 h-screen w-screen bg-white z-50 shadow-xl flex flex-col justify-start overflow-y-auto py-12 ${isClosing
              ? "animate__animated animate__fadeOutLeft"
              : "animate__animated animate__fadeInLeft"
            }`}
        >
          <div className="w-full flex justify-end absolute top-2 right-2">
            <button onClick={toggleOpenMenu}>
              <Icon icon="material-symbols:close" width="36" height="36" />
            </button>
          </div>
          <div>
            <div className="py-20">
              {listMenu.map((item) => (
                <div key={item.label} className="my-1 p-1">
                  <div className="flex items-center justify-center space-x-1">
                    <Link href={item.link} className="text-3xl">
                      {item.label}
                    </Link>
                  </div>
                  {item.children?.length > 0 && (
                    <div className="">
                      <div>
                        <div>
                          {item.children.map((child) => (
                            <div className="px-4 text-xl" key={child.label}>
                              <Link href={child.link} className="">
                                {child.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <a href="/contact">
              <Button color="primary" text="Contact" size="small" />
            </a>
            <a href="https://extranet.marbrerie-pythagore.fr">
              <Button color="or" text="Espace pro" size="small" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
