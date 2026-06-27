import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const companyLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
  ];

  const serviceLinks = [
    { label: "Preventive Care", to: "/services#preventive" },
    { label: "Restorative Dentistry", to: "/services#restorative" },
    { label: "Esthetic Dentistry", to: "/services#esthetic" },
    { label: "Beyond the Smile", to: "/services#beyond" },
  ];

  return (
    <footer className="w-full bg-[#1a1a1a] text-white flex justify-center items-center">
      <div className="w-[90%] md:w-[95%]">
        {/* ── TOP ── */}
        <div className="mx-auto pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">
            {/* Logo + tagline */}
            <div className="md:w-[28%]">
              <div className="flex items-center gap-2 mb-4">
                <Link to="/">
                  <img src="/Logo.webp" alt="" className="w-fit h-15" />
                </Link>
              </div>
              <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
                World-class dental care you can trust. Your smile is our
                mission.
              </p>
            </div>

            {/* Links grid */}
            <div className="flex flex-col sm:flex-row gap-10 md:gap-30">
              {/* Company */}
              <div>
                <p className="text-sm font-semibold text-white mb-4">Company</p>
                <ul className="flex flex-col gap-3">
                  {companyLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm font-semibold text-white mb-4">Service</p>
                <ul className="flex flex-col gap-3">
                  {serviceLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow */}
              <div>
                <p className="text-sm font-semibold text-white mb-4">
                  Follow Us
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    { name: "Facebook", href: "#" },
                    { name: "Instagram", href: "#" },
                    { name: "X", href: "#" },
                    { name: "YouTube", href: "#" },
                  ].map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                      >
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="mx-auto">
          <div className="h-px bg-white/8" />
        </div>

        {/* ── MIDDLE — newsletter + image ── */}
        <div className="mx-auto py-10">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8"
            style={{ background: "#242424" }}
          >
            <div className="flex flex-col gap-5 w-full md:w-[55%] z-10">
              <div>
                <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
                  Newsletter
                </p>
                <h3 className="text-2xl md:text-3xl leading-snug">
                  Get Exclusive Dental{" "}
                  <span
                    className="font-[italic-font] font-normal"
                    style={{ color: "#ffff" }}
                  >
                    Offers,
                  </span>
                </h3>
                <p className="text-sm text-white/40 mt-2">
                  Subscribe for tips, discounts, and clinic updates.
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 w-full max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/8 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-colors"
                />
                <button className="w-fit bg-white text-[#1a1a1a] text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="w-full md:w-[38%] h-[220px] md:h-[200px] rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/Clinic/clinic8.webp"
                alt="Dental treatment at Birawat Dental Studio"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="mx-auto pb-8">
          <div className="h-px bg-white/8 mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>
              © {new Date().getFullYear()} BrightSmile Dental. All rights
              reserved.
            </p>
            <div className="flex items-center gap-1">
              <span>Designed & developed by</span>
              <a
                href="https://thevyu.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-white transition-colors font-medium ml-1"
              >
                The Vyu
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy-policy"
                className="hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white/60 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
