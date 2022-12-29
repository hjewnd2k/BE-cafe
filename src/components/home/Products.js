import { Button, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const Products = ({ title, data }) => {
  return (
    <div>
      <div className="text-center my-15">
        <Typography.Title level={2}>
          <Link
            to={"/"}
            className="!text-primary font-bold hover:!text-blue-400 uppercase"
          >
            {title}
          </Link>
        </Typography.Title>
      </div>
      <Row gutter={[15, 15]} className="px-[15px]">
        {data?.map((item) => (
          <ProductItem id={item.id} data={item} key={item.id} />
        ))}
      </Row>
      <div className="text-center my-10">
        <Button className="bg-primary text-white h-9 w-32">XEM THÊM</Button>
      </div>{" "}
    </div>
  );
};

export default Products;
