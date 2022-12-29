import { Col, Image, Row } from "antd";
import React from "react";

const HomeInfo = () => {
  return (
    <Row>
      <Col lg={12} span={24} className="flex justify-center items-center">
        <div className="max-w-[80%] flex flex-col justify-center items-center text-center gap-2">
          <h3 className="text-primary text-3xl font-normal">Tranh đông hồ</h3>
          <p className="text-base text-black font-normal mb-20">
            Tranh Đông Hồ rất gần gũi với đại đa số dân chúng Việt Nam, nhắc đến
            hầu như ai cũng đều biết cả. Tranh Đông Hồ gần gũi còn vì hình ảnh
            của nó đã đi vào thơ, văn trong chương trình giáo dục phổ thông.
            Ngày nay tục lệ mua tranh Đông Hồ treo ngày Tết đã mai một, làng
            tranh cũng thay đổi nhiều: làng Đông Hồ ngày nay có thêm nghề làm
            vàng mã. Nghề giấy dó ở làng Yên Thái (Bưởi, Tây Hồ) cũng đã không
            còn. Tuy vậy, tranh Đông Hồ vẫn đóng vai trò như một di sản văn hóa,
            một dòng tranh dân gian không thể thiếu.
          </p>
        </div>
      </Col>
      <Col lg={12} span={24}>
        <Image
          src="https://tranhdongho.info/uploads/products/thumb_chuot.jpg"
          preview={false}
          className="w-full aspect-square"
        />
      </Col>
    </Row>
  );
};

export default HomeInfo;
