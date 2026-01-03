import { useLayoutEffect } from "react";
import gsap from "gsap";

export const useSectionReveal = (
  ref,
  {
    selector = ".reveal-item",
    y = 40,
    duration = 1,
    stagger = 0.12,
    delay = 0,
  } = {}
) => {
  useLayoutEffect(() => {
    if (!ref?.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: "power3.out",
      });
    }, ref);

    return () => ctx.revert();
  }, []);
};
