import React from "react";
import Home from "./pages/Home";
import ReactLenis from "lenis/react";

const App = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.045,
      }}
      className="w-full min-h-screen relative"
    >
      <Home />
    </ReactLenis>
  );
};

export default App;
