import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  "Teeth Whitening",
  "Dental Implants",
  "Orthodontics",
  "Emergency Care",
  "Root Canal",
  "Teeth Cleaning",
  "Other",
];

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  message: "",
  agree: false,
};

// ── from .env, never hardcoded ──
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const BookingSection = () => {
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const toggleProblem = (p) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!/^[\d\s()+-]{7,}$/.test(form.phone))
      next.phone = "Enter a valid phone number";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.date) next.date = "Required";
    if (!form.time) next.time = "Required";
    if (!form.message.trim()) next.message = "Please describe your concern";
    if (!form.agree) next.agree = "You must agree to be contacted";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = sectionRef.current?.querySelector(`[name="${firstErrorKey}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        gsap.fromTo(
          el,
          { x: -6 },
          { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" },
        );
      }
      return;
    }

    setStatus("submitting");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          message: form.message,
          concerns: selected.join(", ") || "None specified",
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setForm(initialForm);
      setSelected([]);
    } catch (err) {
      console.error("Booking submission failed:", err);
      setStatus("error");
    }
  };

  useGSAP(() => {
    gsap.from(".booking-header > *", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: { trigger: ".booking-header", start: "top 85%" },
    });
    gsap.from(".booking-card", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".booking-card", start: "top 85%" },
    });
    gsap.from(".form-row", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: ".booking-card", start: "top 75%" },
    });
  }, []);

  const inputClass = (field) =>
    `w-full bg-white rounded-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 outline-none border transition-colors ${
      errors[field]
        ? "border-red-300 focus:border-red-400"
        : "border-transparent focus:border-blue-200"
    }`;

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 px-6">
      <div className="booking-header flex flex-col items-center text-center mb-12">
        <h2 className="text-5xl capitalize text-[#0d1b2a] leading-tight">
          Let's make your smile{" "}
          <span className="font-normal font-[italic-font]">shine</span>
        </h2>
      </div>

      <div className="booking-card max-w-5xl mx-auto rounded-3xl p-8 pb-10 bg-gray-100">
        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-16 gap-3">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#0d1b2a]">
              Appointment request sent
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              We'll confirm your appointment by email or phone within a short
              time.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm font-semibold text-blue-600 underline underline-offset-2"
            >
              Book another appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className={inputClass("firstName")}
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className={inputClass("lastName")}
                />
                {errors.lastName && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.phone}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  Preferred Date*
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass("date")}
                />
                {errors.date && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.date}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#0d1b2a]">
                  Preferred Time*
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={inputClass("time")}
                />
                {errors.time && (
                  <span className="text-xs text-red-500 px-2">
                    {errors.time}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                How may we assist you?*
              </label>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Briefly describe your dental concern"
                className={`w-full bg-white rounded-2xl px-5 py-3 text-sm text-gray-600 placeholder-gray-300 outline-none border transition-colors resize-none ${
                  errors.message
                    ? "border-red-300 focus:border-red-400"
                    : "border-transparent focus:border-blue-200"
                }`}
              />
              {errors.message && (
                <span className="text-xs text-red-500 px-2">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="form-row flex flex-col gap-3">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                What's your concern?
              </label>
              <div className="flex flex-wrap gap-2">
                {problems.map((p) => {
                  const isSelected = selected.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleProblem(p)}
                      className="relative px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 overflow-hidden"
                      style={{
                        background: isSelected
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.45)",
                        color: isSelected ? "#1d4ed8" : "#64748b",
                        border: isSelected
                          ? "1px solid rgba(59,130,246,0.4)"
                          : "1px solid rgba(255,255,255,0.6)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        boxShadow: isSelected
                          ? "0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 16px rgba(59,130,246,0.15), 0 1px 4px rgba(0,0,0,0.06)"
                          : "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 3px rgba(0,0,0,0.04)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      <span
                        className="absolute inset-x-[10%] top-0 h-[45%] rounded-t-full pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
                        }}
                      />
                      <span className="relative flex items-center gap-1.5">
                        {isSelected && (
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="#1d4ed8"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {p}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-row flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-500 rounded"
                />
                <label htmlFor="agree" className="text-sm text-gray-500">
                  I agree to be contacted regarding my appointment.
                </label>
              </div>
              {errors.agree && (
                <span className="text-xs text-red-500 px-2">
                  {errors.agree}
                </span>
              )}
            </div>

            <div className="form-row flex flex-col items-center gap-3 mt-1">
              {status === "error" && (
                <p className="text-sm text-red-500 text-center">
                  Something went wrong sending your request. Please try again.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex items-center gap-2 text-sm font-semibold text-white px-8 py-3 rounded-full transition-opacity disabled:opacity-60"
                style={{ background: "var(--btn-color)" }}
              >
                {status === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Book Now"
                )}
              </button>
              <p className="text-xs text-gray-400">
                We will confirm your appointment by email or phone within a
                short time.
              </p>
            </div>
          </form>
        )}

        <div className="form-row mt-8 pt-6 border-t border-white/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#0d1b2a] leading-relaxed text-center md:text-left">
            5670 Plaza Blvd Suite 404,
            <br />
            Greenwood Village, CO 80111
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <div className="h-px flex-1 md:flex-none md:w-10 bg-[#0d1b2a]/20" />
            <span className="text-sm font-semibold text-[#0d1b2a] whitespace-nowrap">
              Contact us
            </span>
            <div className="h-px flex-1 md:flex-none md:w-10 bg-[#0d1b2a]/20" />
          </div>
          <div className="text-xs text-[#0d1b2a] text-center md:text-right leading-relaxed">
            (720) 620-5248
            <br />
            info@brighterdental.com
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
