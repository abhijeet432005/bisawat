// pages/NotFound.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Seo from "../components/Seo";

const NotFound = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      .fromTo(
        ".notfound-404",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
        0
      )
      .fromTo(
        ".notfound-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.4
      )
      .fromTo(
        ".notfound-cta",
        { y: 16, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        0.6
      )
      .fromTo(
        ".notfound-decor",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" },
        0.2
      );

    // Subtle floating loop on decorative shapes
    gsap.to(".notfound-decor-1", {
      y: -16,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".notfound-decor-2", {
      y: 14,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });
  }, { scope: containerRef });

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved. Return to Birawat Dental Studio's homepage to continue exploring our dental services."
        path="/404"
      />
      <section
        ref={containerRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{ background: "#faf8f4" }}
      >
        {/* Decorative floating shapes */}
        <div
          className="notfound-decor notfound-decor-1 absolute rounded-full"
          style={{
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%)",
            top: "10%",
            left: "8%",
          }}
        />
        <div
          className="notfound-decor notfound-decor-2 absolute rounded-full"
          style={{
            width: "220px",
            height: "220px",
            background: "radial-gradient(circle, rgba(0,0,0,0.03), transparent 70%)",
            bottom: "12%",
            right: "10%",
          }}
        />

        <h1
          className="notfound-404 relative font-bold leading-none mb-4"
          style={{
            fontSize: "clamp(4rem, 14vw, 9rem)",
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </h1>

        <p className="notfound-desc relative text-gray-500 mb-10 max-w-sm text-base md:text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="notfound-cta relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-shadow"
          style={{ background: "var(--btn-color)" }}
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
        >
          Back to Home
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </section>
    </>
  );
};

export default NotFound;