import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(heroRef.current);

    // split both heading chunks
    const split1 = new SplitText(q(".hero-heading"), {
      type: "lines",
      mask: "lines", // clips each line so words reveal upward
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1 — heading lines stagger up
    tl.from(split1.lines, {
      y: "110%",
      duration: 1,
      stagger: 0.1,
    })

    // 2 — review row
    .from(q(".hero-review"), {
      y: 24,
      opacity: 0,
      duration: 0.7,
    }, "-=0.4")

    // 3 — body copy
    .from(q(".hero-body"), {
      y: 20,
      opacity: 0,
      duration: 0.7,
    }, "-=0.5")

    // 4 — button
    .from(q(".hero-btn"), {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.4")

    // 5 — center image
    .from(q(".hero-image"), {
      // scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }, 0.2) // starts near beginning, overlaps text

    // 6 — bottom tags
    .from(q(".hero-tag"), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    }, "-=0.4");

    return () => split1.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full h-screen bg-[#608E8E] relative overflow-hidden">
      <div className="w-full flex-col md:flex-row flex gap-10 h-full justify-between py-10 md:pt-50 px-6 md:px-10 relative z-10">

        {/* LEFT — heading */}
        <div className="capitalize w-[30rem] pt-20 md:pt-0">
          <h1 className="hero-heading text-white text-4xl md:text-6xl max-w-xs md:max-w-lg">
            Find Your{" "}
            <span className="text-[#bcdf9d]">Ideal Hair Transplant clinic</span>{" "}
            around the world
          </h1>
        </div>

        {/* RIGHT — review + copy + button */}
        <div className=" w-fit md:w-[25rem] flex flex-col justify-start gap-5 bg-white/5 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-2 rounded-2xl h-fit">
          <div className="hero-review review w-full flex items-center justify-between gap-3 text-white">
            <div className="flex items-center">
              <div className="flex -space-x-6">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                />
              </div>
            </div>
            <div className="text-left w-full">
              <p className="text-lg leading-relaxed">"Amazing experience!"</p>
            </div>
          </div>

          <div className="hero-body text-white">
            <p className=" text-wrap max-w-xs md:w-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ab
              officia consectetur exercitationem quia ipsa cupiditate enim
              recusandae? Optio nulla ea quibusdam ratione ipsum minima
              inventore deleniti repudiandae deserunt soluta.
            </p>
          </div>

          <div>
            <button className="hero-btn px-3 py-2 bg-[#bcdf9d] text-black rounded-full">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom tags */}
      <div className="w-full md:flex justify-center gap-10 z-100 absolute bottom-20 hidden">
        <div className="hero-tag px-5 py-2 text-sm font-medium text-black/50 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg inline-block">
          White Teeth
        </div>
        <div className="hero-tag px-5 py-2 text-sm font-medium text-black/50 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg inline-block">
          White Teeth
        </div>
        <div className="hero-tag px-5 py-2 text-sm font-medium text-black/50 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg inline-block">
          White Teeth
        </div>
      </div>

      {/* Center image */}
      <div className="hero-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] z-1">
        <img
          src="/image/5148-removebg-preview.png"
          alt=""
          className="min-w-[28rem] md:w-[45vw] h-[110vh]"
        />
        <div className="overlay h-10 w-full absolute bottom-25 md:bottom-27" />
      </div>

      <div className="overlay h-150 w-full absolute bottom-0" />
    </div>
  );
};

export default Hero;