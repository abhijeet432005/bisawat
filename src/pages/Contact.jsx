import BookingSection from "../Contact/BookingSection";
import FAQSection from "../components/FAQSection";
import Seo from "../components/Seo";
import Hero from "../components/common/Hero";

const Contact = () => {
  const content = {
    title: "Contact Us",
    img: "/Doctor/Krunal.webp",
    heading: (
      <>
        Helping You <span className="font-[italic-font]">Smile</span>
      </>
    ),
    text: "Message Us",
  };

  return (
    <>
      <Seo
        title="Contact & Book Appointment"
        description="Get in touch with Birawat Dental Studio or book your appointment online. Visit our clinic or call us — we're here to help you smile with confidence."
        path="/contact"
      />
      <Hero content={content} className={"h-[80vh]"} />
      <BookingSection />
      <FAQSection />
    </>
  );
};

export default Contact;
