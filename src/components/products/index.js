import { Col, Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import ContentProduct from "./ContentProduct";
import Slider from "./Slider";
import axios from "axios";

// const dataImage = [
//   "https://toigingiuvedep.vn/wp-content/uploads/2021/07/hinh-anh-nui-dep-o-bac-my.jpg",
//   "https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-anh-nui-rung_094416829.jpg",
//   "https://thuviendohoa.vn/2020/upload/images/items/hinh-anh-ngon-nui-dep-609_2.jpg",
//   "https://kyluc.vn/Userfiles/Upload/images/Download/2018/4/20/f0ebeb619f4d448d8440026af67a1941.jpg",
//   "https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-anh-nui-rung_094416829.jpg",
//   "https://thuviendohoa.vn/2020/upload/images/items/hinh-anh-ngon-nui-dep-609_2.jpg",
//   "https://kyluc.vn/Userfiles/Upload/images/Download/2018/4/20/f0ebeb619f4d448d8440026af67a1941.jpg",
//   "https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-anh-nui-rung_094416829.jpg",
//   "https://toigingiuvedep.vn/wp-content/uploads/2021/07/hinh-anh-nui-dep-o-bac-my.jpg",
//   "https://img4.thuthuatphanmem.vn/uploads/2020/08/28/hinh-anh-nui-rung_094416829.jpg",
// ];
const Product = () => {
  const { productId } = useParams();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (productId) {
      (async function () {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/product/get/${productId}`
          );
          console.log(res);
          if (res.status === 200) {
            setData(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [productId]);

  return (
    <div className="mt-[100px] mx-2">
      <Row gutter={8}>
        <Col lg={16} span={24}>
          <Slider dataImage={[data?.images]} />
        </Col>
        <Col lg={8} span={24}>
          <ContentProduct data={data} />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
