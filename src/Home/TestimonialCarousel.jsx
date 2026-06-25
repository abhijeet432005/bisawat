import {
  useRef, useState, useEffect, useLayoutEffect, useCallback,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cards } from "../data/testimonialCards";

const INITIAL_INDEX = 1;
const PARALLAX_AMOUNT = 60;

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

export default function TestimonialCarousel() {
  const [active, setActive]         = useState(INITIAL_INDEX);
  const [containerW, setContainerW] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);

  const sectionRef   = useRef(null);
  const outerRef      = useRef(null);
  const containerRef    = useRef(null);
  const trackRef          = useRef(null);
  const cardRefs             = useRef([]);
  const videoRefs               = useRef([]);
  const dragStart                  = useRef(null);
  const dragOffset                    = useRef(0);
  const isDragging                       = useRef(false);
  const activeRef                           = useRef(INITIAL_INDEX);
  const total                                  = cards.length;

  const isMobile = containerW > 0 && containerW < 640;
  const GAP    = isMobile ? 17 : 24;
  const CARD_W = containerW > 0 ? (isMobile ? containerW * 0.7 : 280) : 0;
  const CARD_H = isMobile ? 360 : 380;

  const getTranslateX = useCallback((targetIndex) => {
    if (!containerW || !CARD_W) return 0;
    const cardCenter = targetIndex * (CARD_W + GAP) + CARD_W / 2;
    return containerW / 2 - cardCenter;
  }, [containerW, CARD_W, GAP]);

  const animateTo = useCallback((index, instant = false) => {
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
        scale: isAct ? 1 : 0.88,
        opacity: isAct ? 1 : 0.55,
        duration: instant ? 0 : 1.1,
        ease: "power4.out",
      };
      instant ? gsap.set(el, props) : gsap.to(el, props);
    });

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      const offset = i === index ? 0 : i < index ? PARALLAX_AMOUNT : -PARALLAX_AMOUNT;
      const props = {
        x: offset,
        duration: instant ? 0 : 1.6,
        ease: "power4.out",
        delay: instant ? 0 : 0.08,
      };
      instant ? gsap.set(vid, props) : gsap.to(vid, props);

      // pause any video that's no longer active
      if (i !== index && !vid.paused) {
        vid.pause();
        setPlayingIndex(null);
      }
    });
  }, [containerW, CARD_W, getTranslateX]);

  const goTo = useCallback((index) => {
    const normalised = ((index % total) + total) % total;
    activeRef.current = normalised;
    setActive(normalised);
    animateTo(normalised);
  }, [total, animateTo]);

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

  const togglePlay = useCallback((i, e) => {
    e.stopPropagation();
    const video = videoRefs.current[i];
    if (!video) return;

    if (playingIndex === i) {
      video.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex].pause();
      }
      video.play();
      setPlayingIndex(i);
    }
  }, [playingIndex]);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 relative" style={{ background: "#faf8f4" }}>

      <div className="px-6 md:px-12 mb-10 text-center">
        <p className="text-xs sm:text-sm text-gray-500 tracking-wide mb-3">[ Patient Voices ]</p>
        <h2 className="text-3xl md:text-5xl text-[#1a1a1a] leading-tight">
          Real stories,{" "}
          <span className="font-normal" style={{ fontStyle: "italic" }}>real smiles</span>
        </h2>
      </div>

      <div ref={outerRef} className="w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ touchAction: "none", cursor: "grab", userSelect: "none" }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => { if (dragStart.current !== null) onDragMove(e.clientX); }}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={(e) => { if (dragStart.current !== null) onDragEnd(e.clientX); }}
          onTouchStart={(e) => { onDragStart(e.touches[0].clientX); }}
          onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          <div
            ref={trackRef}
            className="flex items-center"
            style={{ gap: `${GAP}px`, willChange: "transform", paddingTop: "28px", paddingBottom: "28px" }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => { if (!isDragging.current) goTo(i); }}
                className="flex-shrink-0 relative rounded-2xl overflow-hidden"
                style={{
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  cursor: i === active ? "default" : "pointer",
                  zIndex: i === active ? 2 : 1,
                  willChange: "transform",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={card.src}
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  preload="metadata"
                  draggable={false}
                  onEnded={() => setPlayingIndex((p) => (p === i ? null : p))}
                  style={{ pointerEvents: "none", willChange: "transform" }}
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }}
                />

                {/* name + avatar top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/80 flex-shrink-0">
                    <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-white text-sm font-medium drop-shadow-sm">{card.name}</span>
                </div>

                {/* play/pause bottom-left — only active card is interactive */}
                {i === active && (
                  <button
                    onClick={(e) => togglePlay(i, e)}
                    className="absolute bottom-4 left-4 w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-90"
                    style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
                    aria-label={playingIndex === i ? "Pause video" : "Play video"}
                  >
                    {playingIndex === i ? <PauseIcon /> : <PlayIcon />}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => goTo(active - 1)}
          className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-[#1a1a1a] hover:bg-gray-100 transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? "20px" : "8px",
                height: "8px",
                background: i === active ? "#1a1a1a" : "#d1d1d1",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(active + 1)}
          className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-[#1a1a1a] hover:bg-gray-100 transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

    </section>
  );
}