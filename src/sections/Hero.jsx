import AnimatedTitle from "../components/AnimatedTitle";

const Hero = () => {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="images/hero/hero-1.jpg"
        alt="Café artesanal"
        className="absolute inset-0 size-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto px-6 max-w-7xl flex min-h-dvh items-center">
        <div className="space-y-6w-full">
          {/* TÍTULO ANIMADO */}
          <AnimatedTitle
            lines={["CAFÉ QUE SE SIENTE,", "NO SOLO SE BEBE"]}
          />
          {/* TEXTO DESCRIPTIVO */}
         <p className="text-lg text-white/75 leading-7 ml-20 max-w-xl">
            Seleccionamos granos de origen, tostamos con precisión artesanal y
            creamos un espacio pensado para disfrutar cada momento con calma.
          </p>

          {/* CTA */}
          <div className="pt-4 ml-20 flex  gap-5">
            <button className="bg-coffee px-6 py-3 rounded-lg font-medium text-white hover:bg-opacity-90 transition">
              Ver menú
            </button>
            <button className="border border-white/30 px-6 py-3 rounded-lg text-white hover:bg-white hover:text-black transition">
              Reservar mesa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
