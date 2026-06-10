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
      <div className="w-[100%] max-md:flex-col flex px-10 max-md:px-5 pt-10 borderr ">
        <div className="w-[50%] max-md:w-[100%] ">
          <Image image={show} />
        </div>
        <div className="w-[50%] max-md:w-[100%] px-10">
          <UserModifier
            order={show}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
          />
        </div>

        {fullScreen && (
          <div className="fixed inset-0 bg-red-500 z-10">jhguy</div>
        )}
      </div>
    </>
  );
};

export default Modifier;
