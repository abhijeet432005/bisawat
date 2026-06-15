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
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    // ── DESKTOP — pinned stacking animation ──
    mm.add("(min-width: 768px)", () => {
      gsap.set(q(".img-2, .img-3, .img-4"), { y: 600 });
      gsap.set(q(".left-text .slide:not(:first-child)"),  { y: 80, opacity: 0 });
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
          .to(q(`.left-text .slide:nth-child(${i + 1})`),  { y: -80, opacity: 0, duration: 0.5 }, i + 0.9)
          .to(q(`.right-text .slide:nth-child(${i + 1})`), { y: -80, opacity: 0, duration: 0.5 }, i + 0.9)
          .to(q(`.left-text .slide:nth-child(${i + 2})`),  { y: 0, opacity: 1, duration: 0.5 },  i + 0.9)
          .to(q(`.right-text .slide:nth-child(${i + 2})`), { y: 0, opacity: 1, duration: 0.5 },  i + 0.9);
      });

      return () => tl.kill();
    });

    // ── MOBILE — no pin, each card fades+slides up on scroll ──
    mm.add("(max-width: 767px)", () => {
      gsap.set(q(".img-1, .img-2, .img-3, .img-4"), { clearProps: "all" });
      gsap.set(q(".left-text .slide, .right-text .slide"), { clearProps: "all" });

      const triggers: ScrollTrigger[] = [];

      q(".mobile-slide").forEach((el: Element) => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
          animation: gsap.fromTo(el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
          ),
        });
        triggers.push(st);
      });

      return () => triggers.forEach(st => st.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full md:my-20">

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex h-screen bg-gray-100 md:rounded-[5rem] flex-row justify-center items-center gap-12">
        <div className="left-text relative w-40 h-12 overflow-hidden">
          {slides.map((s, i) => (
            <h1 key={i} className="slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap">
              {s.left}
            </h1>
          ))}
        </div>

        <div className="center-images relative w-[25rem] h-[18rem] z-10">
          {[1,2,3,4].map((n, i) => (
            <div
              key={n}
              className={`img-${n} w-[15rem] h-[18rem] overflow-hidden bg-rose-400 rounded-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${i % 2 === 0 ? "rotate-12" : "-rotate-12"}`}
            >
              <img src={[
                "https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?w=900&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=900&auto=format&fit=crop&q=60",
              ][i]} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="right-text relative w-40 h-12 overflow-hidden">
          {slides.map((s, i) => (
            <h1 key={i} className="slide absolute inset-0 flex items-center justify-center text-xl font-bold whitespace-nowrap">
              {s.right}
            </h1>
          ))}
        </div>
      </div>

      {/* ── MOBILE — plain stacked cards, scroll-fade each one ── */}
      <div className="flex md:hidden flex-col gap-8 px-4 py-16 bg-gray-100 rounded-3xl">
        {slides.map((s, i) => (
          <div key={i} className="mobile-slide flex flex-col items-center gap-4">
            {/* text row */}
            <div className="flex justify-between w-full px-2">
              <span className="text-lg font-bold">{s.left}</span>
              <span className="text-lg font-bold">{s.right}</span>
            </div>
            {/* image */}
            <div className="w-full h-64 rounded-3xl overflow-hidden bg-rose-400">
              <img
                src={[
                  "https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509?w=900&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=900&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1564420228450-d9a5bc8d6565?w=900&auto=format&fit=crop&q=60",
                  "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=900&auto=format&fit=crop&q=60",
                ][i]}
                alt={s.left}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Image_pin;