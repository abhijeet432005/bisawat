import { useEffect, useRef } from "react";
import gsap from "gsap";

const Btn_Anim_2 = ({ text = "Click Me", className = "" , link = "#"}) => {
  const textRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(
      textRef.current,
      {
        yPercent: -50,
        duration: 0.4,
        ease: "power2.out",
      },
      0,
    );
  }, []);

  return (
    <button
    onClick={() => (window.location.href = link)}
      onMouseEnter={() => tl.current.play()}
      onMouseLeave={() => tl.current.reverse()}
      className={`cursor-pointer relative rounded-full font-medium overflow-hidden  text-white ${className}`}
    >
      {/* TEXT */}
      <div className="relative h-[1.5rem] overflow-hidden">
        <div ref={textRef} className="flex flex-col">
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </button>
  );
};

export default Btn_Anim_2;
