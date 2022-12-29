import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import FeaturedProduct from "./FeaturedProduct";
import Header from "./Header";
import HomeInfo from "./HomeInfo";
import Products from "./Products";
import Service from "./Service";
import Topic from "./Topic";
import axios from "axios";
import { openNotificationFail } from "../notificaction";
import "./style.scss";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    start: 0,
    end: 10,
  });

  const getProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/product/getpage/${page.start}/${page.end}`
      );
      if (res.data) {
        setDataProduct(res.data);
      }
    } catch (error) {
      openNotificationFail(
        "Error",
        "Có lỗi xảy ra khi lấy danh sách sản phẩm",
        "red"
      );
    }
  }, [page]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);
  return (
    <div className="lg:mt-15">
      <Header />
      <Service />
      <Products data={dataProduct} title="TRANH THEO BỘ" />
      <Topic />
      <Products data={dataProduct} title="Vừa lên kệ" />
      <FeaturedProduct />
      <Products data={dataProduct} title="Được yêu thích" />
      <HomeInfo />
      <BackTop>
        <span
          style={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #000",
            borderRadius: "5px",
            width: 40,
            height: 40,
          }}
        >
          <ArrowUpOutlined />
        </span>
      </BackTop>
    </div>
  );
};

export default Home;
