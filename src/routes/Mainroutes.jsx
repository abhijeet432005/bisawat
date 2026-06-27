import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ScrollToTop from "../components/ScrollToTop";
import PageLoader from "../components/PageLoader";

const Contact  = lazy(() => import("../pages/Contact"));
const About    = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const NotFound = lazy(() => import("../pages/NotFound"));

const Mainroutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Mainroutes;