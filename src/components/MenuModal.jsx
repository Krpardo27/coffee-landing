import { useEffect, useRef } from "react";
import gsap from "gsap";
import { menuData } from "../data/data";

const MenuModal = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!open) return;

    // ENTRADA
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );

    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.96, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      }
    );
  }, [open]);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    gsap.to([modalRef.current, overlayRef.current], {
      opacity: 0,
      scale: 0.96,
      y: 12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        closingRef.current = false;
        onClose();
      },
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 grid place-items-center">
      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        ref={modalRef}
        className="
          relative z-10
          w-[92vw] max-w-3xl
          max-h-[85vh]
          bg-gradient-to-b from-[#0f0f0f] to-[#151515]
          text-cream
          rounded-2xl
          shadow-2xl
          border border-white/10
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-6 sm:px-10 py-6 border-b border-white/10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
            Nuestra carta
          </p>
          <h2 className="text-2xl font-serif">Café & Preparaciones</h2>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
          <div className="space-y-14">
            {menuData.map((section) => (
              <section key={section.id}>
                {/* TÍTULO SECCIÓN */}
                <h3 className="mb-6 text-xl font-serif border-b border-white/10 pb-2">
                  {section.title}
                </h3>

                {/* ITEMS */}
                <div className="space-y-5">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="
                grid grid-cols-3
                items-center gap-4
              "
                    >
                      {/* Imagen */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-32 w-32 rounded-md object-cover"
                          loading="lazy"
                        />
                      )}

                      {/* Texto */}
                      <div>
                        <p className="font-medium text-cream">{item.name}</p>
                        <p className="text-sm text-white/50 leading-snug">
                          {item.description}
                        </p>
                      </div>

                      {/* Precio */}
                      <span className="text-sm font-medium text-white/70 tabular-nums whitespace-nowrap">
                        ${item.price.toLocaleString("es-CL")}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
