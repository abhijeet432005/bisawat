import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BookingSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // header reveal
    gsap.from(".booking-header > *", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".booking-header",
        start: "top 85%",
      },
    });

    // form card reveal
    gsap.from(".booking-card", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".booking-card",
        start: "top 85%",
      },
    });

    // form rows stagger
    gsap.from(".form-row", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".booking-card",
        start: "top 75%",
      },
    });
  }, []);

  const inputClass =
    "w-full bg-white rounded-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 outline-none border border-transparent focus:border-blue-200 transition-colors";

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 px-6">
      {/* Header */}
      <div className="booking-header flex flex-col items-center text-center mb-12">
        <span className="text-xs font-semibold tracking-widest text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full mb-5 uppercase">
          Book Appointment
        </span>
        <h2 className="text-5xl font-semibold text-[#0d1b2a] leading-tight">
          Let's make your smile{" "}
          <span
            className="font-normal italic"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            shine
          </span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm">
          We're not just dental professionals we're smile architects.
        </p>
      </div>

      {/* Form card */}
      <div
        className="booking-card max-w-3xl mx-auto rounded-3xl p-8 pb-10"
        style={{
          background:
            "linear-gradient(160deg, #c8e8f5 0%, #ddf0fa 40%, #eef8fd 100%)",
        }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          {/* Row 1 */}
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                First Name*
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                Last Name*
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                Phone Number*
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                Email Address*
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                Preferred Date*
              </label>
              <input type="date" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#0d1b2a]">
                Preferred Time*
              </label>
              <input type="time" className={inputClass} />
            </div>
          </div>

          {/* Textarea */}
          <div className="form-row flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#0d1b2a]">
              How may we assist you?*
            </label>
            <textarea
              rows={4}
              placeholder="Briefly describe your dental concern"
              className="w-full bg-white rounded-2xl px-5 py-3 text-sm text-gray-600 placeholder-gray-300 outline-none border border-transparent focus:border-blue-200 transition-colors resize-none"
            />
          </div>

          {/* Checkbox */}
          <div className="form-row flex items-center gap-2">
            <input
              type="checkbox"
              id="agree"
              className="w-4 h-4 accent-blue-500 rounded"
            />
            <label htmlFor="agree" className="text-sm text-gray-500">
              I agree to be contacted regarding my appointment.
            </label>
          </div>

          {/* Submit */}
          <div className="form-row flex flex-col items-center gap-3 mt-1">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-semibold text-white px-8 py-3 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #6ab0f5 0%, #3b82f6 60%, #2563eb 100%)",
              }}
            >
              Book Now
              <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">
                📅
              </span>
            </button>
            <p className="text-xs text-gray-400">
              We will confirm your appointment by email or phone within a short
              time.
            </p>
          </div>
        </form>

        {/* Contact footer inside card */}
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
