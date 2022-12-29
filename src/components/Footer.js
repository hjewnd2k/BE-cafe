import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import loction from "../public/imgs/location.png";
import {
  PhoneFilled,
  MailFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";
const { Footer } = Layout;
const { Title } = Typography;

const MyFooter = () => {
  return (
    <Footer>
      <Row gutter={8}>
        <Col className="gutter-row" lg={6} md={12} span={24}>
          <Title className="!text-primary" level={3}>
            Rock your space!
          </Title>
          <p>
            Cyantific.vn cửa hàng tranh trang trí với các thiết kế đa dạng và
            cập nhật. Có nhiều cách để chạm vào cái đẹp, nét tinh tế của phong
            cách tối giản đôi không cần thiết phải đi cùng với những căn nhà có
            nội thất đắt tiền, đó là khởi nguồn của tất cả những gì bạn đang
            chứng kiến tại Cyantific.
          </p>
          <img
            className="w-[150px]"
            src="https://theme.hstatic.net/1000340829/1000764152/14/logo-bct.png?v=166"
            alt=""
          />
        </Col>
        <Col className="gutter-row" lg={6} md={12} span={24}>
          <Title className="!text-primary" level={3}>
            Cyantific
          </Title>
          <div>
            <Link to={"/"}>Về Cyantific</Link>
          </div>
          <div className="mt-2">
            <Link to={"/"}>Hướng dẫn treo tranh</Link>
          </div>
          <div className="mt-2">
            <Link to={"/"}>Chính sách giao & đổi trả</Link>
          </div>
          <div className="mt-2">
            <Link to={"/"}>Chính sách thanh toán</Link>
          </div>
          <div className="mt-2">
            <Link to={"/"}>Chính sách bảo mật</Link>
          </div>
          <div className="mt-2">
            <Link to={"/"}>Điều khoản & dịch vụ</Link>
          </div>
        </Col>
        <Col className="gutter-row" lg={6} md={12} span={24}>
          <Title className="!text-primary" level={3}>
            Liên lạc
          </Title>
          <div className="flex items-center gap-1">
            <img src={loction} alt="" className="w-[14px]" />
            <p>275 Tây Sơn, Đống Đa, Hà Nội</p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <PhoneFilled />
            <p>(+84)762 928 220</p>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <MailFilled />
            <p>cyantificvn@gmail.com</p>
          </div>
        </Col>
        <Col className="gutter-row" lg={6} md={12} span={24}>
          <Title className="!text-primary" level={3}>
            Fanpage
          </Title>
          <img
            className="max-w-[263px]"
            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/277518137_4480347595402303_1810198461675621791_n.jpg?stp=dst-jpg_s403x403&_nc_cat=109&ccb=1-7&_nc_sid=dd9801&_nc_ohc=MxiQRdGdxb8AX-1KpHc&tn=0keywIPLl9CClbr3&_nc_ht=scontent.fhan15-1.fna&oh=00_AT_vzEXZl-btDOSlxSQy-pYLTX3rvUOeA8v87IPa38gjBQ&oe=633AD55E"
            alt=""
          />
        </Col>
        <Col
          span={24}
          className="text-2xl flex justify-center items-center gap-2 mt-2"
        >
          <InstagramFilled />
          <FacebookFilled />
        </Col>
        <Col
          span={24}
          className="flex flex-col items-center pt-4 uppercase text-[#444444] font-medium"
        >
          <p>COPYRIGHT ©2020 CYANTIFIC</p>
          <p>
            SỐ ĐKKD: 47A8045252, NGÀY CẤP: 24/05/2019 BỞI UBND QUẬN ĐỐNG ĐA,
            TP.HN
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default MyFooter;
