import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const split = new SplitText(".hero-fact-heading", { type: "lines" });

    split.lines.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.fromTo(
      split.lines,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-fact-heading",
          start: "top 85%",
        },
      }
    );

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex justify-center">
      <h2
        className="hero-fact-heading text-center capitalize text-3xl sm:text-4xl md:text-5xl md:max-w-2xl leading-tight mb-12 md:mb-16 overflow-hidden mt-45"
        style={{ color: "#0d1b2a" }}
      >
        Quick facts that highlight our journey, trust, and{" "}
        <span className="font-[italic-font]">community impact</span>
      </h2>
    </div>
  );
};

export default Hero;