import BookingSection from "../Contact/BookingSection";
import FAQSection from "../components/FAQSection";
import Hero from "../components/common/Hero";

const Contact = () => {
  const content = {
    title: "Contact Us",
    img: "/image/contact-hero.avif",
    heading: (
      <>
        Helping You <span className="font-[italic-font]">Smile</span>
      </>
    ),
    text: "Message Us"
  };

  return (
    <>
      <Hero content={content} className={"h-[80vh]"}/>
      <BookingSection />
      <FAQSection />
    </>
  );
};

export default Contact;
