import BookingSection from "../Contact/BookingSection";
import FAQSection from "../components/FAQSection";
import Hero from "../components/common/Hero";

const Contact = () => {
  const content = {
    title: "Contact With Us",
    img: "/image/contact-hero.avif",
    heading: (
      <>
        We're Here to Help <br />
        You Smile
      </>
    ),
    para: "Your smile is more than just a feature—it's a reflection of your confidence, comfort, and well-being. We're committed to making every visit a step toward brighter.",
    text: "Message Us"
  };

  return (
    <>
      <Hero content={content} />
      <BookingSection />
      <FAQSection />
    </>
  );
};

export default Contact;
