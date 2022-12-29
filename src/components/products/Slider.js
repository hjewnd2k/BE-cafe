import { Carousel, Col, Image, Row } from "antd";
import React, { useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.scss";

const Slider = ({ dataImage }) => {
  const slider = useRef();
  const sliderChil = useRef();
  const [number, setNumber] = useState();

  const onMouseEnter = (index) => {
    setNumber(index);
    slider.current.goTo(index, false);
  };

  return (
    <Row justify="center" className="mb-6">
      <Col span={24}>
        {dataImage && (
          <Carousel
            ref={slider}
            autoplay={false}
            swipeToSlide
            className="slider"
          >
            {dataImage.map((data, index) => (
              <Image
                key={index}
                src={data}
                alt=""
                className="!w-full !aspect-4/3"
                preview={false}
              />
            ))}
          </Carousel>
        )}
      </Col>
      <div className="mt-4 max-w-2xl relative">
        <div
          className="absolute top-[50%] flex left-[-24px] translate-y-[-50%] text-[28px] cursor-pointer"
          onClick={() => sliderChil.current.prev()}
        >
          <LeftOutlined />
        </div>
        <div
          className="absolute top-[50%] flex right-[-24px] translate-y-[-50%] text-[28px] cursor-pointer"
          onClick={() => sliderChil.current.prev()}
        >
          <RightOutlined />
        </div>
        {dataImage && (
          <Carousel
            ref={sliderChil}
            autoplay={false}
            slidesPerRow={dataImage.length > 5 ? 5 : dataImage.length}
            dots={false}
            style={{ minWidth: 400 }}
          >
            {dataImage.map((data, index) => (
              <div
                className={`border hover:border-red-500 ${
                  number === index ? "active" : ""
                }`}
                key={index}
                onMouseEnter={() => onMouseEnter(index)}
              >
                <Image
                  src={data}
                  alt=""
                  //   onClick={() => Goto(index)}
                  preview={false}
                  className="!w-32 !h-24"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </Row>
  );
};

export default Slider;
