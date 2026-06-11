import React, { useEffect, useState, useRef } from "react";
import { ModifierPage } from "../api/Api";
import Image from "./share/Image";
import UserModifier from "./share/UserModifier";
import Letter from "./Letter";
import { PiSignatureBold } from "react-icons/pi";
import SignatureCanvas from "react-signature-canvas";
import { IoMdLink } from "react-icons/io";
import { FaImage } from "react-icons/fa6";

const Modifier = () => {
  const [show, setShow] = useState([]);
  const [img, setImg] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [font, setFont] = useState("sans-serif");
  const [suggestion, setSuggestion] = useState(false);
  const [text, setText] = useState([]);

  const message = ["Thank you", "find yor", "Try again"];

  const [url, setUrl] = useState();

  useEffect(() => {
    const done = async () => {
      try {
        const order = await ModifierPage();
        setShow(order);
        setText(message);
      } catch (error) {
        console.log("er modifier");
      }
    };
    done();
  }, []);

  const sigCanvas = useRef(null);

  const clear = () => {
    sigCanvas.current.clear();
    setUrl();
  };

  const save = () => {
    const signature = sigCanvas.current.toDataURL("image/png");
    setUrl(signature);
    console.log(signature);
  };

  return (
    <>
      <div className="w-[100%] max-md:flex-col flex px-10 max-md:px-5 pt-10 borderr ">
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
            <div className="absolute inset-0   bg-white/50 z-50">
              <div className="h-full">
                <div
                  className="absolute top-4 right-4 text-xl cursor-pointer"
                  onClick={() => setFullScreen(false)}
                >
                  x
                </div>
                <div className="flex h-full w-full">
                  <div
                    className="w-1/2 h-full max-md:hidden"
                    onClick={() => setFullScreen(false)}
                  >
                    {/* left div */}
                  </div>

                  <div className="w-1/2 max-md:w-full  pt-15 bg-white overflow-y-scroll h-[1080px]">
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
                      <div className=" w-full flex gap-3">
                        <div className="w-1/2 ">
                          <input
                            type="text"
                            style={{ fontFamily: font }}
                            className="border border-gray-300 w-full  px-4 rounded-xl h-15 mb-5"
                            placeholder=" Your Email"
                          />
                        </div>
                        <div className="w-1/2">
                          <select
                            className="border border-gray-300 w-full  px-4 rounded-xl h-15 mb-5"
                            onChange={(e) =>
                              setFont(
                                e.target.value === "Handwriting"
                                  ? "cursive"
                                  : "sans-serif",
                              )
                            }
                          >
                            <option value="Default">Default</option>
                            <option value="Handwriting">Handwriting</option>
                          </select>
                          {/* jhbjhbh */}
                        </div>
                      </div>
                      {/* Suggested Message */}
                      <div>
                        <div className="flex justify-between">
                          <h1>Not sure what to say?</h1>
                          <button
                            className="bg-black px-3 py-2 text-white rounded-xl cursor-pointer hover:bg-black/70"
                            onClick={() => setSuggestion(true)}
                          >
                            Try Suggested Message
                          </button>
                        </div>
                      </div>
                      {/* signature */}
                      <div className="mt-5">
                        <div className="flex gap-3">
                          <PiSignatureBold className="text-3xl" />
                          <h1 className="text-xl">Signature</h1>
                        </div>
                        <div>
                          <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{
                              className:
                                "border border-gray-300 rounded-lg w-[60%]",
                            }}
                          />

                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={clear}
                              className="px-4 py-2 bg-red-500 h-10 text-white rounded"
                            >
                              Clear
                            </button>

                            <button
                              onClick={save}
                              className="px-4 py-2 bg-green-500 h-10 text-white rounded"
                            >
                              Save
                            </button>
                            <div className="w-35 ">
                              {url && (
                                <img
                                  src={url}
                                  alt=""
                                  className="h-full w-full"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <h1 className="my-1">Receiver Mobile Number</h1>
                        <div className="flex border border-gray-300 rounded-md overflow-hidden">
                          <select
                            // value={countryCode}
                            // onChange={(e) => setCountryCode(e.target.value)}
                            className="px-3 py-3 border-r border-gray-300"
                          >
                            <option value="+966">🇸🇦 (+966)</option>
                            <option value="+91">🇮🇳 (+91)</option>
                            <option value="+1">🇺🇸 (+1)</option>
                          </select>
                          <input
                            type="text"
                            className="w-full"
                            className="border-none outline-none px-3"
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="my-1">
                        <h1 className="text-2xl py-1">Share Your Emotion</h1>
                        <p>Choose the best way to share your feelings</p>
                        <div className="flex gap-8 my-5 h-25">
                          <div className="w-80  borderr flex gap-5 items-center pl-5">
                            <IoMdLink className="text-4xl" />
                            <div>
                              <h1 className="text-xl">Link Url</h1>
                              <p className="text-sm">
                                Share Link for a song, music or video
                              </p>
                            </div>
                          </div>
                          <div className="w-80 borderr flex gap-5 items-center pl-5">
                            <FaImage className="text-4xl" />
                            <div>
                              <h1 className="text-xl">Link Url</h1>
                              <p className="text-sm">
                                Share Link for a song, music or video
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="bg-gray-700 px-5 py-2 rounded-xl text-white c">
                        jhgiu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {suggestion && (
          <Letter
            text={text}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
          />
        )}
      </div>
    </>
  );
};

export default Modifier;
