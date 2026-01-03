import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title = [], containerClass }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "center 60%",
            toggleActions: "play none none reverse",
          },
        })
        .to(
          gsap.utils.toArray(".animated-word", containerRef.current),
          {
            opacity: 1,
            transform:
              "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
            ease: "power2.inOut",
            stagger: 0.03,
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "animated-title flex flex-col gap-2 overflow-hidden",
        containerClass
      )}
    >
      {title.map((line, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word whitespace-nowrap"
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
