import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const teamMembers = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Lead Dentist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
  {
    name: "Dr. James Carter",
    role: "Orthodontist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  },
  {
    name: "Dr. Amelia Brooks",
    role: "Gynecologist",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
];

const TeamSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      // Eyebrow fade up
      gsap.fromTo(
        ".team-eyebrow",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-eyebrow", start: "top 88%" },
        }
      );

      // Heading split reveal
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
        }
      );

      // Team card images: clip-path top-to-bottom + blur + zoom, staggered
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
        }
      );

      // Card name + role fade up staggered
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
        }
      );

      // Big group image: clip-path reveal + blur + zoom
      gsap.fromTo(
        ".team-group-img img",
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
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-24 px-6 md:px-16"
      style={{ background: "#faf8f4" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="team-eyebrow text-xs sm:text-sm text-gray-500 tracking-wide mb-3">
            [ Our People ]
          </p>
          <h2
            className="team-heading text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight overflow-hidden"
          >
            Meet the team behind{" "}
            <span className="font-normal" style={{ fontStyle: "italic" }}>
              your care
            </span>
          </h2>
        </div>

        {/* Team cards — 3 across */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mb-6 md:mb-8">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="team-card-img w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden mb-4"
                style={{ aspectRatio: "3/3.8" }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="team-card-text text-lg md:text-xl text-[#1a1a1a] mb-1">
                {member.name}
              </h3>
              <p className="team-card-text text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Big group image */}
        <div
          className="team-group-img w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Our team"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};

export default TeamSection;