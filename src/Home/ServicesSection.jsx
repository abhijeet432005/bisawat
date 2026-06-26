import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Preventive Care",
    description:
      "Protect your oral health with routine checkups, cleanings, digital X-rays, and preventive treatments.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
  },
  {
    title: "Restorative Dentistry",
    description:
      "Restore damaged or missing teeth with fillings, crowns, bridges, implants, root canals, and dentures.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
  },
  {
    title: "Esthetic Dentistry",
    description:
      "Enhance your smile with teeth whitening, veneers, bonding, clear aligners, and complete smile makeovers.",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
  },
  {
    title: "Beyond the Smile",
    description:
      "Comprehensive care including sleep apnea therapy, TMJ treatment, and comfortable sedation dentistry.",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef.current);
    const mm = gsap.matchMedia();

    // header reveal — both breakpoints
    gsap.from(q("h2, .header-p"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    mm.add("(min-width: 768px)", () => {
      gsap.set(q(".service-card-2, .service-card-3, .service-card-4"), {
        y: 900,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      tl.to(q(".service-card-2"), { y: 0, duration: 1 }, 0)
        .add(() => setActive(1), 0.9)
        .to(q(".service-card-3"), { y: 0, duration: 1 }, 1)
        .add(() => setActive(2), 1.9)
        .to(q(".service-card-4"), { y: 0, duration: 1 }, 2)
        .add(() => setActive(3), 2.9);

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const cards = q(
        ".service-card-1, .service-card-2, .service-card-3, .service-card-4",
      );

      gsap.set(cards, { y: 40, opacity: 0 });

      const triggers = [];
      cards.forEach((card) => {
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
          animation: gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          }),
        });
        triggers.push(st);
      });

      return () => triggers.forEach((st) => st.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:h-[100svh] bg-white px-3 overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-15">
        <h2 className="text-5xl text-[#0d1b2a] leading-tight capitalize">
          The most popular{" "}
          <span className="font-normal font-[italic-font]">services</span>
        </h2>
      </div>

      <div className="services-card-container max-w-5xl mx-auto relative min-h-[500px] md:min-h-[440px] flex flex-col gap-5">
        {services.map((service, i) => (
          <div
            key={i}
            className={`service-card-${i + 1} md:absolute inset-0 flex flex-col md:flex-row rounded-4xl overflow-hidden`}
            style={{ background: "#FAFAFA" }}
          >
            <div className="flex flex-col justify-between p-8 w-full md:w-[55%] h-[300px] md:h-auto">
              <div className="flex items-center gap-4">
                {services.map((_, j) => (
                  <span
                    key={j}
                    className={`text-sm font-semibold ${i === j ? "text-[#0d1b2a]" : "text-gray-300"}`}
                  >
                    {i === j ? `${j + 1}` : j + 1}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="text-2xl md:text-4xl text-[#0d1b2a] leading-snug">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mt-auto mb-8 max-w-xs">
                {service.description}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full"
                  style={{
                    background:
                      "var(--btn-color)",
                  }}
                >
                  Book Now
                </button>
                <button className="text-sm font-semibold text-[#0d1b2a] px-5 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                  See Pricing
                </button>
              </div>
            </div>

            <div className="w-full md:w-[45%] h-[200px] md:h-auto p-3 pt-0 md:pt-3">
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
