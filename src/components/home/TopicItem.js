import { Button, Col } from "antd";
import React from "react";

const TopicItem = () => {
  return (
    <Col lg={6} span={12} className="relative">
      <img
        src="https://theme.hstatic.net/1000340829/1000764152/14/block_home_category1.jpg"
        alt=""
        className="w-full aspect-[3/4]"
      />
      <div className="absolute bottom-[50px] w-full pl-10">
        <h5 className="text-white text-[15px] font-normal">Cảm hứng từ</h5>
        <h3 className="text-white text-[23px] my-[15px]">William Morris</h3>
        <button
          className="uppercase h-[35px] w-[123px] text-xs font-medium-bold
        !bg-white !border !border-white hover:!bg-transparent hover:text-white
        "
        >
          Xem thêm
        </button>
      </div>
    </Col>
  );
};

export default TopicItem;
