import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

gsap.registerPlugin(SplitText, ScrollTrigger);

const QuickFacts = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Heading split reveal
        const split = new SplitText(".facts-heading", { type: "lines" });
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
            scrollTrigger: { trigger: ".facts-heading", start: "top 85%" },
          },
        );

        // Column 1: image reveals first, then overlay fades in, then text
        gsap.fromTo(
          ".fact-img-1 img",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.15,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".fact-img-1 .fact-overlay",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.0,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".fact-img-1 h3",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 1.2,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );

        // Column 2: two stacked cards, fade up staggered
        gsap.fromTo(
          ".fact-card",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );

        // Column 3: image reveals first, then overlay fades in, then text
        gsap.fromTo(
          ".fact-img-2 img",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.15,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.inOut",
            delay: 0.3,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".fact-img-2 .fact-overlay",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.3,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".fact-img-2 h3",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 1.5,
            scrollTrigger: { trigger: ".facts-grid", start: "top 80%" },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-24 px-6 md:px-12 flex justify-center mt-20"
      style={{ background: "#ffffff" }}
    >
      <div className="md:w-[80%] flex flex-col justify-center items-center">
        {/* Heading */}
        <h2
          className="facts-heading text-center capitalize text-3xl sm:text-4xl md:text-5xl md:max-w-2xl leading-tight mb-12 md:mb-16 overflow-hidden"
          style={{ color: "#0d1b2a" }}
        >
          Quick facts that highlight our journey, trust, and{" "}
          <span className="font-[italic-font]">community impact</span>
        </h2>

        {/* Grid */}
        <div className="facts-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* COLUMN 1 — image card with overlay text top */}
          <div
            className="fact-img-1 relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "3.5/4.8" }}
          >
            <img
              src="/Clinic/clinic8.webp"
              alt="Modern treatment room at Birawat Dental Studio"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div
              className="fact-overlay absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%, transparent 100%)",
                opacity: 0,
              }}
            />
            <div className="absolute top-6 left-6 flex flex-col justify-between">
              <h3 className="text-white text-2xl md:text-3xl leading-tight">
                1K+ Patient Visits
              </h3>
              <p className=" mt-95 md:mt-93 font-semibold text-sm md:text-base leading-snug truncate flex gap-2 items-center text-white">
                <PinIcon />
                <span>Mumbai</span>
              </p>
            </div>
          </div>

          {/* COLUMN 2 — two stacked text cards */}
          <div className="flex flex-col gap-5 md:gap-6">
            <div
              className="fact-card flex-1 rounded-2xl p-7 md:p-8 flex flex-col justify-between"
              style={{ background: "var(--btn-color)", minHeight: "220px" }}
            >
              <h3 className="text-white text-2xl md:text-3xl leading-tight mb-4">
                Dedicated Team
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Our skilled dental team provides personalized care, ensuring
                every patient feels comfortable and confident.
              </p>
            </div>

            <div
              className="fact-card flex-1 rounded-2xl p-7 md:p-8 flex flex-col justify-between"
              style={{ background: "#f7f7f7", minHeight: "220px" }}
            >
              <h3
                className="text-2xl md:text-3xl leading-tight mb-4"
                style={{ color: "#0d1b2a" }}
              >
                Advanced Technology
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#6b6b6b" }}
              >
                We use advanced technology to deliver accurate, comfortable, and
                effective dental care.
              </p>
            </div>
          </div>

          {/* COLUMN 3 — image card with overlay text bottom */}
          <div
            className="fact-img-2 relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "3.5/4.8" }}
          >
            <img
              src="/Clinic/clinic4.webp"
              alt="Modern treatment room at Birawat Dental Studio"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <div
              className="fact-overlay absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 95%, transparent 100%)",
                opacity: 0,
              }}
            />
            <div className="absolute bottom-6 left-6">
              <div className="hero-review review w-full flex items-center justify-between gap-3 text-white mb-5">
                <div className="flex items-center">
                  <div className="flex -space-x-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Happy patient"
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="max-w-10 max-h-10 rounded-full object-cover border border-white shadow-md"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Happy patient"
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="max-w-10 max-h-10 rounded-full object-cover border border-white shadow-md"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Happy patient"
                      width="40"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      className="max-w-10 max-h-10 rounded-full object-cover border border-white shadow-md"
                    />
                  </div>
                </div>
                <div className="text-left w-full">
                  <p className="text-sm leading-relaxed">
                    "Amazing experience!"
                  </p>
                </div>
              </div>
              <h3 className="text-white text-2xl md:text-3xl leading-tight flex items-center gap-1">
                300+ Google
              </h3>
              <h3 className="text-white text-2xl md:text-3xl leading-tight">
                Rating
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickFacts;
