import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const services = [
  {
    index: "01",
    title: ["Gynecological", "Care"],
    image:
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80",
    includes: [
      "Annual check-ups",
      "Hormonal balance evaluation",
      "Pelvic exams & screenings",
    ],
    description:
      "Routine exams, hormonal assessments, and preventive screenings designed to support reproductive health at every life stage.",
  },
  {
    index: "02",
    title: ["Family Planning &", "Fertility"],
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    includes: [
      "Contraception counseling",
      "Fertility planning",
      "Pre-pregnancy assessments",
    ],
    description:
      "Personalized guidance to help individuals and couples plan pregnancies with confidence and informed medical support.",
  },
  {
    index: "03",
    title: ["Cosmetic", "Treatments"],
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80",
    includes: ["Teeth whitening", "Veneers consultation", "Smile makeovers"],
    description:
      "Modern aesthetic treatments designed to enhance your natural smile with safe, proven techniques and lasting results.",
  },
];

const total = services.length;

const ServicesCarousel = () => {
  const [active, setActive] = useState(0);
  const [containerW, setContainerW] = useState(0);

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

  const GAP = isMobile ? 12 : 0;

  const CARD_W =
    containerW > 0
      ? isMobile
        ? containerW * 0.92
        : isTablet
          ? containerW * 0.85
          : containerW * 0.78
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
          scale: isActive ? 1 : 0.85,
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
    <section
      className="w-full my-10 mt-25 overflow-hidden"
      style={{ background: "#faf8f4" }}
    >
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
                className="w-full rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2.5rem] bg-white"
                style={{ padding: "clamp(1.25rem, 3.5vw, 2.5rem)" }}
              >
                {/* ── 3-column flex layout, matches reference exactly ── */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
                  {/* COLUMN 1 — index number, slim */}
                  <div className="flex-shrink-0 md:w-auto">
                    <p className="text-xs sm:text-sm text-gray-500 tracking-wide whitespace-nowrap">
                      [ {s.index} / 0{total} ]
                    </p>
                  </div>

                  {/* COLUMN 2 — title + image, wide */}
                  <div className="w-full md:w-[42%] min-w-0 flex-shrink-0">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] leading-tight mb-4 sm:mb-5 md:mb-7 break-words">
                      {s.title[0]}
                      <br />
                      {s.title[1]}
                    </h2>
                    <div
                      className="w-full rounded-xl sm:rounded-2xl overflow-hidden"
                      style={{ aspectRatio: isMobile ? "16/10" : "4/3" }}
                    >
                      <img
                        src={s.image}
                        alt={s.title.join(" ")}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* COLUMN 3 — includes + description + CTA */}
                  <div className="w-full md:flex-1 md:my-auto min-w-0 flex flex-col md:pt-2">
                    <p
                      className="text-sm font-medium mb-2.5 sm:mb-3 md:mb-4"
                      style={{ color: "#c08552" }}
                    >
                      Includes
                    </p>
                    <ul className="flex flex-col gap-1.5 md:gap-2 mb-8 sm:mb-10 md:mb-16">
                      {s.includes.map((item) => (
                        <li
                          key={item}
                          className="text-sm sm:text-base md:text-xl text-[#1a1a1a] break-words"
                        >
                          - {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5 sm:mb-6 md:mb-8 max-w-sm">
                      {s.description}
                    </p>
                    <button
                      className="w-fit px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#1a1a1a] transition-transform active:scale-95 whitespace-nowrap"
                      style={{ background: "#eaff5e" }}
                    >
                      Get Started Now
                    </button>
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
