import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HiChevronDown as ChevronDownIcon } from "react-icons/hi";
import { useWindowScroll } from "react-use";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Button from "./Button";
import MenuModal from "./MenuModal";
import { useAmbientAudio } from "../hooks/useAmbientAudio";

const navItems = ["Nosotros", "Café", "Contacto"];

const Navbar = () => {
  const { audioRef, isPlaying, levels, toggle } = useAmbientAudio({
    maxVolume: 0.35,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const isNavVisible = useRef(true);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (!navRef.current) return;

    if (menuOpen) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
      isNavVisible.current = true;
      lastScrollY.current = currentScrollY;
      return;
    }

    const shouldBeVisible = !(
      currentScrollY > lastScrollY.current && currentScrollY > 0
    );

    if (shouldBeVisible !== isNavVisible.current) {
      isNavVisible.current = shouldBeVisible;
      gsap.to(navRef.current, {
        y: shouldBeVisible ? 0 : -90,
        opacity: shouldBeVisible ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    }

    lastScrollY.current = currentScrollY;
  }, [currentScrollY, menuOpen]);

  return (
    <>
      <div
        ref={navRef}
        className={`
          fixed top-10 inset-x-6 z-50
          h-20 max-w-7xl mx-auto rounded-xl
          transition-colors duration-300
          ${currentScrollY > 0 ? "bg-black/75 backdrop-blur-md" : "bg-transparent"}
        `}
      >
        <nav className="flex h-full items-center justify-between px-6">
          {/* LOGO + CARTA */}
          <div className="flex items-center gap-6">
            <img
              src="logo.png"
              alt="Cafetería"
              className="object-cover w-26 h-26"
            />

            <Button
              title="Carta"
              rightIcon={<ChevronDownIcon />}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>

          {/* LINKS + AUDIO */}
          <div className="flex items-center gap-8">
            {/* Links desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="
                    group relative px-3 py-1 rounded-md
                    text-sm uppercase tracking-widest
                    text-white/90 hover:text-white
                    transition-all duration-300
                  "
                >
                  {item}

                  <span
                    className="
                      pointer-events-none
                      absolute left-1/2 -bottom-1
                      h-[1.5px] w-0
                      bg-white/90
                      transition-all duration-300 ease-out
                      group-hover:left-0
                      group-hover:w-full
                    "
                  />
                </a>
              ))}
            </div>

            {/* Audio toggle */}
            <button
              onClick={toggle}
              aria-label="Ambiente sonoro"
              className="
                flex items-center gap-2
                px-3 py-2 rounded-md
                bg-black/20 backdrop-blur-sm
                text-white/90 hover:text-white
                transition
              "
            >
              <audio ref={audioRef} src="/audio/loop.mp3" loop preload="none" />

              <span className="text-lg">
                {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
              </span>

              <div className="flex items-end gap-[3px] h-5">
                {levels.map((lvl, i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-white transition-all"
                    style={{
                      height: `${6 + lvl * 14}px`,
                      opacity: isPlaying ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </nav>
      </div>

      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
