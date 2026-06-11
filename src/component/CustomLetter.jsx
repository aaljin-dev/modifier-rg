import React from "react";
import { useState } from "react";

const CustomLetter = ({ setFullScreen, fullScreen }) => {
  const customInputFunction = () => {
    setFullScreen(true);
  };
  return (
    <div>
      <div>
        <div>
          <div className=" h-20 my-5">
            <input
              type="text"
              className="border-2 w-full h-full"
              placeholder="comment"
            />
          </div>

          <div className="borderr h-70 p-4">
            <h1 className=" text-xl font-bold">Card Message</h1>

            <div
              className="border-2 border-dashed rounded-lg h-[80%] flex flex-col items-center justify-center"
              onClick={() => customInputFunction()}
            >
              <img src="/logo.png" alt="RG" className="w-16 opacity-50 mb-2" />
              <p className="text-gray-500 text-sm uppercase">Card Message</p>
            </div>

            <h2 className="text-center">+ Add Your Message</h2>
          </div>
          <div className="border-2 mt-5 h-20"></div>
          <div className="border-2 mt-5 h-15"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLetter;
