import React, {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink, Link, useLocation } from "react-router-dom";

const services = [
  {
    label: "Preventive Care",
    to: "/services#preventive",
    image:
      "/random/4.webp",
  },
  {
    label: "Restorative Dentistry",
    to: "/services#restorative",
    image:
      "/random/5.webp",
  },
  {
    label: "Esthetic Dentistry",
    to: "/services#esthetic",
    image:
      "/random/14.webp",
  },
  {
    label: "Beyond the Smile",
    to: "/services#beyond",
    image:
        "/random/6.webp",
  },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const BG_SWITCH_PX = 100;
const HIDE_AFTER_PX = 500;
const MIN_DELTA = 8;

const NavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  const navRef = useRef(null);
  const navInnerRef = useRef(null);
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const xIconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileSubRef = useRef(null);
  const mobileSubIconRef = useRef(null);

  const lastScroll = useRef(0);
  const navHidden = useRef(false);
  const rafId = useRef(null);
  const wasScrolled = useRef(false);

  // pages where nav text should always render dark, regardless of scroll/transparency state
  const forceDarkText =
    location.pathname.startsWith("/about") ||
    location.pathname.startsWith("/services");

  const useDarkText = scrolled || dropdownOpen || forceDarkText;

  // ── scroll hide/show + smooth bg/shape transition ──────────
  useGSAP(() => {
    const measure = () => {
      const currentScroll = Math.max(0, window.scrollY);
      const delta = currentScroll - lastScroll.current;
      const isScrolled = currentScroll > BG_SWITCH_PX;

      setScrolled(isScrolled);

      if (isScrolled !== wasScrolled.current) {
        wasScrolled.current = isScrolled;

        if (isScrolled) {
          gsap.to(navRef.current, {
            padding: "14px 20px",
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(navInnerRef.current, {
            maxWidth: "72rem",
            borderRadius: "9999px",
            paddingLeft: "24px",
            paddingRight: "24px",
            backgroundColor: "rgba(255,255,255,0.72)",
            borderColor: "rgba(255,255,255,0.6)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 32px rgba(13,27,42,0.08)",
            duration: 0.6,
            ease: "power3.out",
          });
        } else {
          gsap.to(navRef.current, {
            padding: "0px 20px",
            duration: 0.5,
            ease: "power3.out",
          });
          gsap.to(navInnerRef.current, {
            maxWidth: "100%",
            borderRadius: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            backgroundColor: "rgba(255,255,255,0)",
            borderColor: "rgba(255,255,255,0)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0) inset, 0 0px 0px rgba(13,27,42,0)",
            duration: 0.6,
            ease: "power3.out",
          });
        }
      }

      if (!dropdownOpen && !mobileOpen) {
        if (currentScroll <= HIDE_AFTER_PX) {
          if (navHidden.current) {
            navHidden.current = false;
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        } else if (Math.abs(delta) > MIN_DELTA) {
          if (delta > 0 && !navHidden.current) {
            navHidden.current = true;
            gsap.to(navRef.current, {
              y: -100,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else if (delta < 0 && navHidden.current) {
            navHidden.current = false;
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          lastScroll.current = currentScroll;
        }
      }

      if (currentScroll <= HIDE_AFTER_PX) {
        lastScroll.current = currentScroll;
      }

      rafId.current = null;
    };

    const handleScroll = () => {
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(measure);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [dropdownOpen, mobileOpen]);

  // ── init hidden states ───────────────────────────────────────
  useLayoutEffect(() => {
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, {
        display: "none",
        clipPath: "inset(0% 0% 100% 0%)",
      });
    }
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { display: "none", opacity: 0 });
    }
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, {
        display: "none",
        clipPath: "inset(0% 0% 100% 0%)",
      });
    }
    if (mobileSubRef.current) {
      gsap.set(mobileSubRef.current, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      });
    }
    if (navInnerRef.current) {
      gsap.set(navInnerRef.current, {
        maxWidth: "100%",
        borderRadius: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "rgba(255,255,255,0)",
      });
    }
  }, []);

  // ── desktop services dropdown ──────────────────────────────
  const openDropdown = useCallback(() => {
    setDropdownOpen(true);

    gsap.set(overlayRef.current, { display: "block" });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.set(dropdownRef.current, { display: "block" });
    gsap.fromTo(
      dropdownRef.current,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power4.out" },
    );

    gsap.fromTo(
      ".service-item",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
      },
    );

    gsap.to(xIconRef.current, {
      rotate: 90,
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const closeDropdown = useCallback(() => {
    gsap.to(dropdownRef.current, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(dropdownRef.current, { display: "none" });
        setDropdownOpen(false);
      },
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
    });

    gsap.to(xIconRef.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power3.inOut",
    });
  }, []);

  const toggleDropdown = useCallback(() => {
    dropdownOpen ? closeDropdown() : openDropdown();
  }, [dropdownOpen, openDropdown, closeDropdown]);

  // ── mobile fullscreen menu ──────────────────────────────────
  const openMobileMenu = useCallback(() => {
    setMobileOpen(true);
    gsap.set(mobileMenuRef.current, { display: "flex" });
    gsap.fromTo(
      mobileMenuRef.current,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power4.out" },
    );
    gsap.fromTo(
      ".mobile-nav-item",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.15,
      },
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
        gsap.set(mobileSubRef.current, { height: 0, opacity: 0 });
        gsap.set(mobileSubIconRef.current, { rotate: 0 });
      },
    });
  }, []);

  // ── mobile services sub-accordion ──────────────────────────
  const toggleMobileSub = useCallback(() => {
    if (mobileSubOpen) {
      gsap.to(mobileSubRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(mobileSubIconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power3.inOut",
      });
      setMobileSubOpen(false);
    } else {
      setMobileSubOpen(true);
      gsap.set(mobileSubRef.current, { height: "auto", opacity: 1 });
      const h = mobileSubRef.current.offsetHeight;
      gsap.set(mobileSubRef.current, { height: 0, opacity: 0 });
      gsap.to(mobileSubRef.current, {
        height: h,
        opacity: 1,
        duration: 0.45,
        ease: "power3.inOut",
      });
      gsap.to(mobileSubIconRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [mobileSubOpen]);

  useEffect(() => {
    if (dropdownOpen) closeDropdown();
    if (mobileOpen) closeMobileMenu();
    lastScroll.current = window.scrollY;
  }, [location.pathname]);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <>
      <header
        ref={navRef}
        className="w-full fixed top-0 left-0 z-40"
        style={{ padding: "0px 30px", willChange: "transform, padding" }}
      >
        <div
          ref={navInnerRef}
          className={`w-full h-16 flex items-center justify-between mx-auto border ${dropdownOpen ? "blur-md" : ""}`}
          style={{
            willChange:
              "max-width, border-radius, padding, background-color, box-shadow",
            backdropFilter: scrolled ? "blur(20px) saturate(1.6)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(1.6)"
              : "none",
          }}
        >
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => dropdownOpen && closeDropdown()}
          >
            <img src="/Logo.webp" alt="" className=" max-w-30 md:max-w-35 h-8 md:h-11" />
          </Link>

          {/* DESKTOP CENTER LINKS */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="flex items-center gap-1.5 py-2"
                >
                  <NavLink
                    to={link.to}
                    onClick={() => dropdownOpen && closeDropdown()}
                    className={({ isActive }) =>
                      `text-base font-medium transition-colors duration-500 ${
                        useDarkText
                          ? "text-[#1a1a1a] hover:text-blue-600"
                          : "text-white hover:text-white/80"
                      } ${isActive ? "text-blue-600" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  <button
                    onClick={toggleDropdown}
                    aria-label="Toggle services menu"
                    className={`transition-colors duration-500 cursor-pointer ${
                      useDarkText
                        ? "text-[#1a1a1a] hover:text-blue-600"
                        : "text-white hover:text-white/80"
                    } ${isServicesActive ? "text-blue-600" : ""}`}
                  >
                    <svg
                      ref={xIconRef}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => dropdownOpen && closeDropdown()}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-500 py-2 ${
                      useDarkText
                        ? "text-[#1a1a1a] hover:text-blue-600"
                        : "text-white hover:text-white/80"
                    } ${isActive ? "text-blue-600" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* RIGHT — Book Now */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              to="/contact"
              onClick={() => dropdownOpen && closeDropdown()}
              className="px-5 py-3 rounded-full text-sm font-semibold transition-transform active:scale-95 bg-[var(--btn-color)]"
              style={{ color: "#fff" }}
            >
              Book Now
            </Link>
          </div>

          {/* MOBILE hamburger */}
          <button
            onClick={openMobileMenu}
            className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0"
            aria-label="Open menu"
          >
            <span
              className={`w-6 h-[2px] transition-colors duration-500 ${useDarkText ? "bg-[#1a1a1a]" : "bg-white"}`}
            />
            <span
              className={`w-6 h-[2px] transition-colors duration-500 ${useDarkText ? "bg-[#1a1a1a]" : "bg-white"}`}
            />
          </button>
        </div>
      </header>

      {/* Background dim overlay — desktop dropdown */}
      <div
        ref={overlayRef}
        onClick={closeDropdown}
        className="fixed inset-0 z-30"
        style={{ background: "rgba(0,0,0,0.4)" }}
      />

      {/* DESKTOP DROPDOWN */}
      <div
        ref={dropdownRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-[60%] rounded-b-[2rem] overflow-hidden"
        style={{ background: "#ececec", willChange: "clip-path" }}
      >
        <div className="px-10 py-10">
          <button
            onClick={closeDropdown}
            className="flex items-center gap-2 text-lg text-[#1a1a1a] mb-8"
          >
            Services
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                onClick={closeDropdown}
                className="service-item flex flex-col group"
              >
                <div
                  className="w-full rounded-2xl overflow-hidden mb-4"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={s.image}
                    alt={s.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base text-[#1a1a1a] font-medium">
                  {s.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-white flex-col px-6 py-3 overflow-y-auto"
        style={{ overflowX: "hidden" }}
      >
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <img src="/Logo.webp" alt="" className="max-w-30 h-8" />
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-2"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="mobile-nav-item">
                <div className="w-full flex items-center justify-between py-4 border-b border-gray-100">
                  <NavLink
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `text-2xl transition-colors ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-[#1a1a1a]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                  <button
                    onClick={toggleMobileSub}
                    aria-label="Toggle services submenu"
                    className={`p-1 transition-colors ${
                      isServicesActive ? "text-blue-600" : "text-[#1a1a1a]"
                    }`}
                  >
                    <svg
                      ref={mobileSubIconRef}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>

                <div ref={mobileSubRef}>
                  <div className="grid grid-cols-1 gap-4 pt-4 pb-3 pl-3">
                    {services.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        onClick={closeMobileMenu}
                        className="flex flex-col"
                      >
                        <p className="text-sm text-[#1a1a1a] font-medium">
                          {s.label}
                        </p>
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
            ),
          )}
        </div>

        <div className="mobile-nav-item mt-auto">
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="block text-center w-full px-5 py-4 rounded-full text-base font-semibold"
            style={{ background: "var(--btn-color)", color: "#1a1a1a" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
