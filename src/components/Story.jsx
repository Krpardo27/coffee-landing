import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const Story = () => {
  const sectionRef = useRef(null);

  useRevealOnScroll(sectionRef);

  return (
    <section
      id="story"
      className="
        relative
        min-h-dvh
        w-full
        px-6
        lg:px-10
        flex
        items-center
        justify-center
        lg:py-32"
    >
      <div
        ref={sectionRef}
        className="relative
          flex
          w-full
          max-w-8xl
          flex-col
          items-center
          justify-center
          rounded-lg
          bg-black
          lg:py-52
          p-12
          overflow-hidden"
      >
        <div className="flex flex-col size-full p-4 justify-center items-center space-y-6">
          <p className="font-general text-xs sm:text-sm uppercase tracking-[0.35em] text-white/60">
            Sigamos conversando
          </p>
          <h2 className="tracking-widest text-white/70 lg:text-[50px] uppercase">
            Nuestra Especialidad
          </h2>
          <AnimatedTitle
            lines={["CAFÉ FINAMENTE", "SELECCIONADO"]}
            effect="flip"
            className="
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-neutral-100
    via-neutral-300
    to-neutral-500
    text-center
  "
          />
          <div className="space-y-5">
            <p className="max-w-4xl text-xl leading-relaxed text-cream">
              Creemos en el café bien hecho y en la comida que se disfruta sin
              apuro. Trabajamos con granos de especialidad y productos
              seleccionados, cuidando cada detalle del proceso: desde el origen
              hasta la mesa. Nuestro espacio combina café, cocina y ambiente
              para crear un lugar donde quedarse, compartir y volver. Todo lo
              que servimos tiene una intención clara: calidad real, sabor
              honesto y una experiencia que se siente cercana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
