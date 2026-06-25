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
          <div className="card-1 card flex justify-center items-center bg-white shadow-md backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/10 pl-4">
            <div className="hero-review review w-full flex items-center justify-between gap-3 text-white">
              <div className="flex items-center">
                <div className="flex -space-x-6">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    className="max-w-10 max-h-10 rounded-full object-cover border-1 border-white shadow-md"
                  />
                </div>
              </div>
              <div className="text-left w-full">
                <p className="text-lg leading-relaxed text-black">
                  "100% Smile"
                </p>
              </div>
            </div>
          </div>
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
