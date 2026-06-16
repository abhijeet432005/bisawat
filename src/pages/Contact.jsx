import { useLayoutEffect } from "react";
import BookingSection from "../Contact/BookingSection";
import ContactHero from "../Contact/ContactHero";
import { useLenis } from "lenis/react";
import FAQSection from "../components/FAQSection";

const Contact = () => {
  const lenis = useLenis()

  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [lenis])
  return (
    <>
      <ContactHero />
      <BookingSection />
      <FAQSection />
    </>
  );
};

export default Contact;
