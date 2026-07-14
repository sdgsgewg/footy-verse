"use client";

import { useEffect } from "react";

const useFixedNavbar = () => {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("header");

    if (!header) return;

    const fixedNav = header.offsetTop;

    const handleScroll = () => {
      if (window.scrollY > fixedNav) {
        header.classList.add("navbar-fixed");
      } else {
        header.classList.remove("navbar-fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useFixedNavbar;
