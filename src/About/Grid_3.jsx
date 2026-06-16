import React from "react";

const Grid_3 = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 md:py-20">
      <div className="w-[90%] md:w-[80%]">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1a1a2e] leading-tight mb-8">
          Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit. Nihil,
          fugit!
        </h1>

        <div className="grid-wrapper-3">
          <div className="card-1 card"></div>
          <div className="card-2 card"></div>
          <div className="card-3 card"></div>
          <div className="card-4 card"></div>
          <div className="card-5 card"></div>
        </div>
      </div>
    </div>
  );
};

export default Grid_3;
