// MobileMenu.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import Btn_Anim_2 from "../common/Btn_Anim_2";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const socialLinks = [
  { label: "GitHub", link: "https://github.com" },
  { label: "Twitter", link: "https://twitter.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const ACCENT_COLOR = "#5227FF"; // ← active link / socials color
const PANEL_COLORS = ["#1a1a1a", "#5227FF"]; // ← prelayer colors, change as needed

const MobileMenu = forwardRef(({ onToggle }, ref) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const itemRefs = useRef([]);
  const socialsRef = useRef(null);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const textInnerRef = useRef(null);
  const openRef = useRef(false);
  const busyRef = useRef(false);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  // initial states
  useEffect(() => {
    const layers = preLayersRef.current?.querySelectorAll(".sm-prelayer") || [];
    gsap.set([panelRef.current, ...layers], { xPercent: 100 });
    gsap.set(itemRefs.current, { yPercent: 140, rotate: 10 });
    gsap.set(socialsRef.current, { y: 25, opacity: 0 });
    gsap.set(plusHRef.current, { rotate: 0 });
    gsap.set(plusVRef.current, { rotate: 90 });
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = Array.from(
      preLayersRef.current?.querySelectorAll(".sm-prelayer") || [],
    );
    const items = itemRefs.current;
    const socials = socialsRef.current;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    gsap.set(items, { yPercent: 140, rotate: 10 });
    gsap.set(socials, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(
        el,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (items.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        items,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
    }

    if (socials) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      tl.to(
        socials,
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
        socialsStart,
      );
    }

    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    tl.play(0);
    openTlRef.current = tl;
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = Array.from(
      preLayersRef.current?.querySelectorAll(".sm-prelayer") || [],
    );
    const all = [...layers, panel];

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(itemRefs.current, { yPercent: 140, rotate: 10 });
        gsap.set(socialsRef.current, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, []);

  const animateIcon = useCallback((opening) => {
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (opening) {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    onToggle?.(target); // ← tells NavBar whether menu is open

    target ? playOpen() : playClose();
    animateIcon(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateText, onToggle]);

  // allow NavBar to force-close (e.g. on outside click, route change)
  useImperativeHandle(ref, () => ({
    close: () => {
      if (openRef.current) toggleMenu();
    },
    isOpen: () => openRef.current,
  }));

  const handleNavClick = (to) => {
    toggleMenu();
    navigate(to);
  };

  return (
    <>
      {/* toggle button — text cycle + icon morph */}
      <button
        onClick={toggleMenu}
        className={`md:hidden relative inline-flex items-center gap-2 font-medium z-50 ${
          open ? "text-black" : "text-[var(--mm-toggle-color,#fff)]"
        }`}
      >
        <span className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap">
          <span ref={textInnerRef} className="flex flex-col leading-none">
            {textLines.map((l, i) => (
              <span key={i} className="block h-[1em] leading-none">
                {l}
              </span>
            ))}
          </span>
        </span>

        <span className="relative w-[14px] h-[14px] inline-flex items-center justify-center">
          <span
            ref={plusHRef}
            className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded -translate-x-1/2 -translate-y-1/2"
            style={{ transformOrigin: "50% 50%" }}
          />
          <span
            ref={plusVRef}
            className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded -translate-x-1/2 -translate-y-1/2"
            style={{ transformOrigin: "50% 50%" }}
          />
        </span>
      </button>

      {/* prelayers — depth color blocks */}
      <div
        ref={preLayersRef}
        className="md:hidden fixed top-0 right-0 bottom-0 w-full pointer-events-none z-40"
      >
        {PANEL_COLORS.map((c, i) => (
          <div
            key={i}
            className="sm-prelayer absolute top-0 right-0 h-full w-full"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* panel */}
      <aside
        ref={panelRef}
        className="md:hidden fixed top-0 right-0 h-full w-full bg-white flex flex-col p-[6em_2em_2em_2em] z-40"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map(({ to, label }, idx) => {
            const isActive = location.pathname === to;
            return (
              <li key={to} className="relative overflow-hidden leading-none">
                <button
                  onClick={() => handleNavClick(to)}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  className="relative font-semibold text-[3.5rem] leading-none tracking-[-2px] uppercase inline-block"
                  style={{
                    transformOrigin: "50% 100%",
                    color: isActive ? ACCENT_COLOR : "#000",
                  }}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto" />

        {/* socials */}
        <div ref={socialsRef} className="flex flex-col gap-3 pt-8">
          <h3 className="text-base font-medium" style={{ color: ACCENT_COLOR }}>
            Socials
          </h3>
          <ul className="flex flex-row items-center gap-4 flex-wrap">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-black no-underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;