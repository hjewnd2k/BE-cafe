import { Col, Divider, Row, Table, Typography } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const { Title, Text } = Typography;

const Account = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{moment(date).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (price) => (
        <span>{new Intl.NumberFormat("vi-VN").format(price)}đ</span>
      ),
    },
    {
      title: "Tên người đặt",
      dataIndex: "shipName",
      key: "shipName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  useEffect(() => {
    if (state.user?.id) {
      (async function () {
        try {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:8080/api/order/user/getall/${state.user?.id}`
          );
          setData(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [state.user?.id]);

  return (
    <div className="mt-[100px]">
      <div className="text-center ">
        <Title className="!text-[45px] !font-bold !text-[#353535]">
          Tài khoản của bạn
        </Title>
      </div>
      <Divider />
      <Row className="!max-w-5xl mx-auto px-3 lg:px-0">
        <Col span={24} lg={6} className="flex flex-col">
          <span className="text-sm font-bold mb-7 uppercase">Tài khoản</span>
          <ul className="list-disc pl-4">
            <li>Thông tin tài khoản</li>
            <li>
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
            </li>
          </ul>
        </Col>
        <Col span={24} lg={18}>
          <span className="text-sm font-bold mb-7 uppercase">
            Thông tin tài khoản
          </span>
          <Divider />
          <p className="text-base font-medium">{state.user?.userName}</p>
          <p className="mt-2">Việt Nam</p>
          <div className="mt-4">
            <Text className="!text-sm !font-bold">
              DANH SÁCH ĐƠN HÀNG MỚI NHẤT
            </Text>
            <Divider />
            <Table
              scroll={{ x: 650 }}
              columns={columns}
              dataSource={data}
              loading={loading}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
