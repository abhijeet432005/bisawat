import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { left: "Fresh Start", right: "Begin Here" },
  { left: "Bold Move",   right: "Take Risks" },
  { left: "Deep Dive",   right: "Go Further" },
  { left: "Full Circle", right: "You're Here" },
];

const Image_pin = () => {
  const sectionRef = useRef(null);

  // ── sync before paint — no flash of unhidden images ──────
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q = gsap.utils.selector(section);

    gsap.set(q(".img-2, .img-3, .img-4"), { y: 600 });
    gsap.set(q(".left-text .slide:not(:first-child)"),  { y: 80, opacity: 0 });
    gsap.set(q(".right-text .slide:not(:first-child)"), { y: 80, opacity: 0 });
  }, []);

  // ── ScrollTrigger after layout ────────────────────────────
  useGSAP(() => {
    document.documentElement.style.overflowY = "scroll";

    const section = sectionRef.current;
    const q = gsap.utils.selector(section);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        pinType: "transform",
        refreshPriority: 0,
      },
    });

    [2, 3, 4].forEach((n, i) => {
      tl.to(q(`.img-${n}`), { y: 0, duration: 1 }, i)
        .to(q(`.left-text .slide:nth-child(${i + 1})`),  { y: -80, opacity: 0, duration: 0.5 }, i + 0.9)
        .to(q(`.right-text .slide:nth-child(${i + 1})`), { y: -80, opacity: 0, duration: 0.5 }, i + 0.9)
        .to(q(`.left-text .slide:nth-child(${i + 2})`),  { y: 0, opacity: 1, duration: 0.5 },  i + 0.9)
        .to(q(`.right-text .slide:nth-child(${i + 2})`), { y: 0, opacity: 1, duration: 0.5 },  i + 0.9);
    });

    return () => {
      tl.kill();
      document.documentElement.style.overflowY = "";
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ willChange: "transform" }}
      className="w-full h-[100svh] bg-gray-100 md:rounded-[5rem] flex flex-col md:flex-row justify-center items-center gap-12"
    >
      <div className="left-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1 key={i} className="slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap">
            {s.left}
          </h1>
        ))}
      </div>

      <div className="center-images relative w-[25rem] h-[18rem] z-10">
        <div className="img-1 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img src="https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509?w=900&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="img-2 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img src="https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=900&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="img-3 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img src="https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?w=900&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="img-4 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img src="https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=900&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="right-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1 key={i} className="slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap">
            {s.right}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Image_pin;