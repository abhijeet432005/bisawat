// components/PageLoader.jsx
import React from "react";

const PageLoader = () => (
  <div className="w-full min-h-screen flex items-center justify-center" style={{ background: "#faf8f4" }}>
    <div
      className="w-8 h-8 rounded-full border-2 border-gray-200 animate-spin"
      style={{ borderTopColor: "#1a1a1a" }}
    />
  </div>
);

export default PageLoader;