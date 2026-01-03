import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import gsap from "gsap";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { galleryData } from "../data/data.js";
import AnimatedTitle from "../components/AnimatedTitle.jsx";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const sectionRef = useRef(null);

  useSectionReveal(sectionRef);

  const handleEnter = (el) => {
    gsap.to(el.querySelector("img"), {
      scale: 1.12,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = (el) => {
    gsap.to(el.querySelector("img"), {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center flex flex-col gap-6">
          <h2 className="tracking-widest text-white/70 lg:text-[50px] uppercase">
            <AnimatedTitle
          title={["Nuestra Experiencia"]}
          containerClass="mix-blend-difference"
        />
          </h2>
          <p className="text-gray-400 max-w-xl text-2xl  mx-auto reveal-item">
            Un espacio pensado para disfrutar el café con todos los sentidos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {galleryData.map((image, i) => (
            <button
              key={image.id}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              onMouseEnter={(e) => handleEnter(e.currentTarget)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
              className={`
                reveal-item
                relative overflow-hidden rounded-xl
                ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={galleryData.map((img) => ({ src: img.src }))}
        />
      </div>
    </section>
  );
};

export default Gallery;
