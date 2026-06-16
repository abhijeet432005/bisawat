import { useCallback, useRef, useState } from "react";
import { cards } from "../constants/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const vdRef = useRef([]);
  vdRef.current = []; // ✅ reset every render

  const modalRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useGSAP(
    () => {
      // ✅ ONE timeline, ONE ScrollTrigger — eliminates two-trigger conflict
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",          // ✅ relative end
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // ✅
        },
      });

      // ✅ marquee titles run inside pin — no separate ScrollTrigger
      pinTl
        .to("[data-title='first']", { xPercent: 40 }, 0)
        .to("[data-title='sec']", { xPercent: 25 }, 0)
        .to("[data-title='third']", { xPercent: -20 }, 0)
        .from(
          "[data-card]",
          { yPercent: 180, xPercent: 100, stagger: 0.2, ease: "power1.inOut" },
          0.3,
        );

      // ✅ double rAF
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    },
    { scope: sectionRef, dependencies: [] }, // ✅ scoped
  );

  const lockScroll = () => (document.body.style.overflow = "hidden");
  const unlockScroll = () => (document.body.style.overflow = "");

  const openModal = useCallback((src) => {
    setActiveVideo(src);
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
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }, []);

  const closeModal = useCallback(() => {
    const node = modalRef.current;
    if (!node) { setActiveVideo(null); unlockScroll(); return; }
    gsap.to(node, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => { setActiveVideo(null); unlockScroll(); },
    });
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
    // ✅ no mt-10 — use spacer in Home if needed
    <section
      ref={sectionRef}
      className="testimonials-section relative w-full h-[110dvh] lg:h-[100dvh]"
    >
      {/* ✅ data attrs instead of class selectors — scoped, no bleed */}
      <div className="absolute size-full flex flex-col items-center pt-[2vw] uppercase text-[19vw] leading-[15vw] tracking-[-.4vw] ml-[2vw] font-bold">
        <h1 className="text-black" data-title="first">Real</h1>
        <h1 className="text-[#E3A458]" data-title="sec">Smiles</h1>
        <h1 className="text-black" data-title="third">Stories</h1>
      </div>

      <div className="pin-box flex items-center justify-center w-full ps-52 absolute 2xl:bottom-32 bottom-[50vh]">
        {cards.map((card, index) => (
          <div
            key={index}
            data-card // ✅ data attr instead of class selector
            className={`vd-card w-70 md:w-85 flex-none md:rounded-[2vw] rounded-3xl -ms-44 overflow-hidden 2xl:relative absolute border-[.5vw] border-[#F9EADE] ${card.translation} ${card.rotation} ${card.position}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
            onClick={() => openModal(card.src)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          ref={onModalMount}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm w-full h-screen flex items-center justify-center z-[1000]"
        >
          <button onClick={closeModal} aria-label="Close modal" className="absolute top-6 right-8 text-white text-4xl z-[1000] cursor-pointer">
            ✕
          </button>
          <div ref={onModalVideoMount} className="w-[85vw] max-w-[1000px] h-[80vh] flex items-center justify-center bg-gray-300/10">
            <video key={activeVideo} src={activeVideo} controls autoPlay className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonial;