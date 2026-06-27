import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cards } from "../constants/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const vdRef = useRef([]);
  vdRef.current = [];

  const modalRef = useRef(null);
  const modalVideoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useGSAP(
    () => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTl.from("[data-card]", {
        yPercent: 180,
        xPercent: 100,
        stagger: 0.2,
        ease: "power1.inOut",
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  const lockScroll = () => (document.body.style.overflow = "hidden");
  const unlockScroll = () => (document.body.style.overflow = "");

  const openModal = useCallback((src, index) => {
    setActiveVideo(src);
    setActiveIndex(index);
    lockScroll();
  }, []);

  const onModalMount = useCallback((node) => {
    if (!node) return;
    modalRef.current = node;
    gsap.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.4 });
  }, []);

  const onModalVideoMount = useCallback((node) => {
    if (!node) return;
    gsap.fromTo(
      node,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }, []);

  const closeModal = useCallback(() => {
    const node = modalRef.current;
    if (!node) {
      setActiveVideo(null);
      setActiveIndex(null);
      unlockScroll();
      return;
    }
    gsap.to(node, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveVideo(null);
        setActiveIndex(null);
        unlockScroll();
      },
    });
  }, []);

  const goTo = useCallback((index) => {
    const target = cards[index];
    if (!target) return;
    setActiveVideo(target.src);
    setActiveIndex(index);
    if (modalVideoRef.current) {
      gsap.fromTo(
        modalVideoRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
      );
    }
  }, []);

  const handlePlay = useCallback((index) => {
    const video = vdRef.current[index];
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const handlePause = useCallback((index) => {
    const video = vdRef.current[index];
    if (!video) return;
    video.pause();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="testimonials-section relative w-full h-[110dvh] lg:h-[100dvh]"
    >
      {/* ── Static centered heading — no animation ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          style={{ fontSize: "30px", lineHeight: "1.3" }}
          className="text-center font-bold uppercase tracking-wide text-black"
        >
          Patient <span className="text-[#E3A458]">Stories</span>
        </h1>
      </div>

      {/* ── Outer cards — only 7 visible (slice first 7) ── */}
      <div className="pin-box flex items-center justify-center w-full ps-52 absolute 2xl:bottom-32 bottom-[60vh] md:bottom-[50vh]">
        {cards.slice(0, 7).map((card, index) => (
          <div
            key={index}
            data-card
            className={`vd-card w-80 h-[50vh] md:w-85 md:h-[70vh] flex-none md:rounded-[2vw] rounded-3xl -ms-44 overflow-hidden 2xl:relative absolute border-[.5vw] border-[#f5f5f5] ${card.translation} ${card.rotation} ${card.position}`}
            style={{
              zIndex: hoveredIndex === index ? 50 : 1,
              transition: "z-index 0s",
            }}
            onMouseEnter={() => {
              setHoveredIndex(index);
              handlePlay(index);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              handlePause(index);
            }}
            onClick={() => openModal(card.src, index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />

            {/* ── Play icon — visible on hover ── */}
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1.5 pointer-events-none"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            >
              <div
                className="bg-white/90 rounded-full flex items-center justify-center"
                style={{ width: 32, height: 32 }}
              >
                {/* Triangle play icon */}
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L11 7L1 13V1Z"
                    fill="#1a1a1a"
                    stroke="#1a1a1a"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                className="text-white text-xs font-semibold drop-shadow"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
              >
                Play
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal rendered via PORTAL — escapes pinned section's stacking context ── */}
      {activeVideo &&
        createPortal(
          <div
            ref={onModalMount}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm w-full h-screen flex flex-col items-center justify-center gap-5"
            style={{ zIndex: 99999 }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="fixed top-6 right-8 text-white text-4xl cursor-pointer hover:opacity-70 transition-opacity"
              style={{ zIndex: 100000 }}
            >
              ✕
            </button>

            {/* ── Video — 80vh, width auto ── */}
            <div
              ref={onModalVideoMount}
              className="flex items-center justify-center"
              style={{ height: "80vh" }}
            >
              <video
                key={activeVideo}
                ref={modalVideoRef}
                src={activeVideo}
                controls
                autoPlay
                style={{
                  height: "80vh",
                  width: "auto",
                  maxWidth: "90vw",
                  borderRadius: "12px",
                }}
              />
            </div>

            {/* ── Carousel strip — all n cards visible ── */}
            <div
              className="flex items-center gap-3 overflow-x-auto px-6 pb-2"
              style={{
                maxWidth: "90vw",
                scrollbarWidth: "thin",
                scrollbarColor: "#E3A458 transparent",
              }}
            >
              {cards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  style={{
                    flexShrink: 0,
                    width: 72,
                    height: 90,
                    borderRadius: 10,
                    overflow: "hidden",
                    border:
                      activeIndex === idx
                        ? "2.5px solid #E3A458"
                        : "2px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "border-color 0.2s",
                    background: "transparent",
                    padding: 0,
                  }}
                  aria-label={`Go to video ${idx + 1}`}
                >
                  <video
                    src={card.src}
                    muted
                    playsInline
                    preload="none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Active indicator overlay */}
                  {activeIndex === idx && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(227,164,88,0.18)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default Testimonial;
