import TrustNumbers from "../components/TrustNumbers";
import Image_pin from "../Home/Image_pin";
import BeforeAfter from "../components/BeforeAfter";
import ServicesSection from "../Home/ServicesSection";
import FAQSection from "../components/FAQSection";
import FeaturedClinics from "../Home/FeaturedClinics";
import PatientStories from "../Home/PatientStories";
import HeroSection from "../Home/Hero";
import Testimonial from "../Home/Testimonial";
import Seo from "../components/Seo";

const Home = () => {

  return (
    <div className="overflow-hidden">
      <Seo
        title="Trusted Dental Care"
        description="Birawat Dental Studio offers comprehensive dental care — preventive, restorative, and cosmetic treatments designed around you. Book your appointment today."
        path="/"
      />
      <HeroSection />
      <TrustNumbers />
      <ServicesSection />
      <BeforeAfter
        beforeSrc={
          "/image/before.webp"
        }
        afterSrc={
          "/image/after.webp"
        }
      />
      <Testimonial />
      <FeaturedClinics />
      <Image_pin />
      <PatientStories />
      <FAQSection />
    </div>
  );
};

export default Home;