import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export function useRevealOnScroll(
  ref,
  {
    y = 60,
    opacity = 0,
    scale = 0.96,
    blur = 10,
    start = "top 85%",
    duration = 0.9,
    ease = "power3.out",
    once = true,
  } = {}
) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Estado inicial
      gsap.set(ref.current, {
        opacity,
        y,
        scale,
        filter: blur ? `blur(${blur}px)` : "none",
      });

      // Animación on scroll
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);
}
