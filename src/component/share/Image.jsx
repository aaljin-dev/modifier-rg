import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Image = ({ image }) => {
  const [mainImage, setMainImage] = useState("");

  if (!image?.attach_image) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=" mb-5 h-80 w-full borderr">
        <img
          className="w-full h-full "
          src={mainImage || image?.attach_image?.[0]?.attachurl}
          alt=""
        />
      </div>
      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={25}
          speed={2000}
          loop={true}
          autoplay={{
            delay: 2000, // 3 seconds
            disableOnInteraction: false,
          }}
        >
          {image.attach_image.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="h-30"
                onClick={() => setMainImage(item.attachurl)}
              >
                <img
                  src={item.attachurl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Image;
