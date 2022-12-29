import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../App";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";

const Payment = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [dataCart, setDataCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.user?.id) {
      (async function () {
        const res = await axios.get(
          `http://localhost:8080/api/orderitem/getall/user/${state.user?.id}`
        );
        setDataCart(res.data);
      })();
    }
  }, [state.user?.id]);

  const sumPrice = useMemo(() => {
    return dataCart.reduce((accumulator, currentValue, index) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
  }, [dataCart]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    const orderItemIds = dataCart.map((item) => item.id);
    try {
      const res = await axios.post("http://localhost:8080/api/order/insert", {
        orderItemIds: orderItemIds,
        userId: state.user?.id,
        shipName: values.name,
        shipNumberPhone: values.phoneNumber,
        address: values.address,
      });
      openNotificationSuccess(
        "Đặt hàng",
        "Bạn đã đặt hàng thành công. Chúng tôi sẽ sớm liên hệ với bạn"
      );
      navigate("/");
    } catch (error) {
      openNotificationFail("Đặt hàng", "Có lỗi xảy ra");
    }
  };
  return (
    <div className="mt-[150px] mb-10">
      <Row>
        <Col span={24} className="flex justify-center items-center bg-f5 h-10">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/cart">GIỎ HÀNG</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>THÔNG TIN GIAO HÀNG</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24} className="flex justify-center mt-4">
          <Row className="w-[90%]" gutter={24}>
            <Col lg={14} span={24} className="flex flex-col gap-3">
              <p>Thông tin giao hàng</p>
              <div className="flex items-center gap-3">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <div className="flex flex-col">
                  <p className="flex gap-1">
                    <span>{state.user?.userName}</span>
                    {/* <span>(ducminh@gmail.com)</span> */}
                  </p>
                  <Link
                    to={"/auth/login"}
                    onClick={() => {
                      dispatch({
                        type: "CURRENT_USER",
                        payload: { userName: "", isLogin: false, id: null },
                      });
                      localStorage.removeItem("DucMinhTokenStore");
                    }}
                  >
                    Đăng xuất
                  </Link>
                </div>
              </div>
              <Form onFinish={onFinish}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên của bạn" },
                  ]}
                >
                  <Input className="h-10" placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                  ]}
                >
                  <Input
                    className="h-10"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ của bạn",
                    },
                  ]}
                >
                  <Input className="h-10" placeholder="Địa chỉ" />
                </Form.Item>
                <div>
                  <h2 className="text-lg">Phương thức thanh toán</h2>
                  <p className="ml-3">Thanh toán khi nhận hàng</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button
                    className="t-btn-primary"
                    onClick={() => navigate("/cart")}
                  >
                    Giỏ hàng
                  </Button>
                  <Button className="t-btn-primary" htmlType="submit">
                    Hoàn tất đơn hàng
                  </Button>
                </div>
              </Form>
            </Col>
            <Col lg={10} span={24} className="mt-4">
              {dataCart.map((item) => (
                <div className="flex items-center gap-2 mt-3" key={item.id}>
                  <div>
                    <Badge count={item.quantity}>
                      <Avatar
                        shape="square"
                        size={64}
                        src={item.productVO.images}
                      />
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-base">{item.productVO.name}</span>
                    <span className="text-xs text-[#969696]">
                      20x28 / Đen + Kính
                    </span>
                  </div>
                  <span className="text-base">
                    {new Intl.NumberFormat("vi-VN").format(
                      item.price * item.quantity
                    )}
                    đ
                  </span>
                </div>
              ))}
              <Divider />
              <div className="text-base flex justify-between">
                <span>Tạm tính</span>
                <span>{new Intl.NumberFormat("vi-VN").format(sumPrice)}đ</span>
              </div>
              <div className="text-base flex justify-between">
                <span>Phí vận chuyển tạm tính</span>
                <span>0đ</span>
              </div>
              <Divider />
              <div className="text-xl flex justify-between">
                <span>Tổng cộng</span>
                <span>
                  <span className="text-xs mr-2">VND</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat("vi-VN").format(sumPrice)}đ
                  </span>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
