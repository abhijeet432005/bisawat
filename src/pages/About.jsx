import React from "react";
import Hero from "../components/common/Hero";
import Grid_3 from "../About/Grid_3";
import TeamSection from "../About/TeamSection";
import MarqueeSection from "../components/common/MarqueeSection";
import FAQSection from "../components/FAQSection";
import QuickFacts from "../About/QuickFacts";

const About = () => {
  const content = {
    // title: (
    //   <>
    //     To transform dental care through compassion, <br /> innovation, and education – one healthy smile at a time.
    //   </>
    // ),
    img: "https://cdn.prod.website-files.com/6915c3fd857e510c6b207f71/6936613556691a50fe363462_About.avif",
    // heading: (
    //   <>
    //     Where Your Smile <br /> is Our Masterpiece
    //   </>
    // ),
    // para: "Sets the emotional tone for the entire page. To transform dental care through compassion, innovation, and education",
    // text: "Teeth Whitening",
  };
  return (
    <div>
      {/* <Hero /> */}
      <Hero content={content} className={'h-[70vh]'}/>
      <QuickFacts />
      {/* <Grid_3 /> */}
      <TeamSection />
      <MarqueeSection />
      <FAQSection />
    </div>
  );
};

export default About;
