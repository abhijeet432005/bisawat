import React from "react";
import Hero from "../Services/Hero";
import ServicesParallax from "../Services/services";
import CareSection from "../Services/CareSection";
import MarqueeSection from "../components/common/MarqueeSection";
import Line from "../components/Line";

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
    <>
      {/* <Hero content={content} className={'h-screen'}/> */}
      <Hero />
      <ServicesParallax />
      <CareSection />
      <Line />
      <CareSection className={"md:flex-row-reverse"}/>
      <Line />
      <CareSection />
      <Line />
      <CareSection className={"md:flex-row-reverse"}/>
      <MarqueeSection />
    </>
  );
};

export default Services;
