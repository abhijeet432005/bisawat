import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { left: "Fresh Start", right: "Begin Here" },
  { left: "Bold Move", right: "Take Risks" },
  { left: "Deep Dive", right: "Go Further" },
  { left: "Full Circle", right: "You're Here" },
];

const Image_pin = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    // scope all selectors to this section only
    const q = gsap.utils.selector(section);

    gsap.set(q(".img-2, .img-3, .img-4"), { y: 600 });
    gsap.set(q(".left-text .slide:not(:first-child)"), { y: 80, opacity: 0 });
    gsap.set(q(".right-text .slide:not(:first-child)"), { y: 80, opacity: 0 });

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
        refreshPriority: 0,
      },
    });

    [2, 3, 4].forEach((n, i) => {
      tl.to(q(`.img-${n}`), { y: 0, duration: 1 }, i)
        .to(
          q(`.left-text .slide:nth-child(${i + 1})`),
          { y: -80, opacity: 0, duration: 0.5 },
          i + 0.9,
        )
        .to(
          q(`.right-text .slide:nth-child(${i + 1})`),
          { y: -80, opacity: 0, duration: 0.5 },
          i + 0.9,
        )
        .to(
          q(`.left-text .slide:nth-child(${i + 2})`),
          { y: 0, opacity: 1, duration: 0.5 },
          i + 0.9,
        )
        .to(
          q(`.right-text .slide:nth-child(${i + 2})`),
          { y: 0, opacity: 1, duration: 0.5 },
          i + 0.9,
        );
    });

    // cleanup only this timeline — don't kill other components' ScrollTriggers
    return () => tl.kill();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen bg-gray-100 md:rounded-[5rem] flex flex-col md:flex-row justify-center items-center gap-12"
    >
      <div
        className="absolute top-0 h-10 w-full"
        style={{
          backgroundColor: "#F3F4F6",
          backgroundImage:
            "linear-gradient(0deg, rgba(243, 244, 246, 1) 0%, rgba(255, 255, 255, 0.9) 100%)",
        }}
      ></div>
      <div className="left-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1
            key={i}
            className="slide absolute inset-0 flex items-center justify-center text-xl whitespace-nowrap"
          >
            {s.left}
          </h1>
        ))}
      </div>

      <div className="center-images relative w-[25rem] h-[18rem] z-10">
        <div className="img-1 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img
            src="/random/3.webp"
            alt="Patient receiving dental care at Birawat Dental Studio"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="img-2 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img
            src="/random/6.webp"
            alt="Patient receiving dental care at Birawat Dental Studio"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="img-3 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img
            src="/random/9.webp"
            alt="Patient receiving dental care at Birawat Dental Studio"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
        <div className="img-4 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img
            src="/random/15.webp"
            alt="Patient receiving dental care at Birawat Dental Studio"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="right-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1
            key={i}
            className="slide absolute inset-0 flex items-center justify-center text-xl whitespace-nowrap"
          >
            {s.right}
          </h1>
        ))}
      </div>

      <div
        className="absolute bottom-0 h-10 w-full"
        style={{
          backgroundColor: "#F3F4F6",
          backgroundImage:
            "linear-gradient(180deg,rgba(243, 244, 246, 1) 0%, rgba(255, 255, 255, 0.9) 100%)",
        }}
      ></div>
    </div>
  );
};

export default Image_pin;
