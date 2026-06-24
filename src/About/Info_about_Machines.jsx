import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Footer from "../../component/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const Info_about_Machines = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const content = [
    {
      con1: "https://images.unsplash.com/photo-1756206872785-530eca212ee2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      con2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae consectetur placeat nesciunt dolore?",
      style: " items-end gap-[5vw]",
      imgStyle: "lg:w-[45vw] lg:h-[90vh] w-[50vw] h-[50vh]",
    },
    {
      con1: "https://plus.unsplash.com/premium_photo-1764395884223-da138ebbfe74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      con2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae consectetur placeat nesciunt dolore?",
      style: "flex-row-reverse items-end justify-between gap-5",
      imgStyle: "lg:w-[50vw] lg:h-[80vh] w-[50vw] h-[50vh]",
    },
    {
      con1: "https://plus.unsplash.com/premium_photo-1764395884223-da138ebbfe74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      con2: "https://images.unsplash.com/photo-1756206872785-530eca212ee2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      style: "flex-row-reverse items-end justify-between lg:gap-[5vw] gap-5",
      imgStyle: "lg:w-[50vw] lg:h-[80vh] w-[42vw] h-[40vh]",
    },
    {
      con1: "https://plus.unsplash.com/premium_photo-1764395884223-da138ebbfe74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
      con2: "",
      style: " items-end justify-between gap-[5vw]",
      imgStyle: "lg:w-[50vw] lg:h-[80vh]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(".parallex", {
        y: -130,
        scrollTrigger: {
          trigger: ".parallex",
          start: "40% 50%",
          scrub: true,
          ease: "expo.out",
        },
      });

      // Each row reveals as it enters viewport
      const rows = gsap.utils.toArray(".reveal-row");

      rows.forEach((row) => {
        const img = row.querySelector(".reveal-img");
        const text = row.querySelector(".reveal-text");

        if (img) {
          gsap.fromTo(
            img,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              scale: 1.18,
              filter: "blur(14px)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderContent = (value, imgStyle) => {
    if (!value) return null;

    if (value.startsWith("http")) {
      return (
        <div className={`reveal-img-wrap overflow-hidden ${imgStyle}`}>
          <img
            src={value}
            alt=""
            className="reveal-img object-cover w-full h-full"
          />
        </div>
      );
    }

    return (
      <p className="reveal-text max-w-xl text-start text-sm lg:text-[1rem] leading-5 opacity-55">
        {value}
      </p>
    );
  };

  return (
    <section ref={sectionRef} className="relative w-full z-20">
      {/* BACKGROUND IMAGE */}
      <div className="h-[80vh] lg:h-[110vh] w-full relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600"
          className="w-full h-[100vh] lg:h-[160vh] object-cover absolute top-0 left-0 parallex"
          alt=""
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-30 bg-[#FAF8F4] min-h-[200vh] px-5 pt-10 lg:px-10 lg:pt-30 pb-30 "
      >
        <div className="w-full h-full flex flex-col gap-[10vw]">
          {content.map((elem, idx) => (
            <div key={idx} className={`reveal-row flex ${elem.style}`}>
              {renderContent(elem.con1, elem.imgStyle)}
              {renderContent(elem.con2, elem.imgStyle)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info_about_Machines;