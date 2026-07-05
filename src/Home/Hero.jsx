import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router";

gsap.registerPlugin(SplitText, ScrollTrigger);

const tags = ["Teeth Whitening", "White Teeth", "Dental Implants"];

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const imageWrapRef = useRef(null);
  const mobileCardRef = useRef(null); // ← new ref for the blur card wrapper

  useGSAP(() => {
    const q = gsap.utils.selector(heroRef.current);

    const split1 = new SplitText(q(".hero-heading"), {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(split1.lines, {
      y: "110%",
      duration: 1,
      stagger: 0.1,
    })

      // ── mobile card wrapper — fades in + blur settles ──
      .from(
        mobileCardRef.current,
        {
          opacity: 0,
          y: 24,
          backdropFilter: "blur(0px)",
          duration: 0.8,
        },
        "-=0.5",
      )

      .from(q(".hero-review"), { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")

      .from(q(".hero-body"), { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")

      .from(
        q(".hero-btn"),
        { y: 16, opacity: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4",
      )

      .from(
        imageWrapRef.current,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(14px)",
          duration: 1.3,
          ease: "power3.out",
        },
        0.2,
      )

      .from(
        q(".hero-tag"),
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      );

    const scrollParallax = gsap.to(imageWrapRef.current, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      split1.revert();
      scrollParallax.scrollTrigger?.kill();
      scrollParallax.kill();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="w-full h-screen bg-[#6499c5] relative overflow-hidden"
    >
      <div className="w-full flex-col md:flex-row flex gap-10 h-full justify-between py-10 md:pt-50 px-6 md:px-10 relative z-10">
        <div className="capitalize w-[80vw] md:w-[30rem] pt-20 md:pt-0">
          <h1 className="hero-heading text-white text-4xl md:text-[4vw] md:leading-[4.5vw] min-w-xs md:max-w-lg">
            Precision Dental Care for <span className="font-[italic-font]">Every Smile</span>
          </h1>
        </div>

        {/* ── ref added here ── */}
        <div
          ref={mobileCardRef}
          className="w-fit md:w-[25rem] flex flex-col justify-start gap-5 bg-white/5 backdrop-blur-md  p-4 md:p-4 rounded-2xl h-fit"
        >
          <div className="hero-review review w-full flex items-center justify-between gap-3 text-white">
            <div className="flex items-center">
              <div className="flex -space-x-6">
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
              <p className="text-lg leading-relaxed">"Amazing experience!"</p>
            </div>
          </div>

          <div className="hero-body text-white">
            <p className="text-wrap max-w-xs md:w-auto">
              Comprehensive dental care tailored to you — from routine checkups
              to advanced cosmetic treatments, our experienced team is dedicated
              to helping you achieve a healthier, more confident smile.
            </p>
          </div>

          <div>
            <button
              onClick={() => navigate("/contact")}
              className="hero-btn px-4 py-2 bg-[var(--btn-color)] text-white rounded-full"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:flex justify-center gap-10 z-20 absolute bottom-20 hidden">
        {tags.map((tag) => (
          <div
            key={tag}
            className="hero-tag px-5 py-2 text-sm font-medium text-black/50 hover:text-black rounded-full backdrop-blur-md bg-white/10 hover:bg-white border border-white/20 shadow-lg transition-colors duration-300 cursor-pointer"
          >
            {tag}
          </div>
        ))}
      </div>

      <div
        ref={imageWrapRef}
        className="hero-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] z-1"
      >
        <img
          src="/image/hero.webp"
          alt="Smiling patient"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="min-w-[28rem] md:w-[45vw] h-[110vh]"
        />
      </div>
      <div className="overlay h-10 w-full absolute bottom-0 z-2" />
      <div className="overlay h-150 w-full absolute bottom-0" />
    </div>
  );
};

export default Hero;
