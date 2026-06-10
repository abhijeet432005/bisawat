import React from "react";
import CountUp from "./Counter/Countup";

const TrustNumbers = () => {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="w-[90%] md:w-[80%] gap-[2rem] flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="left">
          <h1 className="text-4xl md:text-5xl capitalize">Trust & proven</h1>
          <p className="w-xs lg:text-[1.2rem]">
            Celebrating milestone that reflect our commitment to healthy,
            confident smiles.
          </p>
        </div>

        <div className="right text-4xl md:text-5xl flex justify-between w-full md:w-[70vh] lg:w-[40vw]">
          <div>
            <CountUp
              from={0}
              to={5}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
            K+
          </div>

          <div>
            <CountUp
              from={0}
              to={1}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
            K+
          </div>

          <div>
            <CountUp
              from={0}
              to={10}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
            K+
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustNumbers;
