import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { useSectionReveal } from "../hooks/useSectionReveal";
import { galleryData } from "../data/data.js";
import AnimatedTitle from "../components/AnimatedTitle.jsx";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll.js";
import { useGalleryReveal } from "../hooks/useGalleryReveal.js";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ref = useRef(null);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Solo títulos / textos
  useSectionReveal(sectionRef);
  useRevealOnScroll(ref);
  useGalleryReveal(gridRef);

  const handleClick = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center flex flex-col gap-6">
          <h2 className="tracking-widest text-white/70 lg:text-[50px] uppercase">
            <AnimatedTitle
              title={["Nuestra Experiencia"]}
              containerClass="mix-blend-difference"
            />
          </h2>

          <p className="text-gray-400 max-w-xl text-2xl mx-auto reveal-item">
            Un espacio pensado para disfrutar el café con todos los sentidos.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px]"
        >
          {galleryData.map((image, i) => (
            <button
              key={image.id}
              onClick={() => handleClick(i)}
              className={`
                gallery-item group
                relative overflow-hidden rounded-xl focus:outline-none
                ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              {/* Overlay */}
              <div
                className="
                  absolute inset-0 z-10
                  bg-black/0
                  transition-colors duration-500
                  group-hover:bg-black/30
                "
              />

              {/* Imagen */}
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="
                  w-full h-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                  group-hover:-translate-y-1
                "
              />
            </button>
          ))}
        </div>

        {/* Lightbox */}
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
