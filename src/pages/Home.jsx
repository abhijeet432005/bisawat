import TrustNumbers from "../components/TrustNumbers";
import Hero from "../Home/Hero";
import Hero_grid_2 from "../Home/Hero_grid_2";
import Image_pin from "../Home/Image_pin";
import BeforeAfter from "../components/BeforeAfter";
import Grid_3 from "../Home/Grid_3";
import ReviewCapsule from "../components/ReviewCapsule";
import ServicesSection from "../Home/ServicesSection";
import FAQSection from "../components/FAQSection";
import BookingSection from "../components/BookingSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <FAQSection />
      <BookingSection />
      <ServicesSection />
      <Hero_grid_2 />
      <Grid_3 />
      <Image_pin />
      <ReviewCapsule />

      <BeforeAfter beforeSrc={"https://cdn.prod.website-files.com/6941011e592dac3331ac7edc/695626bec329e420cee80cb7_Image%20(3)-p-800.png"} afterSrc={"https://cdn.prod.website-files.com/6941011e592dac3331ac7edc/695626a50b7535cb2ca81c1f_Image%20(1)-p-800.png"} />
      <TrustNumbers />
    </div>
  );
};

export default Home;
