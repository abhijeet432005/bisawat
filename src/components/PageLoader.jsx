// components/PageLoader.jsx
import React from "react";

const LETTERS = "Birawat".split("");

const PageLoader = () => (
  <div
    className="w-full min-h-screen flex items-center justify-center"
    style={{ background: "#faf8f4" }}
  >
    <style>{`
      @keyframes letterFade {
        0% { opacity: 0.15; transform: translateY(4px); }
        50% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0.15; transform: translateY(4px); }
      }
      @keyframes lineGrow {
        0% { transform: scaleX(0); opacity: 0; }
        50% { transform: scaleX(1); opacity: 1; }
        100% { transform: scaleX(0); opacity: 0; }
      }
    `}</style>
    <div className="text-center">
      <div>
        {LETTERS.map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "26px",
              letterSpacing: "0.08em",
              color: "#1a1a1a",
              animation: "letterFade 1.8s ease-in-out infinite",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div
        style={{
          width: "64px",
          height: "1px",
          background: "#1a1a1a",
          margin: "18px auto 0",
          transformOrigin: "center",
          animation: "lineGrow 1.8s ease-in-out infinite",
        }}
      />
    </div>
  </div>
);

export default PageLoader;