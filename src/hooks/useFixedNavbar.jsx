"use client";

import { useEffect } from "react";

const useFixedNavbar = () => {
  useEffect(() => {
    const header = document.querySelector("header");
    const fixedNav = header.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > fixedNav) {
        header.classList.add("navbar-fixed");
      } else {
        header.classList.remove("navbar-fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useFixedNavbar;
