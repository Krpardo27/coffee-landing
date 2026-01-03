import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-dvh w-full text-cream uppercase">
      {/* Imagen de fondo */}
      <img
        src="images/hero-coffee.jpg"
        alt="Café artesanal"
        className="absolute inset-0 size-full object-cover"
      />

       <div className="absolute inset-0 bg-black/50" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 flex min-h-dvh items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-sans font-bold leading-tight">
            Café que se siente,
            <span className="text-coffee"> no solo se bebe</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 normal-case">
            Granos seleccionados, tueste artesanal y un espacio pensado para
            disfrutar cada momento.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-coffee px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
              Ver menú
            </button>
            <button className="border border-white/30 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
              Reservar mesa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
