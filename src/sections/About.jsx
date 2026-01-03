import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../components/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const clipRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const image = imageRef.current;
    const clip = clipRef.current;

    if (!image || !clip) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const rect = image.getBoundingClientRect();

    const scaleX = vw / rect.width;
    const scaleY = vh / rect.height;
    const scale = Math.max(scaleX, scaleY);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: clip,
          start: "center center",
          end: "+=800",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      })
      .to(image, {
        scale,
        borderRadius: 0,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <section
      id="nosotros"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 pt-24 text-center">
        <h2 className="tracking-widest text-white/70 lg:text-[50px] uppercase">
          Sobre Nosotros
        </h2>
        <AnimatedTitle
          title={["SOBRE NOSOTROS"]}
          containerClass="mix-blend-difference"
        />
        <p className="max-w-4xl text-xl leading-relaxed text-cream">
          Creemos en el café bien hecho y en la comida que se disfruta sin
          apuro. Trabajamos con granos de especialidad y productos
          seleccionados, cuidando cada detalle del proceso: desde el origen
          hasta la mesa. Nuestro espacio combina café, cocina y ambiente para
          crear un lugar donde quedarse, compartir y volver. Todo lo que
          servimos tiene una intención clara: calidad real, sabor honesto y una
          experiencia que se siente cercana.
        </p>
      </div>
      <div
        ref={clipRef}
        id="clip"
        className="relative mt-24 h-dvh w-full overflow-hidden"
      >
        <div ref={imageRef} className="mask-clip-path about-image mx-auto">
          <img
            src="images/gallery-4.jpg"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
