import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll.js";

const ImageClipBox = ({ src, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} alt="" className="block max-w-none" />
    </div>
  );
};

const Contact = () => {
  const textRef = useRef(null);

  // 👉 SOLO el texto se revela
  useRevealOnScroll(textRef);

  return (
    <section
      id="contacto"
      className="
        relative
        min-h-dvh
        w-full
        px-6
        lg:px-10
        flex
        items-center
        justify-center
        lg:py-10"
    >
      <div
        className="
          relative
          flex
          w-full
          max-w-8xl
          flex-col
          items-center
          justify-center
          rounded-lg
          bg-black
          lg:py-52
          py-24
          px-12
          overflow-hidden"
      >
        {/* IMÁGENES LATERALES (SIN ANIMACIÓN) */}
        <div className="hidden lg:flex pointer-events-none absolute inset-y-0 left-0 items-center opacity-90">
          <div className="relative ml-10 flex flex-col gap-6">
            <ImageClipBox
              src="/images/gallery-4.jpg"
              clipClass="contact-clip-path-1 w-max object-cover lg:-translate-x-120 opacity-90"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:flex items-center">
          <div className="relative flex flex-col gap-6">
            <ImageClipBox
              src="/images/cafe.webp"
              clipClass="contact-clip-path-2 size-full object-cover lg:translate-x-80"
            />
          </div>
        </div>

        {/* CONTENEDOR DE TEXTO (ANIMADO) */}
        <div
          ref={textRef}
          className="
            flex flex-col size-full p-4 justify-center items-center space-y-6"
        >
          <p className="font-general text-xs sm:text-sm uppercase tracking-[0.35em] text-white/60">
            Sigamos conversando
          </p>
          <h2 className="tracking-widest text-white/70 lg:text-[50px] uppercase">Conoce Sobre Nosotros</h2>

          <AnimatedTitle
            lines={["NUESTRA HISTORIA", "CONTINÚA"]}
            effect="flip"
            className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-neutral-100
              via-neutral-300
              to-neutral-500
            "
          />

          <div className="space-y-5">
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Cada café que preparamos es una invitación a detenerse, observar y
              disfrutar. Creemos en procesos honestos, materias primas de
              calidad y en el valor de hacer las cosas bien, sin atajos.
            </p>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Si compartes nuestra visión del café como experiencia, ritual y
              expresión de origen, estaremos encantados de escucharte.
            </p>
          </div>

          <Button
            title={["Contáctanos"]}
            containerClass="mt-6 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
