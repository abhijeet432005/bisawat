const ReviewCapsule = () => {
  return (
    <div className="w-full flex justify-center items-center py-12"
        style={{ background: "radial-gradient(ellipse 80% 60% at center, #e8f0fe 0%, #f5f8ff 50%, #ffffff 100%)" }}
    >
      {/* Outer glow wrapper */}
      <div
        className="relative w-4xs  md:w-2xl rounded-full"
        style={{ filter: "drop-shadow(0 0 32px rgba(66,133,244,0.45))" }}
      >
        {/* Pill */}
        <div
          className="relative flex items-center justify-between rounded-full px-2 py-2 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #5b9cf6 0%, #3b82f6 40%, #2563eb 100%)",
            minHeight: "60px",
          }}
        >
          {/* Noise texture overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" style={{ mixBlendMode: "overlay" }}>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>

          {/* Subtle inner highlight at top */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }}
          />

          {/* Text */}
          <span className="text-white font-bold text-sm  md:text-lg relative z-10 tracking-tight pl-2">
            4.9/5 Star rating on Google reviews
          </span>

          {/* Google badge */}
          <div
            className="relative z-10 bg-white rounded-full flex flex-col items-center justify-center px-4 py-2 ml-6 flex-shrink-0"
            style={{
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              minWidth: "120px",
            }}
          >
            <span className="font-semibold tracking-tight" style={{ fontSize: "18px", lineHeight: 1 }}>
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </span>
            <div className="flex gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FBBC04">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewCapsule;