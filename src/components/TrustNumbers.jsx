import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "./Counter/Countup";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { to: 5, suffix: "K+", label: "Happy Patients" },
  { to: 1, suffix: "K+", label: "Clinics Listed" },
  { to: 10, suffix: "K+", label: "Procedures Done" },
];

const TrustNumbers = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const q = gsap.utils.selector(sectionRef.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // left block slides in from left
    tl.from(q(".trust-left"), {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    // stat items stagger up
    .from(q(".stat-item"), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
    }, "-=0.4");

  }, []);

  return (
    <div ref={sectionRef} className="w-full flex justify-center items-center pt-20 pb-5">
      <div className="w-[90%] md:w-[80%] gap-[2rem] flex flex-col lg:flex-row justify-between items-start lg:items-center border-b pb-20 border-gray-300">

        <div className="trust-left left flex flex-col gap-5">
          <h1 className="text-4xl md:text-5xl capitalize">Trust & <span className="font-[italic-font]">proven</span></h1>
          <p className="w-xs lg:text-[1rem] text-gray-500">
            Celebrating milestone that reflect our commitment to healthy,
            confident smiles.
          </p>
        </div>

        <div className="right text-4xl md:text-5xl flex justify-between w-full md:w-[70vh] lg:w-[40vw]">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-start">
              <div className="flex items-end">
                {
                  <CountUp
                    from={0}
                    to={stat.to}
                    separator=","
                    direction="up"
                    duration={1.5}
                    className="count-up-text"
                    delay={i * 0.12}
                  />
                }
                <span>{stat.suffix}</span>
              </div>
              <span className="text-sm text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TrustNumbers;