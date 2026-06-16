import { useState } from "react";

const navItems = ["Home", "Services", "About", "Contact"];

export default function GlassNav() {
  const [active, setActive] = useState("Home");

  return (
    <nav className="flex items-center gap-1 p-1.5 rounded-full w-fit"
      style={{ background: "rgba(0,0,0,0.04)", border: "0.5px solid rgba(0,0,0,0.08)" }}
    >
      {navItems.map((item) => {
        const isActive = active === item;
        return (
          <button
            key={item}
            onClick={() => setActive(item)}
            className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200"
            style={isActive ? {
              color: "rgba(0,0,0,0.88)",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.9)",
              backdropFilter: "blur(20px) saturate(1.6)",
              boxShadow: "0 1px 0 rgba(255,255,255,1) inset, 0 -1px 0 rgba(0,0,0,0.06) inset, 0 4px 16px rgba(0,0,0,0.10)",
            } : {
              color: "rgba(0,0,0,0.45)",
              border: "1px solid transparent",
            }}
          >
            {isActive && (
              <>
                {/* top shine arc */}
                <span className="absolute inset-x-[10%] top-0 h-[45%] rounded-t-full pointer-events-none"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)" }}
                />
                {/* blue dot */}
                <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 relative -top-px"
                  style={{ background: "#3b82f6", boxShadow: "0 0 6px rgba(59,130,246,0.7)" }}
                />
              </>
            )}
            {item}
          </button>
        );
      })}
    </nav>
  );
}