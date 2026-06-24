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

const TRACK_DURATION = 22;
const IMG_DRIFT_PX   = 40;
const IMG_SCALE      = 1.2;

const MarqueeSection = () => {
  const trackRef      = useRef(null);
  const imgRefs        = useRef([]);
  const trackTween     = useRef(null);
  const parallaxTween  = useRef(null); // ← single master tween for ALL images
  const halfWidthRef     = useRef(0);
  const resizeTimeout    = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const measure = () => track.scrollWidth / 2;
    halfWidthRef.current = measure();

    const startTrack = (fromX = 0) => {
      gsap.set(track, { x: fromX, force3D: true });
      trackTween.current = gsap.to(track, {
        x: () => -halfWidthRef.current,
        duration: TRACK_DURATION,
        ease: "none",
        repeat: -1,
        force3D: true,
      });
    };

    // ── ONE timeline drives every image's parallax — not N separate tweens ──
    const startParallax = () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      // batch all images into a single tween call — GSAP internally optimizes
      // animating an array together far better than N independent tweens
      tl.fromTo(imgRefs.current,
        { x: -IMG_DRIFT_PX },
        {
          x: IMG_DRIFT_PX,
          duration: TRACK_DURATION * 0.6,
          ease: "sine.inOut",
          stagger: {
            each: 0.12,
            from: "start",
          },
        }
      );
      parallaxTween.current = tl;
    };

    startTrack();
    startParallax();

    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        const oldHalfWidth = halfWidthRef.current;
        const currentX = gsap.getProperty(track, "x");
        const progress = oldHalfWidth ? Math.abs(currentX) / oldHalfWidth : 0;

        trackTween.current?.kill();
        gsap.set(track, { x: 0 });
        halfWidthRef.current = measure();
        startTrack(-progress * halfWidthRef.current);
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      trackTween.current?.kill();
      parallaxTween.current?.kill();
      clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pauseAll = () => {
    trackTween.current?.pause();
    parallaxTween.current?.pause();
  };
  const playAll = () => {
    trackTween.current?.play();
    parallaxTween.current?.play();
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
          className="flex gap-4 md:gap-6 w-max"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {marqueeImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 lg:rounded-xl overflow-hidden relative"
              style={{
                width: "clamp(300px, 26vw, 380px)",
                height: "clamp(350px, 32vw, 480px)",
              }}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el)}
                src={src}
                alt=""
                className="w-full h-full object-cover absolute inset-0"
                style={{
                  // scale baked into a CSS custom property read once — never fights GSAP's x writes
                  "--img-scale": IMG_SCALE,
                  transform: `scale(var(--img-scale))`,
                  willChange: "transform",
                }}
                draggable={false}
                loading={i < 6 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;