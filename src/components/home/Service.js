import { Col, Row } from "antd";
import React from "react";
import "./style.scss";

const Service = () => {
  return (
    <Row className="h-48 bg-primary text-white">
      <Col
        md={6}
        span={12}
        className="flex flex-col justify-center items-center text-center"
      >
        <div className="uppercase">FREE SHIP & LẮP ĐẶT</div>
        <div>Cho đơn hàng trên 4,000,000đ tại HCM</div>
      </Col>
      <Col
        md={6}
        span={12}
        className="relative flex flex-col justify-center items-center text-center service-item"
      >
        <div className="uppercase">GIAO HÀNG TOÀN QUỐC</div>
        <div>Packaging an toàn cho tranh</div>
      </Col>
      <Col
        md={6}
        span={12}
        className="flex flex-col justify-center items-center text-center service-item"
      >
        <div className="uppercase">TẶNG KÈM PHỤ KIỆN</div>
        <div>Đinh 4 chân treo tranh chuyên dụng</div>
      </Col>
      <Col
        md={6}
        span={12}
        className="flex flex-col justify-center items-center text-center service-item"
      >
        <div className="uppercase">HỖ TRỢ TƯ VẤN</div>
        <div>Qua Facebook & Instagram</div>
      </Col>
    </Row>
  );
};

export default Service;
