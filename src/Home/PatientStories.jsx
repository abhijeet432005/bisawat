import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const patients = [
  {
    name: "Michael B.",
    age: "38 years old, Copenhagen",
    grafts: "2000 Grafts",
    quote:
      '"The results exceeded my expectations. Every step was handled with care, and I couldn\'t be happier with the outcome."',
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80",
  },
  {
    name: "Caleb T.",
    age: "34 years old, New York",
    grafts: "1800 Grafts",
    quote:
      '"I felt confident from day one. The team was professional and the transformation has been life-changing for me."',
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&q=80",
  },
  {
    name: "Joshua M.",
    age: "29 years old, LA",
    grafts: "2400 Grafts",
    quote:
      '"Natural-looking results that even my closest friends didn\'t notice were a transplant. Absolutely incredible work."',
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
  {
    name: "Arjun S.",
    age: "42 years old, London",
    grafts: "3000 Grafts",
    quote:
      '"Worth every penny. The clinic was spotless, the staff exceptional, and the results speak for themselves."',
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

export default function PatientStories() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const btnRef = useRef(null);
  const thumbsRef = useRef(null);
  const rightRef = useRef(null);
  const imgRef = useRef(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const quoteRef = useRef(null);
  const badgeRef = useRef(null);
  const thumbRefs = useRef([]);
  const activeRef = useRef(0);
  const splitRef = useRef(null);

  const total = patients.length;
  const current = patients[displayed];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // thumb blur-in
  useEffect(() => {
    thumbRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (!img) return;
      gsap.fromTo(
        img,
        { filter: "blur(16px)" },
        { filter: "blur(0px)", duration: 1, ease: "power4.out" },
      );
    });
  }, [active]);

  const thumbIndices = [(active + 1) % total, (active + 2) % total];

  useGSAP(() => {
    splitRef.current = new SplitText(headingRef.current, {
      type: "lines",
      mask: "lines",
    });

    // pehle se hide karo sab
    gsap.set(splitRef.current.lines, { y: "105%" });
    gsap.set(btnRef.current, { y: 20, opacity: 0 });
    gsap.set(rightRef.current, { x: 80, opacity: 0 });
    gsap.set(thumbRefs.current, { y: 30, opacity: 0 });

    gsap.set(imgRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      filter: "blur(0px)",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(splitRef.current.lines, {
          y: "0%",
          duration: 1,
          stagger: 0.12,
        })
          .to(
            btnRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.5)",
            },
            "<=0.5"
          )
          .to(
            rightRef.current,
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
            },
            "<=0.1",
          )
          .to(
            thumbRefs.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
            },
            "<=0.1",
          );
      },
    });

    return () => {
      splitRef.current?.revert();
      gsap.killTweensOf([
        imgRef.current,
        nameRef.current,
        ageRef.current,
        badgeRef.current,
        quoteRef.current,
      ]);
    };
  }, []);

  const goTo = (index) => {
    if (animating) return;
    const normalised = ((index % total) + total) % total;
    if (normalised === displayed) return;

    setAnimating(true);
    setDisplayed(normalised);
    setActive(normalised);

    const tl = gsap.timeline({ onComplete: () => setAnimating(false) });

    tl.fromTo(
      imgRef.current,
      { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08, filter: "blur(10px)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      },
    )
      .fromTo(
        [nameRef.current, ageRef.current, badgeRef.current],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 },
        "<0.1",
      )
      .fromTo(
        quoteRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "<0.1",
      );
  };

  const prev = () => goTo(activeRef.current - 1);
  const next = () => goTo(activeRef.current + 1);

  const NavButtons = ({ mobile = false }) => (
    <div
      className={`flex items-center gap-2 ${mobile ? "justify-center md:hidden" : "hidden md:flex mb-1"}`}
    >
      <button
        onClick={prev}
        disabled={animating}
        className={`${mobile ? "w-12 h-12" : "w-9 h-9"} rounded-full border flex items-center justify-center disabled:opacity-25 transition-opacity flex-shrink-0`}
        style={{ borderColor: "#1a3a2a", color: "#1a3a2a" }}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        disabled={animating}
        className={`${mobile ? "w-12 h-12" : "w-9 h-9"} rounded-full flex items-center justify-center text-white disabled:opacity-25 transition-opacity flex-shrink-0`}
        style={{ backgroundColor: "#1a3a2a" }}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 min-h-screen flex justify-center items-center relative mt-10"
      style={{ backgroundColor: "#f0ede8" }}
    >
      <div className="stories-overlay-2 absolute top-0 h-10 md:h-15 w-full" />

      <div className="w-[90%] md:w-[95%] flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
        {/* LEFT */}
        <div
          className="flex flex-col w-full md:w-[50%] flex-shrink-0"
          style={{ minHeight: "500px" }}
        >
          <div className="flex-shrink-0">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl leading-tight mb-6"
              style={{ color: "#1a3a2a" }}
            >
              <span
                className="italic"
                style={{ color: "#b8942a", fontFamily: "font-italic" }}
              >
                Patient Stories{" "}
              </span>
              That Speak for Themselves
            </h2>
            <button
              ref={btnRef}
              className="text-sm font-medium text-white px-5 py-2.5 rounded-full"
              style={{ backgroundColor: "#1a3a2a" }}
            >
              View all testimonial
            </button>
          </div>

          <div className="flex-1" />

          {/* Thumbs + desktop nav */}
          <div ref={thumbsRef} className="flex-shrink-0">
            <div className="flex items-end gap-3">
              {thumbIndices.map((pIdx, slot) => {
                const p = patients[pIdx];
                return (
                  <div
                    key={slot}
                    ref={(el) => (thumbRefs.current[slot] = el)}
                    onClick={() => goTo(pIdx)}
                    className="relative rounded-2xl overflow-hidden cursor-pointer w-[8rem] h-[10rem] md:w-[12rem] md:h-[14rem]"
                  >
                    <img
                      src={p.thumb}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 px-3 py-3">
                      <p className="text-white text-xs md:text-[1rem] font-semibold leading-tight">
                        {p.name}
                      </p>
                      <p className="text-white/70 text-xs md:text-[1rem]">
                        {p.age}
                      </p>
                    </div>
                  </div>
                );
              })}
              <NavButtons />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className="w-full md:w-[40%] md:h-[35rem] lg:h-[42rem] rounded-3xl overflow-hidden flex-shrink-0"
          style={{ backgroundColor: "#c8b99a" }}
        >
          <div className="w-full h-full p-7 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ width: "50%", aspectRatio: "3.5/4" }}
                >
                  <img
                    ref={imgRef}
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover object-top"
                    style={{ willChange: "transform, filter, clip-path" }}
                  />
                </div>
                <span
                  ref={badgeRef}
                  className="text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: "#e8ddd0",
                    color: "#1a3a2a",
                    willChange: "transform, opacity",
                  }}
                >
                  {current.grafts}
                </span>
              </div>

              <div>
                <p
                  ref={nameRef}
                  className="text-lg"
                  style={{ color: "#1a3a2a", willChange: "transform, opacity" }}
                >
                  {current.name}
                </p>
                <p
                  ref={ageRef}
                  className="text-sm"
                  style={{ color: "#7a6a55", willChange: "transform, opacity" }}
                >
                  {current.age}
                </p>
              </div>
            </div>

            <p
              ref={quoteRef}
              className="text-base md:text-xl leading-snug md:max-w-xs"
              style={{
                color: "#1a3a2a",
                fontFamily: "Georgia, serif",
                willChange: "transform, opacity",
              }}
            >
              {current.quote}
            </p>
          </div>
        </div>

        <NavButtons mobile />
      </div>

      <div className="stories-overlay absolute bottom-0 h-10 md:h-15 w-full" />
    </section>
  );
}
