import React, { useEffect, useState } from "react";
import { ModifierPage } from "../api/Api";
import Image from "./share/Image";
import UserModifier from "./share/UserModifier";

const Modifier = () => {
  const [show, setShow] = useState([]);
  const [img, setImg] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const done = async () => {
      try {
        const order = await ModifierPage();
        setShow(order);
      } catch (error) {
        console.log("er modifier");
      }
    };
    done();
  }, []);

  return (
    <>
      <div className="w-[100%] max-md:flex-col flex px-10 max-md:px-5 pt-10 borderr relative">
        <div className="w-[50%] max-md:w-[100%] ">
          <Image
            image={show}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
        </div>
        <div className="w-[50%] max-md:w-[100%] px-10 ">
          <UserModifier
            order={show}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
          {fullScreen && (
            <div className="absolute inset-0 bg-white/50 z-10">
              <div
                className="absolute top-4 right-4 text-xl cursor-pointer"
                onClick={() => setFullScreen(false)}
              >
                x
              </div>
              <div className="flex h-full w-full">
                <div
                  className="w-1/2 h-full"
                  onClick={() => setFullScreen(false)}
                >
                  nb
                </div>

                <div className="w-1/2 h-full pt-15 bg-white">
                  <h1 className="text-2xl font-bold text-center mb-5">
                    Card Message
                  </h1>
                  <div className="bg-gray-500 h-[2px] mx-10 mb-5"></div>
                  <div className="px-10">
                    <div>
                      <input
                        type="text"
                        className="border border-gray-300 py-7 px-4 rounded-xl w-full h-10 mb-5"
                        placeholder=" Name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="border border-gray-300 py-7 px-4 rounded-xl w-full h-20 mb-5"
                        placeholder=" Your Message"
                      />
                    </div>
                    <div className=" w-full flex ">
                      <div className="w-1/2">
                        <input
                          type="text"
                          className="border border-gray-300 w-full  py-7 px-4 rounded-xl h-10 mb-5"
                          placeholder=" Your Email"
                        />
                      </div>
                      <div className="w-1/2">
                        <button className="bg-blue-500 flex items-center justify-center text-white py-7 px-4 rounded-xl w-full h-10 mb-5">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modifier;
