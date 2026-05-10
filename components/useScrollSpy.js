"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds = []) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 👇 when section is in view
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px", // 👈 tweak this for when "active" switches
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [sectionIds]);

  return active;
}