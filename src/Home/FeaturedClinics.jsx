import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";

const clinics = [
  {
    id: 1,
    name: "Medart Hair Clinic",
    location: "Turkey",
    price: "From $1,500 – $3,750",
    image: "https://cdn.prod.website-files.com/6941011e592dac3331ac7edc/694ff20c591fbab7ba17de1f_Rectangle%20(5)-p-500.webp",
  },
  {
    id: 2,
    name: "Vera Clinic",
    location: "Istanbul, Turkey",
    price: "From $2,000 – $4,500",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80",
  },
  {
    id: 3,
    name: "Crown Restoration",
    location: "Greece",
    price: "From $1,800 – $4,000",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80",
  },
  {
    id: 4,
    name: "Elite Hair Center",
    location: "Spain",
    price: "From $2,200 – $5,000",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80",
  },
];


const INITIAL_INDEX = 1;
const ACTIVE_SCALE = 1.08;

const PinIcon = () => (
  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
  </svg>
);

export default function FeaturedClinics() {
  const [active, setActive] = useState(INITIAL_INDEX);
  const [containerW, setContainerW] = useState(0);
  const outerRef    = useRef(null); // overflow-hidden lives here
  const containerRef = useRef(null); // ResizeObserver measures this
  const trackRef    = useRef(null);
  const cardRefs    = useRef([]);
  const dragStart   = useRef(null);
  const dragOffset  = useRef(0);
  const isDragging  = useRef(false);
  const activeRef   = useRef(INITIAL_INDEX);
  const total       = clinics.length;

  const isMobile = containerW > 0 && containerW < 640;
  const GAP = isMobile ? 30 : 40;
  const CARD_W = containerW > 0 ? (isMobile ? containerW * 0.78 : containerW * 0.38) : 0;
  const CARD_H = isMobile ? 300 : 400;

  const getTranslateX = useCallback((targetIndex) => {
    if (!containerW || !CARD_W) return 0;
    const cardCenter = targetIndex * (CARD_W + GAP) + CARD_W / 2;
    return containerW / 2 - cardCenter;
  }, [containerW, CARD_W]);

  const animateTo = useCallback((index, instant = false) => {
    if (!containerW || !CARD_W) return;
    const x = getTranslateX(index);
    dragOffset.current = x;

    if (instant) {
      gsap.set(trackRef.current, { x });
    } else {
      gsap.to(trackRef.current, { x, duration: 0.5, ease: "power3.out" });
    }

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const isAct = i === index;
      const props = {
        scale: isAct ? ACTIVE_SCALE : 1,
        filter: isAct ? "brightness(0.8)" : "brightness(0.5)",
        duration: 0.5,
        ease: "power3.out",
      };
      instant ? gsap.set(el, props) : gsap.to(el, props);
    });
  }, [containerW, CARD_W, getTranslateX]);

  const goTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, total - 1));
    activeRef.current = clamped;
    setActive(clamped);
    animateTo(clamped);
  }, [total, animateTo]);

  // ResizeObserver on containerRef (no overflow-hidden, so width is accurate)
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

  const onDragEnd = useCallback((clientX) => {
    if (dragStart.current === null) return;
    const delta = clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 50) {
      goTo(delta < 0 ? activeRef.current + 1 : activeRef.current - 1);
    } else {
      animateTo(activeRef.current);
    }
    setTimeout(() => { isDragging.current = false; }, 0);
  }, [goTo, animateTo]);

  return (
    <section className="w-full py-12 md:py-16" style={{ backgroundColor: "#2a7d72" }}>

      {/* Heading */}
      <div className="px-6 md:px-12 mb-10">
        <h2 className="text-white font-semibold text-3xl md:text-[44px] leading-tight">
          Featured Hair
        </h2>
        <h2
          className="font-semibold text-3xl md:text-[44px] leading-tight"
          style={{ color: "#b8e04a", fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          Transplant Clinics
        </h2>
      </div>

      {/* overflow-hidden wrapper — separate from measured container */}
      <div ref={outerRef} className="w-full overflow-hidden">

        {/* measured container — no overflow-hidden so ResizeObserver gets true width */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ touchAction: "none", cursor: "grab", userSelect: "none" }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => { if (dragStart.current !== null) onDragMove(e.clientX); }}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={(e) => { if (dragStart.current !== null) onDragEnd(e.clientX); }}
          onTouchStart={(e) => { e.preventDefault(); onDragStart(e.touches[0].clientX); }}
          onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {/* track */}
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
                onClick={() => { if (!isDragging.current) goTo(i); }}
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
                  src={clinic.image}
                  alt={clinic.name}
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: "none" }}
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)",
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-5 gap-3">
                  <div className="text-white min-w-0">
                    <div className="flex items-center gap-1 text-white/75 text-xs mb-1.5">
                      <PinIcon />
                      <span>{clinic.location}</span>
                    </div>
                    <p className="font-semibold text-sm md:text-base leading-snug truncate">
                      {clinic.name}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">{clinic.price}</p>
                  </div>

                  {i === active && (
                    <button
                      className="flex-shrink-0 bg-white text-gray-900 text-xs md:text-sm font-medium rounded-full px-4 py-2.5 hover:bg-white/90 transition-colors active:scale-95"
                      onClick={(e) => e.stopPropagation()}
                    >
                      See details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button className="bg-white text-gray-900 text-sm font-medium rounded-full px-8 py-3 hover:bg-white/90 transition-colors active:scale-95">
          Find your clinic
        </button>

        <button
          onClick={() => goTo(active + 1)}
          disabled={active === total - 1}
          className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}