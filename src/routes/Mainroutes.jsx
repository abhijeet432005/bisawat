import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ScrollToTop from "../components/ScrollToTop";

const Contact = lazy(() => import("../pages/Contact"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));

const Mainroutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <Contact />{" "}
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <About />{" "}
            </Suspense>
          }
        />
        <Route
          path="/services"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              <Services />{" "}
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default Mainroutes;
