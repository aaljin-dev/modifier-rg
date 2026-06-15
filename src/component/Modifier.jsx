import React, { useEffect, useState, useRef } from "react";
import { ModifierPage } from "../api/Api";
import Image from "./share/Image";
import UserModifier from "./share/UserModifier";
import Letter from "./Letter";
import { PiSignatureBold } from "react-icons/pi";
import SignatureCanvas from "react-signature-canvas";
import { IoMdLink } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import QRCode from "react-qr-code";
import "./Modifier.css";

const Modifier = () => {
  const [show, setShow] = useState([]);
  const [img, setImg] = useState([]);
  const [fullScreen, setFullScreen] = useState(false);
  const [font, setFont] = useState("sans-serif");
  const [suggestion, setSuggestion] = useState(false);
  const [text, setText] = useState([]);
  const [url, setUrl] = useState();
  const [qrInput, setQrInput] = useState(false);
  const [custImage, setCustImage] = useState();
  const [preview, setPreview] = useState("");
  const [link, setLink] = useState("");
  const [previewPage, setPreviewPage] = useState(false);

  const [userInput, setUserInput] = useState({});

  const inputImageref = useRef(null);

  const handleImageClick = () => {
    inputImageref.current?.click();
  };

  const message = ["Thank you", "find yor", "Try again"];

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
    setUserInput({
      ...userInput,
      sign: null,
    });
  };

  const save = () => {
    const signature = sigCanvas.current.toDataURL("image/png");
    setUrl(signature);
    setUserInput({
      ...userInput,
      sign: signature,
    });
    console.log(signature);
  };

  const handleInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  console.log(userInput);

  return (
    <>
      <div className="w-[100%] max-md:flex-col flex px-10 max-md:px-5 pt-10  ">
        <div className="w-[50%] max-md:w-[100%] ">
          <Image
            image={show}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
        </div>
        <div className="w-[50%] max-md:w-[100%] px-10 ">
          <UserModifier
            userInput={userInput}
            order={show}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
          {fullScreen && (
            <div className="fixed inset-0   bg-white/50 z-100">
              <div className="h-full">
                <div className=" flex h-screen w-full">
                  <div
                    className="w-1/2 h-screen  max-md:hidden"
                    onClick={() => {
                      (setFullScreen(false), setPreviewPage(false));
                    }}
                  >
                    {/* left div */}
                  </div>
                  {/* right side div */}

                  <div className="w-1/2 max-md:w-full h-screen overflow-y-auto scrollbar-hide pt-3 bg-white relative">
                    {previewPage ? (
                      <div className="bg-white w-full">
                        <div className="flex justify-end mr-10 mt-5">
                          <h1
                            className="text-2xl font-bold cursor-pointer"
                            onClick={() => setPreviewPage(false)}
                          >
                            X
                          </h1>
                        </div>
                        <div className="text-center">
                          <p className="text-lg">{userInput.message}</p>
                          <p className="text-xl font-bold mt-5">
                            {userInput.senderName}
                          </p>
                          <div className="flex justify-center mt-5">
                            {userInput.sign && (
                              <img
                                src={userInput.sign}
                                alt="Signature"
                                className="w-40 h-20 object-cover"
                              />
                            )}
                          </div>
                          {userInput.image && (
                            <div className="flex justify-center mt-5">
                              <img
                                src={URL.createObjectURL(userInput.image)}
                                alt="Uploaded"
                                className="w-40 h-40 object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          className=" text-2xl cursor-pointer flex justify-end mr-10 mb-2"
                          onClick={() => setFullScreen(false)}
                        >
                          x
                        </div>
                        <div className="flex justify-end mr-10">
                          <button
                            className="bg-black px-3 py-1 text-white rounded-xl cursor-pointer hover:bg-black/70"
                            onClick={() => setPreviewPage(true)}
                          >
                            Preview
                          </button>
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-5">
                          Card Message
                        </h1>
                        <div className="bg-gray-500 h-[2px] mx-10 mb-5"></div>
                        <div className="px-10 ">
                          <div>
                            <input
                              name="receiverName"
                              value={userInput.receiverName}
                              onChange={handleInput}
                              type="text"
                              className="border border-gray-300 py-7 px-4 rounded-xl w-full h-10 mb-5"
                              placeholder=" Name"
                            />
                          </div>
                          <div>
                            <input
                              name="message"
                              value={userInput.message}
                              onChange={handleInput}
                              type="text"
                              className="border border-gray-300 py-7 px-4 rounded-xl w-full h-20 mb-5"
                              placeholder=" Your Message"
                            />
                          </div>
                          <div className=" w-full flex gap-3">
                            <div className="w-1/2 ">
                              <input
                                name="senderName"
                                value={userInput.senderName}
                                onChange={handleInput}
                                type="text"
                                style={{ fontFamily: font }}
                                className="border border-gray-300 w-full  px-4 rounded-xl h-15 mb-5"
                                placeholder=" Sender Name"
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
                                    "border border-gray-300 rounded-lg h-[200px] w-[80%]",
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
                                <div className="w-40 h-15">
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
                                name="mobileNumber"
                                value={userInput.mobileNumber}
                                onChange={handleInput}
                                type="text"
                                className="w-full"
                                className="border-none outline-none px-3"
                                placeholder="Mobile Number"
                              />
                            </div>
                          </div>
                          <div className="my-1">
                            <h1 className="text-2xl py-1">
                              Share Your Emotion
                            </h1>
                            <p>Choose the best way to share your feelings</p>
                            <div className="flex max-lg:flex-col gap-8 my-5 ">
                              <div className=" ">
                                <div
                                  className="w-80 border-gray-100 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,1.0)] flex items-center gap-5  px-5 py-3"
                                  onClick={() => setQrInput(true)}
                                >
                                  <IoMdLink className="text-4xl" />
                                  <div>
                                    <h1 className="text-xl">Link Url</h1>
                                    <p className="text-sm">
                                      Share Link for a song, music or video
                                    </p>
                                  </div>
                                </div>

                                {qrInput === true ? (
                                  <div className="w-full flex gap-3 border border-gray-600">
                                    <input
                                      name="link"
                                      type="text"
                                      className="w-full px-2 py-1 outline-none"
                                      value={link}
                                      onChange={(e) => {
                                        setLink(e.target.value);
                                        setUserInput({
                                          ...userInput,
                                          [e.target.name]: e.target.value,
                                        });
                                      }}
                                      placeholder="paste the link"
                                    />
                                    <h1
                                      onClick={() => setQrInput(false)}
                                      className="text-2xl"
                                    >
                                      X
                                    </h1>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                              <div className="border-gray-100 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,1.0)] ">
                                <div
                                  className="w-80 flex items-center gap-5  px-5 py-3"
                                  onClick={handleImageClick}
                                >
                                  {preview ? (
                                    <img
                                      src={preview}
                                      alt="Preview"
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                  ) : (
                                    <FaImage className="text-4xl" />
                                  )}
                                  <div>
                                    <h1 className="text-xl">Link Url</h1>
                                    <p className="text-sm">
                                      Share Link for a song, music or video
                                    </p>
                                  </div>
                                </div>
                                <div className="w-full flex gap-3 ">
                                  <input
                                    name="image"
                                    ref={inputImageref}
                                    onChange={(e) => {
                                      const file = e.target.files[0];
                                      setCustImage(file);

                                      if (file) {
                                        setPreview(URL.createObjectURL(file));
                                      }
                                      setUserInput({
                                        ...userInput,
                                        image: file,
                                      });
                                    }}
                                    type="file"
                                    className=" w-0 h-0"
                                    placeholder="paste the link"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <button className=" bg-gray-600 mb-4 rounded px-5 py-2 text-xl text-white">
                            submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {suggestion && (
          <Letter
            userInput={userInput}
            userInput={userInput}
            setUserInput={setUserInput}
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
