import { Button, Col, Image, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Title } = Typography;

const FeaturedProduct = () => {
  return (
    <Row className="bg-[#e8e4d8] lg:h-[800px]">
      <Col lg={12} span={24} className="flex justify-center items-center">
        <div>
          <Image
            src="https://theme.hstatic.net/1000340829/1000764152/14/pro_featured_img.png"
            preview={false}
          />
        </div>
      </Col>
      <Col lg={12} span={24} className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center max-w-[400px]">
          <Title level={5} className="!text-black !text-[13px]">
            Cảm hứng
          </Title>
          <Title level={3} className="!mt-0">
            <Link to="/" className="!text-primary hover:!text-blue-400">
              HENRI MATISSE
            </Link>
          </Title>
          <h5 className="!text-primary !text-[16px] !font-bold border-b border-[#000] !w-full pb-2">
            "CREATIVITY TAKES COURAGE."
          </h5>
          <p className="text-[#333] text-base mt-2">
            Chắc hẳn hầu hết chúng ta đều quen thuộc với tác phẩm của nghệ sĩ
            nổi tiếng người Pháp Henri Matisse (1869-1954). Và cũng có thể bạn
            đã có một tấm áp phích "Dance" của ông ấy trên tường phòng ký túc xá
            đại học hoặc tuyệt vời hơn đã có cơ hội nhìn thấy nó trực tiếp tại
            MOMA ở New York. Giờ đây hãy cùng Cyantific biến bức tường nhà bạn
            thành nơi tôn vinh những tác phẩm của ông trong series Henri Matisse
            Inspired Gallery Wall nhé!
          </p>
          <Button
            className="uppercase bg-[#b9a38d] border !border-[#b9a38d] 
          hover:bg-transparent text-white hover:text-[#b9a38d]
          text-[18px] font-semibold rounded-[30px] h-[58px] w-[200px] mt-14"
          >
            Xem ngay
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default FeaturedProduct;
