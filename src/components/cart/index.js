import { Breadcrumb, Button, Col, Row, Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { AppContext } from "../../App";
import {
  openNotificationFail,
  openNotificationSuccess,
} from "../notificaction";

const Card = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [count, setCount] = useState({});
  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    if (state.user?.id) {
      (async function () {
        const res = await axios.get(
          `http://localhost:8080/api/orderitem/getall/user/${state.user?.id}`
        );
        const obj = {};
        res.data.forEach((element, index) => {
          obj[index] = element.quantity;
        });
        setCount(obj);
        setDataCart(res.data);
      })();
    }
  }, [state.user?.id]);

  const sumPrice = useMemo(() => {
    return dataCart.reduce((accumulator, currentValue, index) => {
      return accumulator + currentValue.price * count[index];
    }, 0);
  }, [dataCart, count]);

  const updateQuantity = async (item, quantity) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/orderitem/update/${item.id}`,
        {
          quantity: quantity,
          productId: item.productVO.id,
          userId: state.user?.id,
        }
      );
    } catch (error) {}
  };

  return (
    <div className="mt-[150px]">
      <Row>
        <Col span={24} className="flex justify-center items-center bg-f5 h-10">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">TRANG CHỦ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>GIỎ HÀNG</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col
          span={24}
          center
          className="flex justify-center items-center mt-10"
        >
          <Row className="mx-5 lg:mx-[104px] w-full" gutter={[52, 52]}>
            <Col span={24} className="gutter-row">
              <div className="w-full flex flex-col justify-center items-center">
                <Typography.Title>Giỏ hàng của bạn</Typography.Title>
                <p>Có {dataCart.length} sản phẩm trong giỏ hàng</p>
                {/* <p>Giỏ hàng của bạn đang trống</p>
            <Button
              className="t-btn-primary mt-2 mb-[76px]"
              onClick={() => navigate("/collections/all")}
            >
              <ArrowLeftOutlined />
              Tiếp tục mua hàng
            </Button> */}
                {dataCart.map((data, index) => (
                  <div
                    className="w-full flex justify-between items-center relative mt-2"
                    key={data.id}
                  >
                    <div className="flex gap-5">
                      <img
                        className="w-[100px] h-[100px]"
                        src={data.productVO.images}
                        alt=""
                      />
                      <div className="flex flex-col gap-1 text-primary">
                        <p className="text-base font-bold">
                          {data.productVO.name}
                        </p>
                        <p className="text-sm">
                          {new Intl.NumberFormat("vi-VN").format(data.price)}đ
                        </p>
                        <p className="text-sm">20x28 / Đen + Kính</p>
                        <div className="flex items-center font-bold">
                          <button
                            className="w-8 h-[25px] bg-[#f5f5f5] border border-[#f5f5f5]"
                            onClick={() => {
                              if (count[index] > 1)
                                setCount((prev) => ({
                                  ...prev,
                                  [index]: prev[index] - 1,
                                }));
                              updateQuantity(data, count[index] - 1);
                            }}
                          >
                            -
                          </button>
                          <input
                            className="w-[35px] h-[25px] bg-[#fff] border border-[#f5f5f5] text-center outline-none text-xs"
                            type="text"
                            value={count[index] ?? 0}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onBlur={(e) => {
                              if (e.target.value) {
                                updateQuantity(data, Number(e.target.value));
                              }
                            }}
                            onChange={(e) =>
                              setCount((prev) => ({
                                ...prev,
                                [index]: Number(e.target.value),
                              }))
                            }
                          />
                          <button
                            className="w-8 h-[25px] bg-[#f5f5f5] border border-[#f5f5f5]"
                            onClick={() => {
                              setCount((prev) => ({
                                ...prev,
                                [index]: prev[index] + 1,
                              }));
                              updateQuantity(data, count[index] + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        className="absolute top-0 right-[15px] text-base font-bold cursor-pointer"
                        onClick={async () => {
                          try {
                            const res = await axios.delete(
                              `http://localhost:8080/api/orderitem/delete/${data.id}`
                            );
                            setDataCart((prev) =>
                              prev.filter((item) => item.id !== data.id)
                            );
                            openNotificationSuccess(
                              "Xoá sản phẩm",
                              "Bạn đã xoá sản phẩm khỏi giỏ hàng"
                            );
                          } catch (error) {
                            openNotificationFail(
                              "Xoá sản phẩm",
                              "Có lỗi xảy ra"
                            );
                          }
                        }}
                      >
                        <CloseOutlined />
                      </div>
                      <p className="text-base absolute bottom-0 right-[15px]">
                        {new Intl.NumberFormat("vi-VN").format(
                          data.price * count[index]
                        )}
                        đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={12} span={24} className="gutter-row">
              <TextArea placeholder="Ghi chú" rows={4} />
            </Col>
            <Col
              lg={12}
              span={24}
              className="gutter-row flex flex-col justify-between items-end"
            >
              <div className="flex items-center gap-1">
                Tổng tiền:{" "}
                <span className="text-3xl font-bold">
                  {new Intl.NumberFormat("vi-VN").format(sumPrice)}đ
                </span>
              </div>
              <div className="flex gap-2">
                <Button className="t-btn-primary" onClick={() => navigate("/")}>
                  Tiếp tục mua hàng
                </Button>
                <Button
                  className="t-btn-primary"
                  onClick={() => navigate("/payment/1")}
                >
                  Thanh toán
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Card;
