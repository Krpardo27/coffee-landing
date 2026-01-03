import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const effects = {
  flip: {
    from: {
      opacity: 0,
      y: 40,
      rotateX: 90,
      transformOrigin: "50% 50% -20",
    },
    to: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      ease: "power3.out",
    },
  },
  slide: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0, ease: "power3.out" },
  },
};

const AnimatedTitle = ({
  lines = [],
  effect = "flip",
  align = "center",
  triggerStart = "top 85%",
  className,
}) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray("[data-word]", containerRef.current);
      const { from, to } = effects[effect];

      gsap.set(words, from);

      gsap.to(words, {
        ...to,
        stagger: {
          each: 0.04,
          from: "start",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [effect, triggerStart]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "animated-title overflow-hidden",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="flex flex-wrap gap-x-3 gap-y-1"
        >
          {line.split(" ").map((word, j) => (
            <span
              key={j}
              data-word
              className="inline-block font-display text-4xl md:text-6xl font-semibold tracking-tight"
            >
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
