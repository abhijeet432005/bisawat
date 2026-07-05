import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router";

const services = [
  {
    index: "01",
    title: ["Preventive", "Care"],
    image:
      "/services/preventive-dentistry-patient.webp",
    includes: [
      "Routine checkups & cleanings",
      "Digital X-rays",
      "Fluoride treatments",
      "Gum disease screening",
    ],
    description:
      "Protect your oral health with regular dental checkups, professional cleanings, digital imaging, and preventive treatments that help detect and stop problems before they develop.",
  },
  {
    index: "02",
    title: ["Restorative", "Dentistry"],
    image:
      "/services/restorative.webp",
    includes: [
      "Tooth-colored fillings",
      "Crowns & bridges",
      "Dental implants",
      "Root canal treatment",
      "Dentures",
    ],
    description:
      "Restore the function, strength, and appearance of damaged or missing teeth with advanced restorative treatments designed for long-lasting results.",
  },
  {
    index: "03",
    title: ["Esthetic", "Dentistry"],
    image:
      "/services/Esthetic.webp",
    includes: [
      "Professional teeth whitening",
      "Porcelain veneers",
      "Smile makeover",
      "Tooth bonding",
      "Clear aligners",
    ],
    description:
      "Enhance your smile with modern cosmetic dentistry solutions that improve tooth color, shape, alignment, and overall confidence.",
  },
  {
    index: "04",
    title: ["Beyond the", "Smile"],
    image:
      "/services/3.jpeg",
    includes: [
      "Sleep apnea devices",
      "TMJ & jaw pain treatment",
      "Sedation dentistry",
    ],
    description:
      "Comprehensive dental care that goes beyond teeth, offering solutions for sleep disorders, jaw pain, and anxiety-free treatment through safe sedation options.",
  },
];

const total = services.length;

