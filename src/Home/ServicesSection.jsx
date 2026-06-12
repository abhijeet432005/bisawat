import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Teeth Whitening",
    description:
      "Brighten your smile safely with professional treatments designed for lasting, confident results.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    title: "Dental Implants",
    description:
      "Restore missing teeth with natural-looking implants that blend seamlessly with your smile.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  },
  {
    title: "Orthodontics",
    description:
      "Straighten your teeth with modern braces and aligners tailored to your unique dental needs.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
  },
  {
    title: "Emergency Care",
    description:
      "Fast, compassionate emergency dental services available when you need them most.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    gsap.set(".service-card-2, .service-card-3, .service-card-4", { y: 700 });

    const mm = gsap.matchMedia();

    // Desktop — pin entire section including header (current behavior)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".service-card-2", { y: 0, duration: 1 }, 0)
        .add(() => setActive(1), 0.9)
        .to(".service-card-3", { y: 0, duration: 1 }, 1)
        .add(() => setActive(2), 1.9)
        .to(".service-card-4", { y: 0, duration: 1 }, 2)
        .add(() => setActive(3), 2.9);
    });

    // Mobile — header scrolls naturally, only card container pins
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-card-container",
          start: "25% 35%",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".service-card-2", { y: 0, duration: 1 }, 0)
        .add(() => setActive(1), 0.9)
        .to(".service-card-3", { y: 0, duration: 1 }, 1)
        .add(() => setActive(2), 1.9)
        .to(".service-card-4", { y: 0, duration: 1 }, 2)
        .add(() => setActive(3), 2.9);
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20 bg-white px-7">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <span className="text-xs font-semibold tracking-widest text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full mb-5 uppercase">
          Services
        </span>
        <h2 className="text-5xl font-semibold text-[#0d1b2a] leading-tight">
          The most popular{" "}
          <span
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            className="font-normal italic"
          >
            services
          </span>
        </h2>
        <p className="text-gray-400 mt-4 text-base leading-relaxed max-w-md">
          From Essential Dentistry to Emergency Dental Services,
          <br />
          our Team is well-versed in all things oral care.
        </p>
      </div>

      {/* Stacked cards */}
      <div className="services-card-container max-w-5xl mx-auto relative min-h-[600px] md:min-h-[440px]">

        {services.map((service, i) => (
          <div
            key={i}
            className={`service-card-${i + 1} absolute inset-0 flex flex-col md:flex-row rounded-4xl overflow-hidden`}
            style={{ background: "#FAFAFA" }}
          >
            {/* Left */}
             <div className="flex flex-col justify-between p-8 w-full md:w-[55%] h-[55%] md:h-auto">
              {/* Step numbers */}
              <div className="flex items-center gap-4">
                {services.map((_, j) => (
                  <span
                    key={j}
                    className={`text-sm font-semibold ${
                      i === j ? "text-[#0d1b2a]" : "text-gray-300"
                    }`}
                  >
                    {i === j ? `-${j + 1}` : j + 1}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-4xl font-bold text-[#0d1b2a] leading-snug">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mt-auto mb-8 max-w-xs">
                {service.description}
              </p>

              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #6ab0f5 0%, #3b82f6 60%, #2563eb 100%)" }}
                >
                  Book Now
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">📅</span>
                </button>
                <button className="text-sm font-semibold text-[#0d1b2a] px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                  See Pricing
                </button>
              </div>
            </div>

            {/* Right — image */}
            <div className="w-full md:w-[45%] h-[45%] md:h-auto p-3 pt-0 md:pt-3">
              <div className="w-full h-full rounded-4xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ServicesSection;
