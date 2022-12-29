import { Card, Col, Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import addCart from "../../public/imgs/add-cart.png";
import "./style.scss";

const ProductItem = ({ id, data }) => {
  const navigate = useNavigate();
  return (
    <Col className="w-[50%] md:w-[33.3%] lg:w-[25%] xl:w-[20%]">
      <Card
        onClick={() => navigate(`/products/${id}`)}
        hoverable
        cover={
          <Image
            src={data?.images}
            alt=""
            className="w-full aspect-video"
            preview={false}
          />
        }
        bodyStyle={{
          marginTop: 16,
          padding: 4,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-primary flex-1">
            <h4 className="uppercase text-base single-line">{data?.name}</h4>
            <div className="flex items-center text-[13px] font-light text-black gap-1">
              <span className="uppercase text-primary">chỉ từ:</span>
              <span className="font-bold">
                {new Intl.NumberFormat("vi-VN").format(data?.price)}đ
              </span>
            </div>
          </div>
          <div className="w-[16.6%]">
            <img src={addCart} alt="" />
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