const ServicesCarousel = () => {
  const [active, setActive] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const navigate = useNavigate()

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const activeRef = useRef(0);
  const animating = useRef(false);
  const dragStart = useRef(null);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  const isMobile = containerW > 0 && containerW < 640;
  const isTablet = containerW >= 640 && containerW < 1024;

  const GAP = isMobile ? 12 : 40;

  const CARD_W =
    containerW > 0
      ? isMobile
        ? containerW * 0.92
        : isTablet
          ? containerW * 0.7
          : containerW * 0.6
      : 0;

  const getTranslateX = useCallback(
    (index) => {
      if (!containerW || !CARD_W) return 0;
      const cardCenter = index * (CARD_W + GAP) + CARD_W / 2;
      return containerW / 2 - cardCenter;
    },
    [containerW, CARD_W, GAP],
  );

  const animateTo = useCallback(
    (index, instant = false) => {
      if (!containerW || !CARD_W) return;
      const x = getTranslateX(index);
      dragOffset.current = x;

      instant
        ? gsap.set(trackRef.current, { x })
        : gsap.to(trackRef.current, { x, duration: 0.7, ease: "power3.out" });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isActive = i === index;
        const props = {
          scale: isActive ? 1 : 1,
          opacity: isActive ? 1 : 0.85,
          filter: isActive ? "blur(0px)" : "blur(1px)",
          duration: instant ? 0 : 0.7,
          ease: "power3.out",
        };
        instant ? gsap.set(card, props) : gsap.to(card, props);
      });
    },
    [containerW, CARD_W, getTranslateX],
  );

  const goTo = useCallback(
    (targetIndex) => {
      if (animating.current) return;
      const normalised = ((targetIndex % total) + total) % total;
      if (normalised === activeRef.current) return;

      animating.current = true;
      activeRef.current = normalised;
      setActive(normalised);
      animateTo(normalised);

      gsap.delayedCall(0.7, () => {
        animating.current = false;
      });
    },
    [animateTo],
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setContainerW(entries[0].contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!containerW) return;
    animateTo(activeRef.current, true);
  }, [containerW, animateTo]);

  const prev = () => goTo(activeRef.current - 1);
  const next = () => goTo(activeRef.current + 1);

  const onDragStart = useCallback(
    (clientX) => {
      if (!isMobile && !isTablet) return;
      isDragging.current = false;
      dragStart.current = clientX;
      gsap.killTweensOf(trackRef.current);
    },
    [isMobile, isTablet],
  );

  const onDragMove = useCallback((clientX) => {
    if (dragStart.current === null) return;
    const delta = clientX - dragStart.current;
    if (Math.abs(delta) > 4) isDragging.current = true;
    gsap.set(trackRef.current, { x: dragOffset.current + delta });
  }, []);

  const onDragEnd = useCallback(
    (clientX) => {
      if (dragStart.current === null) return;
      const delta = clientX - dragStart.current;
      dragStart.current = null;
      if (Math.abs(delta) > 50) {
        goTo(delta < 0 ? activeRef.current + 1 : activeRef.current - 1);
      } else {
        animateTo(activeRef.current);
      }
      setTimeout(() => {
        isDragging.current = false;
      }, 0);
    },
    [goTo, animateTo],
  );

  return (
    <section className="w-full my-10 mt-5 overflow-hidden">
      <div ref={containerRef} className="relative w-full px-4 sm:px-6 md:px-0">
        <div
          ref={trackRef}
          className="flex items-center"
          style={{
            gap: `${GAP}px`,
            willChange: "transform",
            touchAction: isMobile || isTablet ? "none" : "auto",
            cursor: isMobile || isTablet ? "grab" : "default",
            userSelect: "none",
          }}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => {
            if (dragStart.current !== null) {
              e.preventDefault();
              onDragMove(e.touches[0].clientX);
            }
          }}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => {
            if (isMobile || isTablet) onDragStart(e.clientX);
          }}
          onMouseMove={(e) => {
            if (dragStart.current !== null) onDragMove(e.clientX);
          }}
          onMouseUp={(e) => {
            if (dragStart.current !== null) onDragEnd(e.clientX);
          }}
          onMouseLeave={(e) => {
            if (dragStart.current !== null) onDragEnd(e.clientX);
          }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="flex-shrink-0"
              style={{
                width: CARD_W ? `${CARD_W}px` : "92%",
                willChange: "transform, opacity, filter",
              }}
            >
              <div
                className="w-full rounded-4xl bg-[#f7f7f7]"
                style={{ padding: "clamp(1.25rem, 2vw, 1rem)" }}
              >
                <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-8 lg:gap-12">
                  <div className="w-full md:flex-1 min-w-0 flex flex-col justify-between md:pt-2">
                    <div className="flex-shrink-0">
                      <p className="text-xs sm:text-sm text-gray-500 tracking-wide whitespace-nowrap">
                        [ {s.index} / 0{total} ]
                      </p>
                    </div>

                    <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl text-[#1a1a1a] leading-tight mb-4 sm:mb-5 md:mb-7 break-words">
                      {s.title[0]} {s.title[1]}
                    </h2>

                    <div className="">
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5 sm:mb-6 md:mb-8 max-w-sm">
                        {s.description}
                      </p>
                      <button
                        className="w-fit px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-transform active:scale-95 whitespace-nowrap"
                        style={{ background: "var(--btn-color)" }}
                        onClick={() => navigate("/contact")}
                      >
                        Get Started Now
                      </button>
                    </div>
                  </div>

                  <div className="w-full md:w-[42%] min-w-0 flex-shrink-0">
                    <div
                      className="w-full rounded-2xl  overflow-hidden"
                      style={{ aspectRatio: isMobile ? "16/10" : "4/4" }}
                    >
                      <img
                        src={s.image}
                        alt={s.title.join(" ")}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <button
          onClick={prev}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gray-300 flex items-center justify-center text-[#1a1a1a] hover:bg-gray-100 transition-colors active:scale-95 flex-shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all flex-shrink-0"
              style={{
                width: i === active ? "18px" : "7px",
                height: "7px",
                background: i === active ? "#1a1a1a" : "#d1d1d1",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gray-300 flex items-center justify-center text-[#1a1a1a] hover:bg-gray-100 transition-colors active:scale-95 flex-shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ServicesCarousel;
