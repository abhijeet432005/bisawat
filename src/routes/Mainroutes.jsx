import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));

const Mainroutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Suspense>
  );
};

export default Mainroutes;