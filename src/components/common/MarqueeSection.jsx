import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router";

gsap.registerPlugin(SplitText, ScrollTrigger);

const images = [
  "/marquee/4.webp",
  "/marquee/1.webp",
  "/marquee/2.webp",
  "/marquee/5.webp",
  "/marquee/3.webp",
];

const marqueeImages = [...images, ...images];

const TRACK_DURATION = 20;
const IMG_DRIFT_PX = 30;
const IMG_SCALE = 1.3;

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const imgRefs = useRef([]);
  const trackTween = useRef(null);
  const parallaxTween = useRef(null);
  const halfWidthRef = useRef(0);
  const resizeTimeout = useRef(null);
  const { pathname } = useLocation();

  useGSAP(
    () => {
      const track = trackRef.current;
      const measure = () => track.scrollWidth / 2;
      halfWidthRef.current = measure();

      // ── Reveal: heading split + marquee row fade/slide in on scroll ──
      const split = new SplitText(".marquee-heading-line", { type: "lines" });
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
          scrollTrigger: { trigger: ".marquee-heading-wrap", start: "top 85%" },
        },
      );

      // Marquee track container reveal: fade up + clip-path wipe per card
      gsap.fromTo(
        ".marquee-card",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".marquee-row", start: "top 88%" },
        },
      );

      // ── Existing marquee loop + parallax (unchanged) ──
      const startTrack = (fromX = 0) => {
        gsap.set(track, { x: fromX, force3D: true });
        trackTween.current = gsap.to(track, {
          x: () => -halfWidthRef.current,
          duration: TRACK_DURATION,
          ease: "none",
          repeat: -1,
          force3D: true,
        });
      };

      const startParallax = () => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.fromTo(
          imgRefs.current,
          { x: -IMG_DRIFT_PX },
          {
            x: IMG_DRIFT_PX,
            duration: TRACK_DURATION * 0.6,
            ease: "sine.inOut",
            stagger: {
              each: 0.12,
              from: "start",
            },
          },
        );
        parallaxTween.current = tl;
      };

      startTrack();
      startParallax();

      const handleResize = () => {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
          const oldHalfWidth = halfWidthRef.current;
          const currentX = gsap.getProperty(track, "x");
          const progress = oldHalfWidth ? Math.abs(currentX) / oldHalfWidth : 0;

          trackTween.current?.kill();
          gsap.set(track, { x: 0 });
          halfWidthRef.current = measure();
          startTrack(-progress * halfWidthRef.current);
        }, 200);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        trackTween.current?.kill();
        parallaxTween.current?.kill();
        clearTimeout(resizeTimeout.current);
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: sectionRef },
  );

  const pauseAll = () => {
    trackTween.current?.pause();
    parallaxTween.current?.pause();
  };
  const playAll = () => {
    trackTween.current?.play();
    parallaxTween.current?.play();
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full py-10 pb-20 overflow-hidden relative ${pathname === "/services" ? " " : "bg-[#faf8f4]"}`}
    >
      <div className="marquee-heading-wrap max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16 capitalize">
        <h2 className="marquee-heading-line text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight overflow-hidden">
          Moments of care,
          <br />
          <span className="font-[italic-font]">captured every day</span>
        </h2>
      </div>

      <div
        className="marquee-row relative w-full overflow-hidden"
        onMouseEnter={pauseAll}
        onMouseLeave={playAll}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {marqueeImages.map((src, i) => (
            <div
              key={i}
              className="marquee-card flex-shrink-0 lg:rounded-xl overflow-hidden relative"
              style={{
                width: "clamp(220px, 26vw, 300px)",
                height: "clamp(300px, 32vw, 350px)",
              }}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                alt=""
                className="w-full h-full object-cover absolute inset-0"
                style={{
                  "--img-scale": IMG_SCALE,
                  transform: `scale(var(--img-scale))`,
                  willChange: "transform",
                }}
                draggable={false}
                loading={i < 6 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {
        pathname === "/about" && <div
        className=" absolute bottom-0 w-full h-10 z-20"
        style={{
          background: "#FAF8F4",
          backgroundImage:
            "linear-gradient(180deg,rgba(250, 248, 244, 1) 0%, rgba(255, 255, 255, 0.9) 100%)",
        }}
      ></div>
      }
    </section>
  );
};

export default MarqueeSection;
