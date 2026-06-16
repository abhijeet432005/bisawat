import React from "react";
import Home from "./pages/Home";
import ReactLenis from "lenis/react";
import NavBar from "./components/navbar/NavBar";
import Mainroutes from "./routes/Mainroutes";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.045,
      }}
      className="w-full min-h-screen relative"
    >
      <NavBar />
      <Mainroutes />
      <Footer />
    </ReactLenis>
  );
};

export default App;
