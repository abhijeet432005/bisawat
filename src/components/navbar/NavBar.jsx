// NavBar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import Btn_Anim_2 from "../common/Btn_Anim_2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import MobileMenu from "../Mobile Menu/MobileMenu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ← reported by MobileMenu
  const navigate = useNavigate();

  const navRef = useRef(null);
  const lastScrollRef = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        pageHeight > 0 ? (currentScroll / pageHeight) * 100 : 0;
      setScrolled(scrollPercent > 10);

      if (!menuOpenRef.current) {
        if (currentScroll > lastScrollRef.current && currentScroll > 50) {
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.4,
            ease: "power3.out",
          });
        } else {
          gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
        }
      }
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className={`w-full h-20 flex items-center justify-between fixed top-0 left-0 z-50 p-5 lg:p-10 transition-colors duration-300 ${
        scrolled
          ? menuOpen
            ? "bg-white"
            : "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div onClick={() => navigate("/")} className="logo cursor-pointer z-99">
        <h1 className={scrolled ? "text-black" : "text-white"}>Bisawat</h1>
      </div>

      <div
        className={`hidden md:flex gap-5 ${scrolled ? "text-black" : "text-white"}`}
      >
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : ""
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:block">
        <Btn_Anim_2
          text="Book Now"
          className="border px-3 py-1 border-red-300"
        />
      </div>

      <MobileMenu onToggle={setMenuOpen} />
    </div>
  );
};

export default NavBar;