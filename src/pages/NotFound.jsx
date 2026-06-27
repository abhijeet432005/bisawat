// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const NotFound = () => (
  <>
    <Seo
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved. Return to Birawat Dental Studio's homepage to continue exploring our dental services."
      path="/404"
    />
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#faf8f4" }}
    >
      <h1 className="text-6xl font-bold text-[#1a1a1a] mb-4">404</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full text-sm font-semibold text-white"
        style={{ background: "var(--btn-color)" }}
      >
        Back to Home
      </Link>
    </section>
  </>
);

export default NotFound;
