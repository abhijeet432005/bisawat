import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const images = [
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
  "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600&q=80",
  "https://images.unsplash.com/photo-1576765608866-5b51046452be?w=600&q=80",
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
];

const marqueeImages = [...images, ...images];

const TRACK_DURATION = 15;
const IMG_DRIFT_PX   = 50;
const IMG_SCALE      = 1.35;

const MarqueeSection = () => {
  const trackRef   = useRef(null);
  const imgRefs    = useRef([]);
  const trackTween = useRef(null);
  const imgTweens  = useRef([]);

  useGSAP(() => {
    const track = trackRef.current;
    const getHalfWidth = () => track.scrollWidth / 2;
    let halfWidth = getHalfWidth();

    const startTrack = (fromX = 0) => {
      gsap.set(track, { x: fromX });
      trackTween.current = gsap.to(track, {
        x: () => -halfWidth,
        duration: TRACK_DURATION,
        ease: "none",
        repeat: -1,
      });
    };

    const startImageParallax = () => {
      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        // each image gets a slightly different, non-integer-fraction duration
        // so it never phase-locks with the track loop or with other images
        const duration = TRACK_DURATION * (0.6 + (i % 5) * 0.03);

        imgTweens.current[i] = gsap.fromTo(img,
          { x: -IMG_DRIFT_PX },
          {
            x: IMG_DRIFT_PX,
            duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            // stagger each image's start slightly so the yoyo pivots don't align
            delay: i * 0.15,
          }
        );
      });
    };

    startTrack();
    startImageParallax();

    const handleResize = () => {
      const oldHalfWidth = halfWidth;
      const currentX = gsap.getProperty(track, "x");
      const progress = oldHalfWidth ? Math.abs(currentX) / oldHalfWidth : 0;

      halfWidth = getHalfWidth();
      trackTween.current?.kill();
      startTrack(-progress * halfWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      trackTween.current?.kill();
      imgTweens.current.forEach((t) => t?.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pauseAll = () => {
    trackTween.current?.pause();
    imgTweens.current.forEach((t) => t?.pause());
  };
  const playAll = () => {
    trackTween.current?.play();
    imgTweens.current.forEach((t) => t?.play());
  };

  return (
    <section
      className="w-full py-16 md:py-24 overflow-hidden"
      style={{ background: "#faf8f4" }}
    >
      <div className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] leading-tight">
          Moments of care,<br />
          <span className="font-normal" style={{ fontStyle: "italic" }}>
            captured every day
          </span>
        </h2>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={pauseAll}
        onMouseLeave={playAll}
      >
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 w-max overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {marqueeImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0  lg:rounded-xl overflow-hidden relative"
              style={{
                width: "clamp(300px, 26vw, 380px)",
                height: "clamp(350px, 32vw, 480px)",
              }}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                alt=""
                className="w-full h-full object-cover absolute inset-0 "
                style={{ transform: `scale(${IMG_SCALE})`, willChange: "transform" }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;