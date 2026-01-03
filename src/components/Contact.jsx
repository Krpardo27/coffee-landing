import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} />
    </div>
  );
};

const Contact = () => {
  return (
    <div
      id="contacto"
      className="relative min-h-dvh w-full px-6 lg:px-10 flex items-center justify-center"
    >
      <div className="relative flex w-full max-w-8xl flex-col py-52 items-center justify-center rounded-lg bg-black overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center opacity-90">
          <div className="relative ml-10 flex flex-col gap-6">
            <ImageClipBox
              src="/images/gallery-4.jpg"
              clipClass="contact-clip-path-1 w-max object-cover lg:-translate-x-120 opacity-90"
            />
            {/* <ImageClipBox
              src="/images/gallery-2.jpg"
              clipClass="sword-man-clip-path size-full lg:translate-y-40 object-cover"
            /> */}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:flex items-center">
          <div className="relative flex flex-col gap-6">
            <ImageClipBox
              src="/images/cafe.webp"
              clipClass="contact-clip-path-2 size-full object-cover lg:translate-x-80"
            />
            {/* <ImageClipBox
              src="/images/gallery-4.jpg"
              clipClass="sword-man-clip-path w-96 h-[28rem] object-cover"
            /> */}
          </div>
        </div>

        {/* CONTENIDO CENTRAL */}
        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <p className="font-general text-xl uppercase tracking-widest text-white/70">
            Join Zentry
          </p>

          <AnimatedTitle
            title={["OUR STORY", "CONTINUES"]}
            sectionId="#contact"
            containerClass="mix-blend-difference"
          />

          <Button
            title={["Contáctanos"]}
            containerClass="mt-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
