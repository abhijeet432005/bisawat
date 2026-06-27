import TeamSection from "../About/TeamSection";
import MarqueeSection from "../components/common/MarqueeSection";
import FAQSection from "../components/FAQSection";
import QuickFacts from "../About/QuickFacts";
import Seo from "../components/Seo";

const About = () => {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Birawat Dental Studio's mission, experienced team, and commitment to personalized, trustworthy dental care for every patient."
        path="/about"
      />
      <QuickFacts />
      <TeamSection />
      <MarqueeSection />
      <FAQSection />
    </>
  );
};

export default About;
