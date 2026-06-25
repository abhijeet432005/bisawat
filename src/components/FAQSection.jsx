import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What services are included in my plan?",
    a: "Our plans include routine checkups, cleanings, X-rays, and discounts on major procedures like fillings, crowns, and orthodontics depending on your tier.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book online through our website, call our front desk directly, or use our mobile app to schedule at your convenience.",
  },
  {
    q: "Do you accept emergency visits?",
    a: "Yes, we offer same-day emergency appointments. Call us and we'll do our best to see you within hours.",
  },
  {
    q: "Can I upgrade or change my plan anytime?",
    a: "Absolutely. You can upgrade, downgrade, or switch plans at any time from your account dashboard with no penalty.",
  },
  {
    q: "Are the treatments safe and professional?",
    a: "All treatments are performed by certified dental professionals using the latest sterilized equipment and evidence-based techniques.",
  },
];

const FAQSection = () => {
  const sectionRef  = useRef(null);
  const openRef     = useRef(null); // currently open index
  const bodyRefs    = useRef([]);   // refs to answer body divs
  const iconRefs    = useRef([]);   // refs to + icons

  const toggle = useCallback((i) => {
    const prev = openRef.current;
    const isSame = prev === i;

    // close previously open
    if (prev !== null && bodyRefs.current[prev]) {
      gsap.to(bodyRefs.current[prev], {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(iconRefs.current[prev], {
        rotation: 0,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }

    if (isSame) {
      // clicking same — just close
      openRef.current = null;
      return;
    }

    // open new
    openRef.current = i;
    const body = bodyRefs.current[i];

    // measure natural height
    gsap.set(body, { height: "auto", opacity: 1 });
    const naturalH = body.offsetHeight;
    gsap.set(body, { height: 0, opacity: 0 });

    gsap.to(body, {
      height: naturalH,
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });

    gsap.to(iconRefs.current[i], {
      rotation: 45,
      duration: 0.35,
      ease: "power3.inOut",
    });
  }, []);

  useGSAP(() => {
    // init all bodies closed
    bodyRefs.current.forEach((el) => {
      if (el) gsap.set(el, { height: 0, opacity: 0 });
    });

    gsap.from(".faq-header", {
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".faq-header", start: "top 85%" },
    });

    gsap.from(".faq-item", {
      y: 50, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
    });

    gsap.from(".faq-footer", {
      opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ".faq-footer", start: "top 95%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 px-6">

      <div className="faq-header flex flex-col items-center text-center mb-12">
        <h2 className="text-5xl text-[#0d1b2a] leading-tight capitalize">
          Frequently asked{" "}
          <span className="font-normal font-[italic-font]">
            questions
          </span>
        </h2>
      </div>

      <div className="faq-list max-w-4xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item bg-[#FAFAFA] rounded-2xl overflow-hidden ">

            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-7 py-6 text-left cursor-pointer"
            >
              <span className="text-[#0d1b2a] font-semibold text-base font-[font-4]">
                {faq.q}
              </span>
              <span
                ref={(el) => (iconRefs.current[i] = el)}
                className="ml-4 flex-shrink-0 text-[#0d1b2a]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>

            {/* GSAP-controlled body — no CSS transition */}
            <div
              ref={(el) => (bodyRefs.current[i] = el)}
              style={{ overflow: "hidden" }}
            >
              <p className="px-7 pb-6 text-gray-400 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer max-w-3xl mx-auto mt-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <p className="text-gray-400 text-sm whitespace-nowrap">
          Still have questions? Feel free to{" "}
          <a href="/contact"  className="text-[#0d1b2a] font-bold underline underline-offset-2">
            Book now
          </a>
        </p>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </section>
  );
};

export default FAQSection;