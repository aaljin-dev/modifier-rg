import React from "react";
import { useState } from "react";

const CustomLetter = ({ setFullScreen, fullScreen, userInput }) => {
  const customInputFunction = () => {
    setFullScreen(true);
  };
  const hasData =
    userInput?.receiverName?.trim() ||
    userInput?.message?.trim() ||
    userInput?.senderName?.trim() ||
    userInput?.sign ||
    userInput?.image;
  return (
    <div>
      <div>
        <div>
          <div className="border border-gray-300 rounded-2xl p-3 my-5 shadow-sm  focus-within:bg-black focus-within:text-white">
            <textarea
              className="w-full outline-none resize-none"
              rows="4"
              placeholder="Enter your comment..."
            />
          </div>

          <div className="border border-gray-300 rounded-2xl h-50 p-4 shadow-sm">
            <h1 className="text-xl font-bold">Card Message</h1>

            {hasData ? (
              <div className="border-2  rounded-lg h-[80%] my-2 p-4 relative">
                <h1
                  onClick={customInputFunction}
                  className="flex justify-end text-red-500"
                >
                  Edit
                </h1>
                <p className="font-semibold">{userInput.receiverName}</p>
                <p>{userInput.message}</p>
                <p> {userInput.senderName}</p>
                <div className="absolute bottom-5">
                  <img src={userInput.sign} alt="" className="w-20" />
                </div>
                {userInput.image && (
                  <div className="absolute right-10 bottom-5">
                    <img
                      src={URL.createObjectURL(userInput.image)}
                      alt="Uploaded"
                      className="w-10"
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  className="border  border-gray-300 border-dashed my-3 rounded-lg h-[60%] flex flex-col items-center justify-center"
                  onClick={customInputFunction}
                >
                  <img
                    src="/logo.png"
                    alt="RG"
                    className="w-16 opacity-50 mb-2"
                  />
                  <p className="text-gray-500 text-sm uppercase">
                    Card Message
                  </p>
                </div>

                <h2 className="text-center cursor-pointer font-bold">
                  + Add Your Message
                </h2>
              </>
            )}
          </div>
          <div className="border-2 mt-5 h-20"></div>
          <div className="border-2 mt-5 h-15"></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLetter;
