import TrustNumbers from "../components/TrustNumbers";
import Image_pin from "../Home/Image_pin";
import BeforeAfter from "../components/BeforeAfter";
import ServicesSection from "../Home/ServicesSection";
import FAQSection from "../components/FAQSection";
import FeaturedClinics from "../Home/FeaturedClinics";
import PatientStories from "../Home/PatientStories";
import HeroSection from "../Home/Hero";
import Testimonial from "../Home/Testimonial";
import { useLenis } from "lenis/react";
import { useLayoutEffect } from "react";

const Home = () => {
  const lenis = useLenis();

  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <TrustNumbers />
      <ServicesSection />
      <BeforeAfter
        beforeSrc={
          "https://imgs.search.brave.com/UVwnzY1_Gyeh42brAvQQtVL3btbPg4lawAbp51BMkkE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YW9kZW50aXN0cnku/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzExL1llbGxv/dy1UZWV0aC1DYXVz/ZXMtMTUzNngxMDI0/LndlYnA"
        }
        afterSrc={
          "https://cdn.prod.website-files.com/6941011e592dac3331ac7edc/695626a50b7535cb2ca81c1f_Image%20(1)-p-800.png"
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
