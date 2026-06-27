import React from "react";
import Hero from "../Services/Hero";
import ServicesParallax from "../Services/services";
import CareSection from "../Services/CareSection";
import MarqueeSection from "../components/common/MarqueeSection";
import Line from "../components/Line";
import Seo from "../components/Seo";

const CareSections = [
  {
    DEFAULT_IMAGE: "/marquee/5.webp",

    heading: "Preventive Care",

    items: [
      {
        title: "Routine Checkups & Cleanings",
        description:
          "Regular dental exams and professional cleanings help prevent cavities, gum disease, and other oral health issues before they become serious.",
        image: "/Clinic/clinic1.webp",
        bigImage: "/Clinic/clinic1.webp",
      },
      {
        title: "Digital X-Rays",
        description:
          "Advanced digital imaging allows for accurate diagnosis while using minimal radiation, helping detect hidden dental concerns early.",
        image: "/Clinic/clinic5.webp",
        bigImage: "/Clinic/clinic5.webp",
      },
      {
        title: "Fluoride Treatments",
        description:
          "Strengthen tooth enamel and reduce the risk of cavities with quick, safe, and effective fluoride applications.",
        image: "/Clinic/clinic3.webp",
        bigImage: "/Clinic/clinic3.webp",
      },
      {
        title: "Gum Disease Screening",
        description:
          "Routine periodontal evaluations help identify early signs of gum disease and keep your gums healthy for the long term.",
        image: "/marquee/5.webp",
        bigImage: "/marquee/5.webp",
      },
    ],
  },

  {
    DEFAULT_IMAGE: "/Clinic/clinic6.webp",

    heading: "Restorative Dentistry",

    items: [
      {
        title: "Tooth-Colored Fillings",
        description:
          "Restore decayed or damaged teeth with durable, natural-looking fillings that blend seamlessly with your smile.",
        image: "/random/1.webp",
        bigImage: "/random/1.webp",
      },
      {
        title: "Crowns & Bridges",
        description:
          "Repair damaged teeth or replace missing ones with custom-made restorations designed for strength and aesthetics.",
        image: "/random/3.webp",
        bigImage: "/random/3.webp",
      },
      {
        title: "Dental Implants",
        description:
          "A permanent solution for missing teeth that restores function, appearance, and confidence with a natural feel.",
        image: "/random/5.webp",
        bigImage: "/random/5.webp",
      },
      {
        title: "Root Canal Treatment",
        description:
          "Save infected teeth by removing damaged pulp while preserving the natural tooth structure and relieving pain.",
        image: "/random/8.webp",
        bigImage: "/random/8.webp",
      },
      {
        title: "Dentures",
        description:
          "Comfortable, custom-fit full and partial dentures designed to restore your smile and improve daily function.",
        image: "/random/4.webp",
        bigImage: "/random/4.webp",
      },
    ],
  },

  {
    DEFAULT_IMAGE: "/Clinic/clinic1.webp",

    heading: "Esthetic Dentistry",

    items: [
      {
        title: "Professional Teeth Whitening",
        description:
          "Brighten stained or discolored teeth safely with professional whitening treatments for a noticeably whiter smile.",
        image: "/random/5.webp",
        bigImage: "/random/5.webp",
      },
      {
        title: "Porcelain Veneers",
        description:
          "Transform chipped, uneven, or stained teeth with custom-crafted veneers for a flawless natural appearance.",
        image: "/random/4.webp",
        bigImage: "/random/4.webp",
      },
      {
        title: "Smile Makeover",
        description:
          "A personalized combination of cosmetic treatments designed to create a balanced, healthy, and confident smile.",
        image: "/random/15.webp",
        bigImage: "/random/15.webp",
      },
      {
        title: "Tooth Bonding",
        description:
          "Repair chips, gaps, and minor imperfections quickly using tooth-colored composite resin for natural-looking results.",
        image: "/random/3.webp",
        bigImage: "/random/3.webp",
      },
      {
        title: "Clear Aligners",
        description:
          "Straighten teeth comfortably and discreetly with nearly invisible aligners tailored to your smile.",
        image: "/random/7.webp",
        bigImage: "/random/7.webp",
      },
    ],
  },

  {
    DEFAULT_IMAGE: "/marquee/5.webp",

    heading: "Beyond the Smile",

    items: [
      {
        title: "Sleep Apnea Devices",
        description:
          "Custom oral appliances designed to improve airflow, reduce snoring, and support better quality sleep.",
        image: "/random/6.webp",
        bigImage: "/random/6.webp",
      },
      {
        title: "TMJ & Jaw Pain Treatment",
        description:
          "Comprehensive evaluation and treatment options to relieve jaw discomfort, headaches, and TMJ-related symptoms.",
        image: "/random/7.webp",
        bigImage: "/random/7.webp",
      },
      {
        title: "Sedation Dentistry",
        description:
          "Relax throughout your appointment with safe sedation options that make dental visits comfortable and stress-free.",
        image: "/random/14.webp",
        bigImage: "/random/14.webp",
      },
    ],
  },
];

const Services = () => {
  return (
    <>
      <Seo
        title="Our Dental Services"
        description="Explore Birawat Dental Studio's full range of services — preventive care, restorative dentistry, esthetic treatments, and more. Personalized care for every smile."
        path="/services"
      />
      <Hero />
      <ServicesParallax />
      <CareSection id="preventive" items={CareSections[0]} />
      <Line />
      <CareSection
        id="restorative"
        items={CareSections[1]}
        className={"md:flex-row-reverse"}
      />
      <Line />
      <CareSection id="esthetic" items={CareSections[2]} />
      <Line />
      <CareSection
        id="beyond"
        items={CareSections[3]}
        className={"md:flex-row-reverse"}
      />
      <MarqueeSection />
    </>
  );
};

export default Services;
