import React from "react";
import Hero from "../components/common/Hero";
import Hero_grid_2 from "../About/Hero_grid_2";
import Grid_3 from "../About/Grid_3";
import TeamSection from "../About/TeamSection";
import Info_about_Machines from "../About/Info_about_Machines";

const About = () => {
  const content = {
    title: (
      <>
        To transform dental care through compassion, <br /> innovation, and education – one healthy smile at a time.
      </>
    ),
    img: "https://cdn.prod.website-files.com/6915c3fd857e510c6b207f71/6936613556691a50fe363462_About.avif",
    heading: (
      <>
        Where Your Smile <br /> is Our Masterpiece
      </>
    ),
    para: "Sets the emotional tone for the entire page. To transform dental care through compassion, innovation, and education",
    text: "Teeth Whitening",
  };
  return (
    <div>
      {/* <Hero /> */}
      <Hero content={content} />
      <Hero_grid_2 />
      <Grid_3 />
      <TeamSection />
      <Info_about_Machines />
    </div>
  );
};

export default About;
