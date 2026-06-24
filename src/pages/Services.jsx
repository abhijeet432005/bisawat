import React from "react";
import Hero from "../components/common/Hero";
import ServicesParallax from "../Services/services";
import CareSection from "../Services/CareSection";
import MarqueeSection from "../Services/MarqueeSection";

const Services = () => {
  const content = {
    title: (
      <>
        What’s the best way to <br /> whiten my teeth?
      </>
    ),
    img: "https://cdn.prod.website-files.com/6915c3fd857e510c6b207f71/6936613540442f25e9d35b0d_Services.avif",
    heading: (
      <>
        Care for a Healthy, <br /> Confident Smile
      </>
    ),
    para: "From preventive checkups to advanced treatments, our dental services are designed to keep your teeth healthy, your smile bright, and your confidence high.",
    text: "Teeth Whitening",
  };

  return (
    <div style={{ background: "#faf8f4" }} className="w-full min-h-screen">
      <Hero content={content} />
      <ServicesParallax />
      <CareSection />
      <MarqueeSection />
    </div>
  );
};

export default Services;
