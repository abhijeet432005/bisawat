import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const clinics = [
  {
    id: 1,
    image: "/Clinic/clinic1.webp",
  },
  {
    id: 2,
    image: "/Clinic/clinic2.webp",
  },
  {
    id: 3,
    image: "/Clinic/clinic3.webp",
  },
  {
    id: 4,
    image: "/Clinic/clinic4.webp",
  },
  {
    id: 5,
    image: "/Clinic/clinic5.webp",
  },
  {
    id: 6,
    image: "/Clinic/clinic6.webp",
  },
  {
    id: 7,
    image: "/Clinic/clinic7.webp",
  },
  {
    id: 8,
    image: "/Clinic/clinic8.webp",
  },
  {
    id: 9,
    image: "/Clinic/clinic9.webp",
  },
  {
    id: 10,
    image: "/Clinic/clinic10.webp",
  },
];

const INITIAL_INDEX = 0;
const ENABLE_ACTIVE_SCALE = false;
const ACTIVE_SCALE = 1.08;
const PARALLAX_AMOUNT = 60;

const PinIcon = () => (
  <svg
    className="w-3 h-3 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

export default function FeaturedClinics() {
  const [active, setActive] = useState(INITIAL_INDEX);
  const [containerW, setContainerW] = useState(0);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const navRef = useRef(null);
  const splitRef = useRef(null);
  const outerRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);
  const dragStart = useRef(null);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);
  const activeRef = useRef(INITIAL_INDEX);
  const total = clinics.length;

  const isMobile = containerW > 0 && containerW < 640;
  const GAP = isMobile ? 17 : 20;
  const CARD_W =
    containerW > 0 ? (isMobile ? containerW * 0.85 : containerW * 0.48) : 0;
  const CARD_H = isMobile ? 300 : 450;

  // scroll reveal
  useGSAP(() => {
    splitRef.current = new SplitText(headingRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.set(splitRef.current.lines, { y: "105%" });
    gsap.set(navRef.current, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(splitRef.current.lines, {
            y: "0%",
            duration: 1,
            stagger: 0.1,
          })
          .to(
            navRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.3",
          );
      },
    });

    return () => splitRef.current?.revert();
  }, []);

  const getTranslateX = useCallback(
    (targetIndex) => {
      if (!containerW || !CARD_W) return 0;
      const cardCenter = targetIndex * (CARD_W + GAP) + CARD_W / 2;
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
        : gsap.to(trackRef.current, { x, duration: 1.1, ease: "power4.out" });

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const isAct = i === index;
        const props = {
          scale: isAct && ENABLE_ACTIVE_SCALE ? ACTIVE_SCALE : 1,
          filter: "brightness(1)",
          duration: instant ? 0 : 1.1,
          ease: "power4.out",
        };
        instant ? gsap.set(el, props) : gsap.to(el, props);
      });

      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        const offset =
          i === index ? 0 : i < index ? PARALLAX_AMOUNT : -PARALLAX_AMOUNT;
        const props = {
          x: offset,
          duration: instant ? 0 : 1.6,
          ease: "power4.out",
          delay: instant ? 0 : 0.08,
        };
        instant ? gsap.set(img, props) : gsap.to(img, props);
      });
    },
    [containerW, CARD_W, getTranslateX],
  );

  const goTo = useCallback(
    (index) => {
      const normalised = ((index % total) + total) % total;
      activeRef.current = normalised;
      setActive(normalised);
      animateTo(normalised);
    },
    [total, animateTo],
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

  const onDragStart = useCallback((clientX) => {
    isDragging.current = false;
    dragStart.current = clientX;
    gsap.killTweensOf(trackRef.current);
  }, []);

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
    <section ref={sectionRef} className="w-full py-20 relative">
      <div className="px-6 md:px-12 mb-10">
        <h2
          ref={headingRef}
          className="text-[#1a3a2a] text-3xl md:text-[44px] leading-tight"
        >
          Featured Smile{" "}
          <span className="text-[#1a3a2a] font-[italic-font]">
            Care Treatments
          </span>
        </h2>
      </div>

      <div ref={outerRef} className="w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ touchAction: "none", cursor: "grab", userSelect: "none" }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => {
            if (dragStart.current !== null) onDragMove(e.clientX);
          }}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={(e) => {
            if (dragStart.current !== null) onDragEnd(e.clientX);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            onDragStart(e.touches[0].clientX);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            onDragMove(e.touches[0].clientX);
          }}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          <div
            ref={trackRef}
            className="flex items-center"
            style={{
              gap: `${GAP}px`,
              willChange: "transform",
              paddingTop: "28px",
              paddingBottom: "28px",
            }}
          >
            {clinics.map((clinic, i) => (
              <div
                key={clinic.id}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => {
                  if (!isDragging.current) goTo(i);
                }}
                className="flex-shrink-0 relative rounded-2xl overflow-hidden"
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  cursor: i === active ? "grab" : "pointer",
                  zIndex: i === active ? 2 : 1,
                  willChange: "transform, filter",
                }}
              >
                <img
                  ref={(el) => (imgRefs.current[i] = el)}
                  src={clinic.image}
                  alt={`Birawat Dental Studio clinic ${clinic.id}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{
                    pointerEvents: "none",
                    willChange: "transform",
                    scale: 1.15,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-5 gap-3">
                  <div className="text-white min-w-0">
                    <p className="font-semibold text-sm md:text-base leading-snug truncate flex gap-2 items-center">
                      <PinIcon />
                      <span>Mumbai</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={navRef} className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => goTo(active - 1)}
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white bg-[var(--btn-color)]"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="bg-[#f5f5f5] text-gray-900 text-sm font-medium rounded-full px-8 py-3 hover:bg-white/90 transition-colors active:scale-95">
          Find your clinic
        </button>
        <button
          onClick={() => goTo(active + 1)}
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white bg-[var(--btn-color)]"
        >
          <svg
            className="w-4 h-4"
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
}
