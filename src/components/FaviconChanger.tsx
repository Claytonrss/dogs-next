"use client";

import { useEffect } from "react";

const FaviconChanger = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      console.log("🚀 ~ updateFavicon ~ isDarkMode:", isDarkMode)
      const faviconLink = document.getElementById(
        "favicon-link"
      ) as HTMLLinkElement;
      if (faviconLink) {
        faviconLink.href = isDarkMode
          ? "/favicon-dark.ico"
          : "/favicon-light.ico";
      }
    };

    updateFavicon();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateFavicon);

    return () => {
      mediaQuery.removeEventListener("change", updateFavicon);
    };
  }, []);

  return null;
};

export default FaviconChanger;
