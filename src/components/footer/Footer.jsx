import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  

  return (
    <footer className="w-full bg-[#1a1a1a] text-white flex justify-center items-center">
      <div className="w-[90%] md:w-[95%]">
        {/* ── TOP ── */}
        <div className=" mx-auto pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">
            {/* Logo + tagline */}
            <div className="md:w-[28%]">
              <div className="flex items-center gap-2 mb-4">
                <img src="/Logo.webp" alt="" className="w-fit h-15" />
              </div>
              <p className="text-sm text-white/40 leading-relaxed max-w-[220px]">
                World-class dental care you can trust. Your smile is our
                mission.
              </p>
            </div>

            {/* Links grid */}
            <div className="flex flex-col sm:flex-row gap-10 md:gap-30">
              {/* Website */}
              <div>
                <p className="text-sm font-semibold text-white mb-4">Company</p>
                <ul className="flex flex-col gap-3">
                  {["Home", "About Us", "Services", "Blog", "Contact"].map(
                    (l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                        >
                          {l}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm font-semibold text-white mb-4">Service</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "General Dentistry",
                    "Cosmetic Dentistry",
                    "Restorative Dentistry",
                    "Orthodontics",
                    "Pediatric Dentistry",
                  ].map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                      >
                        {l}
                      </a>
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
        <div className=" mx-auto">
          <div className="h-px bg-white/8" />
        </div>

        {/* ── MIDDLE — newsletter + image ── */}
        <div className="mx-auto py-10">
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10"
            style={{ background: "#242424" }}
          >
            {/* Left — text + input */}
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

            {/* Right — image */}
            <div className="w-full md:w-[38%] h-[220px] md:h-[200px] rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80"
                alt="Dental treatment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className=" mx-auto pb-8">
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
              <a href="#" className="hover:text-white/60 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
