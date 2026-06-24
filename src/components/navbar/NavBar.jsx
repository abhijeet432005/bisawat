import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink, Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  {
    label: "Services",
    to: "/services",
    submenu: [
      { label: "Routine Dental Care", to: "/services#dental", desc: "Cleanings & preventive checkups" },
      { label: "Gynecological Care", to: "/services#gyno", desc: "Annual exams & screenings" },
      { label: "Family Planning & Fertility", to: "/services#fertility", desc: "Counseling & assessments" },
      { label: "Cosmetic Treatments", to: "/services#cosmetic", desc: "Whitening & smile makeovers" },
    ],
  },
];

const NavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  const navRef          = useRef(null);
  const lastScroll       = useRef(0);
  const submenuRef        = useRef(null);
  const wrapperRef          = useRef(null);
  const arrowRef             = useRef(null);
  const closeTimer            = useRef(null);
  const mobileMenuRef           = useRef(null);
  const mobileSubRef              = useRef(null);

  // ── scroll hide/show + bg switch ───────────────────────────
  useGSAP(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = pageHeight > 0 ? (currentScroll / pageHeight) * 100 : 0;

      setScrolled(scrollPercent > 5);

      if (currentScroll > lastScroll.current && currentScroll > 80) {
        gsap.to(navRef.current, { y: -100, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── submenu open/close with buffer so moving mouse to dropdown doesn't close it ──
  const openSubmenu = useCallback(() => {
    clearTimeout(closeTimer.current);
    if (submenuOpen) return;
    setSubmenuOpen(true);

    gsap.set(submenuRef.current, { display: "block", pointerEvents: "auto" });
    gsap.fromTo(submenuRef.current,
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
    );
    gsap.to(arrowRef.current, { rotate: 180, duration: 0.3, ease: "power3.out" });
  }, [submenuOpen]);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      gsap.to(submenuRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(submenuRef.current, { display: "none", pointerEvents: "none" });
          setSubmenuOpen(false);
        },
      });
      gsap.to(arrowRef.current, { rotate: 0, duration: 0.2, ease: "power2.in" });
    }, 150); // small buffer — mouse can travel the gap without closing
  }, []);

  // ── mobile menu ─────────────────────────────────────────────
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobileMenu = useCallback(() => {
    setMobileOpen(true);
    gsap.set(mobileMenuRef.current, { display: "flex" });
    gsap.fromTo(mobileMenuRef.current,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.out" }
    );
    gsap.fromTo(".mobile-nav-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.06, delay: 0.15 }
    );
  }, []);

  const closeMobileMenu = useCallback(() => {
    gsap.to(mobileMenuRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(mobileMenuRef.current, { display: "none" });
        setMobileOpen(false);
        setMobileSubOpen(false);
      },
    });
  }, []);

  const toggleMobileSub = useCallback(() => {
    if (mobileSubOpen) {
      gsap.to(mobileSubRef.current, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
      setMobileSubOpen(false);
    } else {
      setMobileSubOpen(true);
      gsap.set(mobileSubRef.current, { height: "auto", opacity: 1 });
      const h = mobileSubRef.current.offsetHeight;
      gsap.set(mobileSubRef.current, { height: 0, opacity: 0 });
      gsap.to(mobileSubRef.current, { height: h, opacity: 1, duration: 0.4, ease: "power3.inOut" });
    }
  }, [mobileSubOpen]);

  useLayoutEffect(() => {
    if (mobileSubRef.current) gsap.set(mobileSubRef.current, { height: 0, opacity: 0, overflow: "hidden" });
    if (submenuRef.current) gsap.set(submenuRef.current, { display: "none", pointerEvents: "none" });
    if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: "none" });
  }, []);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <>
      <header
        ref={navRef}
        className={`w-full h-20 flex items-center justify-between fixed top-0 left-0 z-40 px-5 lg:px-10 transition-colors duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6ab0f5, #2563eb)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
          </div>
          <span className={`text-lg font-semibold tracking-tight ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}>
            Bisawat
          </span>
        </Link>

        {/* DESKTOP CENTER LINKS */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.submenu ? (
              <div
                key={link.label}
                ref={wrapperRef}
                className="relative"
                onMouseEnter={openSubmenu}
                onMouseLeave={scheduleClose}
              >
                <Link
                  to={link.to}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 ${
                    scrolled ? "text-[#1a1a1a] hover:text-blue-600" : "text-white hover:text-white/80"
                  } ${isServicesActive ? "font-semibold" : ""}`}
                >
                  {link.label}
                  <svg ref={arrowRef} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>

                {/* invisible bridge — closes the gap so mouse never "leaves" the hover zone */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-3" />

                {/* Premium submenu */}
                <div
                  ref={submenuRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl overflow-hidden"
                  style={{
                    minWidth: "320px",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(20px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 0 12px 40px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="py-2">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        className="flex flex-col px-5 py-3 transition-colors hover:bg-black/[0.03] group"
                      >
                        <span className="text-sm font-semibold text-[#1a1a1a] group-hover:text-blue-600 transition-colors">
                          {sub.label}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">{sub.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-2 ${
                    scrolled ? "text-[#1a1a1a] hover:text-blue-600" : "text-white hover:text-white/80"
                  } ${isActive ? "font-semibold underline underline-offset-4" : ""}`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* RIGHT — Book Now (desktop) */}
        <div className="hidden lg:block flex-shrink-0">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-transform active:scale-95"
            style={{ background: "#eaff5e", color: "#1a1a1a" }}
          >
            Book Now
          </Link>
        </div>

        {/* MOBILE — hamburger */}
        <button onClick={openMobileMenu} className="lg:hidden flex flex-col gap-1.5 p-2 flex-shrink-0" aria-label="Open menu">
          <span className={`w-6 h-[2px] ${scrolled ? "bg-[#1a1a1a]" : "bg-white"}`} />
          <span className={`w-6 h-[2px] ${scrolled ? "bg-[#1a1a1a]" : "bg-white"}`} />
        </button>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <div ref={mobileMenuRef} className="fixed inset-0 z-50 bg-white flex-col px-6 py-6" style={{ overflow: "hidden" }}>
        <div className="flex items-center justify-between mb-10">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6ab0f5, #2563eb)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-[#1a1a1a]">BrightSmile</span>
          </Link>
          <button onClick={closeMobileMenu} className="p-2" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to || (link.submenu && location.pathname.startsWith("/services"));
            return link.submenu ? (
              <div key={link.label} className="mobile-nav-item">
                <button
                  onClick={toggleMobileSub}
                  className={`w-full flex items-center justify-between py-4 text-2xl border-b border-gray-100 transition-colors ${
                    isActive ? "text-blue-600 font-semibold" : "text-[#1a1a1a]"
                  }`}
                >
                  {link.label}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    style={{ transform: mobileSubOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div ref={mobileSubRef}>
                  <div className="flex flex-col gap-3 pt-3 pb-2 pl-4">
                    {link.submenu.map((sub) => (
                      <Link key={sub.label} to={sub.to} onClick={closeMobileMenu} className="text-base text-gray-500">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-nav-item py-4 text-2xl border-b border-gray-100 transition-colors ${
                    isActive ? "text-blue-600 font-semibold" : "text-[#1a1a1a]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </div>

        <div className="mobile-nav-item mt-auto">
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="block text-center w-full px-5 py-4 rounded-full text-base font-semibold"
            style={{ background: "#eaff5e", color: "#1a1a1a" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;