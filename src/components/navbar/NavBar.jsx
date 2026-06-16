import { NavLink, useNavigate } from "react-router-dom";
import Btn_Anim_2 from "../common/Btn_Anim_2";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()
  const navRef = useRef(null);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScroll / pageHeight) * 100;

      // background change after 10%
      setScrolled(scrollPercent > 10);

      // hide / show navbar
      if (currentScroll > lastScroll && currentScroll > 50) {
        gsap.to(navRef.current, { y: -100, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power3.out" });
      }

      lastScroll = currentScroll; // ← was commented out, direction never updated
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className={`w-full h-20 flex items-center justify-between fixed top-0 left-0 z-40 p-5 lg:p-10 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div onClick={() => navigate("/")} className="logo cursor-pointer">
        <h1 className={scrolled ? "text-black" : "text-white"}>Bisawat</h1>
      </div>

      <div className={`flex gap-5 ${scrolled ? "text-black" : "text-white"}`}>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "underline underline-offset-4" : ""}
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => isActive ? "underline underline-offset-4" : ""}
        >
          Contact
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => isActive ? "underline underline-offset-4" : ""}
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => isActive ? "underline underline-offset-4" : ""}
        >
          Services
        </NavLink>
      </div>

      <div>
        <Btn_Anim_2 text="Book Now" className="border px-3 py-1 border-red-300" />
      </div>
    </div>
  );
};

export default NavBar;