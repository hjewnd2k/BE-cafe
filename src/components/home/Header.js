import { Carousel, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef } from "react";

const data = [
  "https://tranhdongho.info/uploads/images/slide1.webp",
  "https://tranhdongho.info/uploads/images/slide1.webp",
];

const Header = () => {
  const sildeRef = useRef();
  return (
    <div className="relative">
      <div
        className="absolute top-[50%] left-3 translate-y-[-50%] z-[1] text-white font-bold text-2xl cursor-pointer"
        onClick={() => sildeRef.current.prev()}
      >
        <LeftOutlined />
      </div>
      <div
        className="absolute top-[50%] right-3 translate-y-[-50%] z-[1] text-white font-bold text-2xl cursor-pointer"
        onClick={() => sildeRef.current.next()}
      >
        <RightOutlined />
      </div>
      <Carousel autoplay ref={sildeRef}>
        {data.map((img, index) => (
          <div key={index}>
            <Image alt="" src={img} preview={false} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Header;
