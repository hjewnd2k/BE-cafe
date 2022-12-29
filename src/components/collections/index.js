import {
  Breadcrumb,
  Col,
  Empty,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductItem from "../home/ProductItem";

const Collection = () => {
  const [breadcrumb, setBreadcrumb] = useState("");
  const { state } = useLocation();
  const [prodcuts, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.name) {
      setBreadcrumb(state.name);
      (async function () {
        try {
          setLoading(true);
          const res = await axios.get(
            `http://localhost:8080/api/product/category/get/${state.id}`
          );
          setProducts(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [state.id, state.name]);

  return (
    <Spin spinning={loading}>
      <div className="mt-[150px]">
        <Row>
          <Col
            span={24}
            className="flex justify-center items-center bg-f5 h-10"
          >
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">TRANG CHỦ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/collections/all">TRANH RỜI</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="uppercase">
                {breadcrumb}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={24} className="flex justify-center items-center mt-4">
            <Space direction="vertical" align="center">
              <Typography.Title className="!text-2xl !font-bold">
                {breadcrumb}
              </Typography.Title>
              <Select
                defaultValue="lucy"
                style={{
                  width: 130,
                }}
              >
                <Select.Option value="jack">Tăng giần</Select.Option>
                <Select.Option value="lucy">Giảm dần</Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>
        <Row gutter={[15, 15]} className="px-[15px] mt-[52px]">
          {prodcuts.length > 0 ? (
            prodcuts.map((data) => (
              <ProductItem id={data.id} data={data} key={data.id} />
            ))
          ) : (
            <div className="w-full justify-center">
              <Empty
                description={"Hiện chưa có loại tranh này"}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </Row>
        <div className="flex justify-center items-center mt-10 mb-[52px]">
          <Pagination
            defaultPageSize={20}
            size="small"
            total={prodcuts.length}
            responsive
          />
        </div>
      </div>
    </Spin>
  );
};

export default Collection;
