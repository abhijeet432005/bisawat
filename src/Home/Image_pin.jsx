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

    // Hide imgs 2-4 below
    gsap.set(".img-2, .img-3, .img-4", { y: 600 });

    // Hide text slides 2-4 below (left and right)
    gsap.set(".left-text .slide:not(:first-child)", { y: 80, opacity: 0 });
    gsap.set(".right-text .slide:not(:first-child)", { y: 80, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true
      },
    });

    [2, 3, 4].forEach((n, i) => {
      tl.to(`.img-${n}`, { y: 0, duration: 1 }, i)
        .to(
          `.left-text .slide:nth-child(${i + 1})`,
          { y: -80, opacity: 0, duration: 0.5 },
          i + 0.9,
        )
        .to(
          `.right-text .slide:nth-child(${i + 1})`,
          { y: -80, opacity: 0, duration: 0.5 },
          i + 0.9,
        )
        .to(
          `.left-text .slide:nth-child(${i + 2})`,
          { y: 0, opacity: 1, duration: 0.5 },
          i + 0.9,
        )
        .to(
          `.right-text .slide:nth-child(${i + 2})`,
          { y: 0, opacity: 1, duration: 0.5 },
          i + 0.9,
        );
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-screen bg-gray-100 md:rounded-[5rem] flex flex-col md:flex-row justify-center items-center gap-12 my-10 md:my-20"
    >
      {/* Left text — all slides stacked, only one visible at a time */}
      <div className="left-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1
            key={i}
            className={`slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap`}
          >
            {s.left}
          </h1>
        ))}
      </div>

      <div className="center-images relative w-[25rem] h-[18rem] z-10">
        <div className="img-1 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img
            src="https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
        <div className="img-2 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img
            src="https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="img-3 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img
            src="https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>

        <div className="img-4 img w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12">
          <img
            src="https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlbnRpc3R8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
      </div>

      {/* Right text — same pattern */}
      <div className="right-text relative w-40 h-12 overflow-hidden">
        {slides.map((s, i) => (
          <h1
            key={i}
            className={`slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap`}
          >
            {s.right}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Image_pin;
