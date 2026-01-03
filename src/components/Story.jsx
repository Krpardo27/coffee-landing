import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import Button from "./Button";

const Story = () => {
  const frameRef = useRef(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section
      id="story"
      className="relative w-full px-6 lg:px-10 flex items-center justify-center py-20 lg:pt-32 overflow-hidden"
    >
      <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-10 lg:pt-10">
        {/* Subtitle */}
        <p className="text-xs sm:text-sm uppercase tracking-widest text-white/70 lg:text-[50px]">
          THE MULTIVERSE IP WORLDS
        </p>

        {/* Title */}
        <AnimatedTitle
          title={["OUR STORY", "CONTINUES"]}
          sectionId="#story"
          containerClass="mix-blend-difference relative z-20 text-center"
        />

        {/* Imagen */}
        {/* <div className="story-img-container">
          <div className="story-img-mask">
            <div className="story-img-content">
              <img
                ref={frameRef}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseLeave}
                src="/images/gallery-3.jpg"
                alt="Café"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div> */}

        
      </div>
    </section>
  );
};

export default Story;
