import React from "react";

const Hero_grid_2 = () => {
  return (
    <div className="flex flex-col py-20 flec flex-col justify-center items-center w-full">
      <div className="w-[90%] md:w-[80%]">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1a1a2e] leading-tight mb-8">
          Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. Nihil,
          fugit!
        </h1>

        <div className="grid-wrapper-2">
          <div className="card-1 card"></div>
          <div className="card-2 card"></div>
          <div className="card-3 card"></div>
          <div className="card-4 card"></div>
          <div className="card-5 card"></div>
          <div className="card-6 card"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero_grid_2;
