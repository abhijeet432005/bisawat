// App.jsx
import React from "react";
import ReactLenis from "lenis/react";
import NavBar from "./components/navbar/NavBar";
import Mainroutes from "./routes/Mainroutes";
import Footer from "./components/footer/Footer";
import { Suspense } from "react";
import PageLoader from "./components/PageLoader";

const App = () => {
  return (
    <ReactLenis root options={{ lerp: 0.045 }} className="w-full min-h-screen relative">
      <NavBar />
      <Suspense fallback={<PageLoader />}>
        <Mainroutes />
        <Footer />
      </Suspense>
    </ReactLenis>
  );
};

export default App;