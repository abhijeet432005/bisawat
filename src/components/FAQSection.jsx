import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

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
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(null);

  useGSAP(() => {
    // header reveal
    gsap.from(".faq-header", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".faq-header",
        start: "top 85%",
      },
    });

    // each item reveals with stagger
    gsap.from(".faq-item", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".faq-list",
        start: "top 80%",
      },
    });

    // footer line + text
    gsap.from(".faq-footer", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-footer",
        start: "top 95%",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 px-6">
      {/* Header */}
      <div className="faq-header flex flex-col items-center text-center mb-12">
        <span className="text-xs font-semibold tracking-widest text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full mb-5 uppercase">
          FAQs
        </span>
        <h2 className="text-5xl font-semibold text-[#0d1b2a] leading-tight">
          Frequently asked{" "}
          <span
            className="font-normal italic"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            questions
          </span>
        </h2>
      </div>

      {/* FAQ list */}
      <div className="faq-list max-w-4xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="faq-item bg-[#FAFAFA] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-7 py-6 text-left"
            >
              <span className="text-[#0d1b2a] font-semibold text-base">
                {faq.q}
              </span>
              <span
                className="ml-4 flex-shrink-0 text-[#0d1b2a] transition-transform duration-300"
                style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>

            {/* Answer — smooth expand */}
            <div
              className="overflow-hidden transition-all duration-400 ease-in-out"
              style={{ maxHeight: open === i ? "200px" : "0px" }}
            >
              <p className="px-7 pb-6 text-gray-400 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="faq-footer max-w-3xl mx-auto mt-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <p className="text-gray-400 text-sm whitespace-nowrap">
          Still have questions? Feel free to{" "}
          <a href="#" className="text-[#0d1b2a] font-bold underline underline-offset-2">
            Book now
          </a>
        </p>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </section>
  );
};

export default FAQSection;