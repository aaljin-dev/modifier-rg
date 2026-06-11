import React from "react";
import { useState } from "react";

const Letter = ({ text, setSuggestion, suggestion }) => {
  const sigCanvas = useRef();

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = () => {
    const signature = sigCanvas.current.toDataURL("image/png");
    console.log(signature);
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-[50%] h-[80%] bg-white border rounded-lg">
          <div className="border-b flex justify-between px-5 py-5">
            <h1 className="text-xl font-bold">Try Suggested Message</h1>
            <div
              className="text-xl cursor-pointer"
              onClick={() => setSuggestion(false)}
            >
              X
            </div>
          </div>
          <div className="px-5 py-3">
            <div>
              <button className="bg-black text-white rounded-3xl px-3 py-2 cursor-pointer hover:bg-black/80">
                Graduation
              </button>
            </div>

            <div>
              {text.map((item, index) => (
                <p
                  className="border my-2 p-2  w-fit cursor-pointer"
                  key={index}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
