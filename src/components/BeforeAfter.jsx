import { useRef, useCallback } from "react";

const BeforeAfter = ({ beforeSrc, afterSrc }) => {
  const wrapRef = useRef(null);
  const afterRef = useRef(null);
  const dividerRef = useRef(null);
  const handleRef = useRef(null);

  const setPos = useCallback((clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    afterRef.current.style.clipPath = `inset(0 0 0 ${p}%)`;
    dividerRef.current.style.left = `${p}%`;
    handleRef.current.style.left = `${p}%`;
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 py-10 md:py-20">
      <div
        ref={wrapRef}
        onMouseMove={(e) => setPos(e.clientX)}
        onTouchMove={(e) => {
          e.preventDefault();
          setPos(e.touches[0].clientX);
        }}
        className="relative w-[90%] md:w-[70%] aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
      >
        <img src={beforeSrc} className="absolute inset-0 w-full h-full object-cover" />
        <img
          ref={afterRef}
          src={afterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        />

        <div
          ref={dividerRef}
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 -translate-x-1/2 pointer-events-none"
          style={{ left: "50%" }}
        />

        <div
          ref={handleRef}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center pointer-events-none"
          style={{ left: "50%" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 3 12 9 6" />
            <polyline points="15 6 21 12 15 18" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="w-[90%] md:w-[70%] flex justify-between items-center gap-4 px-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-10 h-[1px] bg-gray-300 inline-block" />
          Before
        </div>
        <span className="w-full h-[1px] bg-gray-300 inline-block" />
        <div className="flex items-center gap-2 text-sm text-gray-500">
          After
          <span className="w-10 h-[1px] bg-gray-300 inline-block" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;