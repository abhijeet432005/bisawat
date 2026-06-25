import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const teamMembers = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Lead Dentist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    intro: "Creative director shaping visual identity and brand language.",
  },
  {
    name: "Dr. James Carter",
    role: "Orthodontist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
    intro: "Creative director shaping visual identity and brand language.",
  },
  {
    name: "Dr. Amelia Brooks",
    role: "Gynecologist",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    intro: "Creative director shaping visual identity and brand language.",
  },
];

const TeamSection = () => {
  const containerRef = useRef(null);
  const groupImgRef = useRef(null);
  const groupWrapRef = useRef(null);

  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const infoBg = card.querySelector(".team-info-bg");
      const infoText = card.querySelector(".info-text");
      const nameTag = card.querySelector(".team-name-tag");

      gsap.set(infoBg, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(infoText, { opacity: 0, y: 20 });

      card.tl = gsap
        .timeline({ paused: true })
        .to(infoBg, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "expo.inOut",
        })
        .to(
          nameTag,
          {
            y: -60,
            color: "#000",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          infoText,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.2",
        );
    });
  }, []);

  const toggleCard = (i) => {
    const card = cardsRef.current[i];
    if (activeIndex === i) {
      card.tl.reverse();
      setActiveIndex(null);
    } else {
      if (activeIndex !== null && cardsRef.current[activeIndex]) {
        cardsRef.current[activeIndex].tl.reverse();
      }
      card.tl.play();
      setActiveIndex(i);
    }
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".team-eyebrow",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: ".team-eyebrow", start: "top 88%" },
          },
        );

        const split = new SplitText(".team-heading", { type: "lines" });
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
            scrollTrigger: { trigger: ".team-heading", start: "top 85%" },
          },
        );

        gsap.fromTo(
          ".team-card-img img",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.15,
            filter: "blur(10px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.15,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".team-grid", start: "top 82%" },
          },
        );

        gsap.fromTo(
          ".team-card-text",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".team-grid", start: "top 82%" },
          },
        );

        gsap.fromTo(
          groupImgRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.12,
            filter: "blur(12px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".team-group-img", start: "top 80%" },
          },
        );

        // ── Hover zoom on group image ──
        const wrap = groupWrapRef.current;
        const img = groupImgRef.current;

        const handleEnter = () => {
          gsap.to(img, {
            scale: 1.08,
            duration: 0.8,
            ease: "power3.out",
          });
        };
        const handleLeave = () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        wrap.addEventListener("mouseenter", handleEnter);
        wrap.addEventListener("mouseleave", handleLeave);

        return () => {
          wrap.removeEventListener("mouseenter", handleEnter);
          wrap.removeEventListener("mouseleave", handleLeave);
        };
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-10 md:py-20 px-6 md:px-16 relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F4" }}
    >
      <div
        className="absolute top-0 h-10 md:h-15 w-full left-0"
        style={{
          background: "#FAF8F4",
          backgroundImage:
            "linear-gradient(0deg, rgba(250, 248, 244, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%)",
        }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 capitalize">
          <h2 className="team-heading text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight overflow-hidden">
            Meet the team behind{" "}
            <span className="font-[italic-font]">your care</span>
          </h2>
        </div>

        <div className="team-grid grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mb-6 md:mb-8">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative min-w-[300px] w-[25vw] flex-shrink-0"
            >
              <div className="team-card-img relative h-[60vh] w-full overflow-hidden rounded-3xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />

                <div className="team-info-bg absolute inset-0 bg-[#f6f6f6] p-8 flex flex-col justify-start">
                  <div className="info-text team-card-text">
                    <h1 className="text-2xl">{member.head}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                      {member.intro}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleCard(i)}
                  className="group absolute bottom-2 right-2 z-30  text-black rounded-full flex gap-4 items-center justify-center transition-transform duration-500"
                >
                  <div
                    className="w-10 h-10 bg-[#2D2D2A] text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-90"
                    style={{
                      transform:
                        activeIndex === i ? "rotate(135deg)" : "rotate(0deg)",
                    }}
                  >
                    <Plus size={20} strokeWidth={3} />
                  </div>
                </button>
              </div>

              <div className="team-name-tag team-card-text mt-4 text-2xl font-semibold px-2 relative z-20 pointer-events-none">
                {member.name}
              </div>
            </div>
          ))}
        </div>

        {/* Big group image with GSAP hover zoom */}
        <div
          ref={groupWrapRef}
          className="team-group-img w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden mt-15"
          style={{ aspectRatio: "16/9", cursor: "pointer" }}
        >
          <img
            ref={groupImgRef}
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Our team"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: "transform" }}
          />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;