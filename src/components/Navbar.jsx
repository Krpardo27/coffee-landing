import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HiChevronDown as ChevronDownIcon } from "react-icons/hi";
import { useWindowScroll } from "react-use";
import Button from "./Button";
import MenuModal from "./MenuModal";

const navItems = ["Nosotros", "Café", "Contacto"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const audioRef = useRef(null);

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

    let shouldBeVisible = true;

    if (currentScrollY > lastScrollY.current && currentScrollY > 0) {
      shouldBeVisible = false;
    }

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };
  return (
    <>
      <div
        ref={navRef}
        className={`
        fixed top-4 inset-x-6 z-50
        h-16
        transition-colors duration-300
        ${
          currentScrollY > 0
            ? "floating-nav backdrop-blur-md bg-red-600"
            : "bg-transparent"
        }
      `}
      >
        <nav className="flex h-full items-center justify-between px-6">
          {/* LOGO */}
          <div className="flex items-center gap-6">
            <img
              src="/images/logo.svg"
              alt="Cafetería"
              className="h-8 w-auto object-contain"
            />

            {/* Botón carta (desktop) */}
            <Button
              title="Carta"
              rightIcon={<ChevronDownIcon />}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>

          <div className="flex items-center gap-8">
            {/* Links desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="
                  nav-hover-btn
                  text-sm uppercase tracking-widest
                  text-coffee-100 hover:text-white
                "
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio toggle */}
            <button
              onClick={toggleAudio}
              aria-label="Ambiente sonoro"
              className="flex items-center gap-1"
            >
              <audio
                ref={audioRef}
                src="/audio/loop.mp3"
                loop
                className="hidden"
              />

              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={`
                  indicator-line
                  ${isAudioPlaying ? "active" : ""}
                `}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </div>
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
