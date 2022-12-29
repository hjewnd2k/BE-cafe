import { Button, Col, Input, Row, Space, Form } from "antd";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { AppContext } from "../../App";

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const onFinish = async (values) => {
    console.log("Success:", values);
    await axios.put("http://localhost:8080/api/register", values);
    navigate("/auth/login");
  };
  return (
    <div className="lg:mt-15">
      <Row className="min-h-[100vh] flex items-center">
        <Col
          lg={12}
          span={24}
          className="text-[54px] font-bold flex justify-center items-center border-b border-[#ccc] lg:border-b-0 lg:border-r lg:border-[#ccc] h-40 lg:h-[100vh]"
        >
          <div className="w-[80%] text-center">Tạo tài khoản</div>
        </Col>
        <Col
          lg={12}
          span={24}
          className="flex justify-center items-center mt-15 mb-15 lg:m-0"
        >
          <Form className="w-[80%]" onFinish={onFinish}>
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <Input placeholder="Nhập tài khoản" className="h-14" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" className="h-14" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input placeholder="Email" className="h-14" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" className="h-14" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input type="password" placeholder="Mật khẩu" className="h-14" />
            </Form.Item>
            <Space direction="vertical">
              <Button
                className="h-[57px] bg-primary text-white uppercase font-semibold w-[148px]"
                htmlType="submit"
              >
                Đăng ký
              </Button>
              <div className="text-primary font-semibold mt-2">
                <Link to={"/auth/login"}>
                  <div className="flex items-center gap-3">
                    <ArrowLeftOutlined />
                    <span>Đăng nhập</span>
                  </div>{" "}
                </Link>
              </div>
            </Space>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
