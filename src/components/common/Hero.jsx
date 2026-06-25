import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = ({ content, className }) => {
  const imgRef = useRef(null);
  const sectionRef = useRef(null);
  const splitRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef.current);

    // initial states
    gsap.set(imgRef.current, { scale: 1.12 });
    gsap.set(q(".ch-badge"), { y: 20, opacity: 0 });
    gsap.set(q(".ch-sub"), { y: 24, opacity: 0 });
    gsap.set(q(".ch-card"), { y: 30, opacity: 0, x: 10 });

    splitRef.current = new SplitText(q(".ch-heading"), {
      type: "lines",
      mask: "lines",
    });
    gsap.set(splitRef.current.lines, { y: "108%" });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // image zoom out — slow, cinematic
    tl.to(
      imgRef.current,
      {
        scale: 1,
        duration: 2.2,
        ease: "power3.out",
      },
      0,
    )

      // badge
      .to(
        q(".ch-badge"),
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.3,
      )

      // heading lines unmask
      .to(
        splitRef.current.lines,
        {
          y: "0%",
          duration: 1,
          stagger: 0.12,
        },
        0.5,
      )

      // subtext
      .to(
        q(".ch-sub"),
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.9,
      )

      // card slides in from right
      .to(
        q(".ch-card"),
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.3)",
        },
        1.1,
      );

    return () => splitRef.current?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full flex justify-center overflow-hidden relative ${className}`}
    >
      <img
        ref={imgRef}
        src={content?.img}
        alt="Dental clinic"
        className="w-full h-full object-cover"
        style={{ willChange: "transform", transformOrigin: "center" }}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute bottom-0 flex flex-col w-[80%] mx-auto py-14 md:py-20">
        {content?.title && (
          <div className="ch-badge flex items-center gap-2 text-white/80 text-sm mb-6">
            {/* <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
            </svg> */}
            <span className="tracking-wide">{content?.title}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="ch-heading text-white text-5xl md:text-6xl leading-tight mb-5">
              {content?.heading}
            </h1>
            <p className="ch-sub text-white/65 text-sm md:text-base leading-relaxed max-w-lg">
              {content?.para}
            </p>
          </div>

          <div
            className="ch-card flex items-center gap-4 rounded-2xl px-5 py-4 flex-shrink-0 w-fit hover:bg-white cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.3) inset, 0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="/image/contact-hero.avif"
                alt="Doctor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight mb-0.5">
                {content?.text}
              </p>
              <p className="text-white/55 text-xs">Get Started</p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
