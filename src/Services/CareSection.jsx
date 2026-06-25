import React, { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const items = [
  {
    title: "Individual Care Plans",
    description:
      "Every patient receives a tailored approach based on medical needs, life stage, and personal goals.",
    image:
      "https://images.unsplash.com/photo-1609220136736-443150743cb4?w=300&q=80",
  },
  {
    title: "Clear Medical Communication",
    description:
      "We explain every step clearly, so you feel informed, confident, and involved in your care decisions.",
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=300&q=80",
  },
  {
    title: "Emotional & Physical Well-Being",
    description:
      "We care for the whole person — supporting mental, emotional, and physical health at every stage.",
    image:
      "https://images.unsplash.com/photo-1576765608866-5b51046452be?w=300&q=80",
  },
];

const CareSection = () => {
  const [open, setOpen] = useState(1);
  const bodyRefs = useRef([]);
  const iconRefs = useRef([]);
  const openRef = useRef(1);
  const rightColRef = useRef(null);
  const wrapperRefs = useRef([]);

  const toggle = useCallback((i) => {
    const prev = openRef.current;
    if (prev === i) return;

    // close previous body — animate height to 0
    const prevWrapper = wrapperRefs.current[prev];
    gsap.to(prevWrapper, {
      height: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    gsap.to(bodyRefs.current[prev], {
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut",
    });

    gsap.to(iconRefs.current[prev], {
      rotate: 90,
      duration: 0.35,
      ease: "power3.inOut",
    });

    openRef.current = i;
    setOpen(i);

    // open new body — measure natural height first
    const newWrapper = wrapperRefs.current[i];
    gsap.set(newWrapper, { height: "auto" });
    const naturalH = newWrapper.offsetHeight;
    gsap.set(newWrapper, { height: 0 });

    gsap.to(newWrapper, {
      height: naturalH,
      duration: 0.5,
      ease: "power3.inOut",
    });

    gsap.set(bodyRefs.current[i], { opacity: 0 });
    gsap.to(bodyRefs.current[i], {
      opacity: 1,
      duration: 0.35,
      delay: 0.15,
      ease: "power2.out",
    });

    gsap.to(iconRefs.current[i], {
      rotate: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
  }, []);

  useGSAP(() => {
    wrapperRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === openRef.current) {
        gsap.set(el, { height: "auto" });
      } else {
        gsap.set(el, { height: 0 });
      }
    });
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === openRef.current ? 1 : 0 });
    });
    iconRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { rotate: i === openRef.current ? 90 : 0 });
    });
  }, []);

  return (
    <section
      className="w-full py-16 md:py-10 px-6 md:px-16 flex justify-center"
      style={{ background: "#faf8f4" }}
    >
      <div className=" md:w-[85%] mx-auto flex flex-col md:flex-row gap-8 md:items-stretch">
        {/* LEFT — stretches to match right column's height, top to bottom */}
        <div className="w-full md:w-[50%] flex-shrink-0">
          <div className="w-full h-[380px] md:h-[700px] rounded-[2rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80"
              alt="Mother and child"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT — natural height, left column matches it via items-stretch */}
        <div ref={rightColRef} className="w-full md:w-[55%] flex flex-col">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-5">
            Care that adapts to your body, life, and journey
          </h2>
          <div className="flex-1" />

          {/* Accordion */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <div
                key={i}
                className="border-t border-gray-200 first:border-t-0"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-xl md:text-2xl text-[#1a1a1a]">
                    {item.title}
                  </span>

                  {/* plus / minus icon */}
                  <span className="relative w-5 h-5 flex-shrink-0 ml-4">
                    {/* horizontal bar — always visible */}
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#1a1a1a]" />
                    {/* vertical bar — rotates with icon ref, disappears when rotated 90deg (becomes the horizontal bar's twin, creating minus) */}
                    <span
                      ref={(el) => (iconRefs.current[i] = el)}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#1a1a1a]"
                      style={{ transformOrigin: "center" }}
                    />
                  </span>
                </button>

                <div
                  ref={(el) => (wrapperRefs.current[i] = el)}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    ref={(el) => (bodyRefs.current[i] = el)}
                    className="flex items-start gap-4 pb-5"
                  >
                    <div className="flex gap-5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-25 h-16 object-cover rounded-xl overflow-hidden"
                      />
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-8 w-fit px-7 py-3.5 rounded-full text-sm font-semibold text-[#1a1a1a] transition-transform active:scale-95"
            style={{ background: "#eaff5e" }}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareSection;
