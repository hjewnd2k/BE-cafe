import React, { useContext, useState } from "react";
import { Divider, Select, Typography } from "antd";
import { AppContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Option } = Select;

const ContentProduct = ({ data }) => {
  const { dispatch } = useContext(AppContext);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  console.log(data);
  const hanldeSubmit = async () => {
    try {
      const token = localStorage.getItem("DucMinhTokenStore");
      const option = {
        method: "GET",
        url: `http://localhost:8080/api/getme?token=${token}`,
      };
      const response = await axios(option);
      console.log(response);
      if (response.data) {
        const { username, id } = response.data;
        dispatch({
          type: "CURRENT_USER",
          payload: { userName: username, isLogin: true, id: id },
        });

        const res = await axios.post(
          "http://localhost:8080/api/orderitem/insert",
          {
            quantity: count,
            productId: data.id,
            userId: id,
          }
        );
        navigate("/cart");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("tes");
      navigate("/auth/login");
    }
  };
  return (
    <div>
      <Title className="!text-[26px] !font-normal">{data?.name}</Title>
      <Divider className="!my-1" />
      <Title className="!text-[18px] !font-bold" level={2}>
        {new Intl.NumberFormat("vi-VN").format(data?.price)}đ
      </Title>
      <Divider className="!my-1" />
      <div className="text-sm font-bold">Kích thước (Centimet)</div>
      <Select defaultValue="20x28" className="w-full text-sm font-bold my-2">
        <Option value="20x28">20x28</Option>
        <Option value="30x42">30x42</Option>
        <Option value="40x56">40x56</Option>
      </Select>
      <div className="text-sm font-bold">Viền khung + Vật liệu</div>
      <Select defaultValue="lucy" className="w-full text-sm font-bold my-2">
        <Option value="jack">Đen + Kính</Option>
        <Option value="lucy">Trắng + Kính</Option>
        <Option value="Yiminghe">Gỗ + K</Option>
      </Select>
      <div className="flex items-center font-bold">
        <button
          className="w-8 h-8 bg-[#f5f5f5] border border-[#f5f5f5]"
          onClick={() => {
            if (count > 1) setCount(count - 1);
          }}
        >
          -
        </button>
        <input
          className="w-[70px] h-8 bg-[#fff] border border-[#f5f5f5] text-center outline-none"
          type="text"
          value={count}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          className="w-8 h-8 bg-[#f5f5f5] border border-[#f5f5f5]"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
      <button
        className="mt-3 uppercase text-white bg-[#b9a38d] hover:bg-transparent border hover:text-black border-[#b9a38d] text-xs font-bold h-[50px] w-full"
        onClick={hanldeSubmit}
      >
        Thêm giỏ hàng
      </button>
      <div className="mt-4">
        <p className="font-bold mt-4">
          GIÁ ĐÃ BAO GỒM TRANH & KHUNG VỚI 2 TUỲ CHỌN HOÀN THIỆN:
        </p>
        <p className="font-bold">1. TRANH KÍNH:</p>
        <p>
          Tranh được in kỹ thuật số trên trên giấy in ảnh cao cấp sắc nét và bền
          màu. Khung tranh dày 3cm, bản 1.5cm được làm từ gỗ tự nhiên thay vì
          khung nhựa phổ biến trên thị trường, kính với độ dày 2mm đảm bảo an
          toàn về độ nhẹ khi treo, đồng thời tận dụng sự sang trọng của chất
          liệu kính.
        </p>
        <p className="mt-4">
          <span className="font-bold">*Lưu ý:</span> Đối với tranh giao đến
          những địa chỉ bên ngoài Sài Gòn, Cyantific sẽ thay kính bằng acrylic
          với độ dày và thẩm mỹ tương đương. Acrylic trong suốt thay kính dễ lắp
          đặt, bảo quản thuận tiện, nhẹ và an toàn trước mọi nguy cơ khách quan
          khi di vận chuyển.
        </p>
        <p className="font-bold mt-4">2. TRANH CANVAS: </p>
        <p>
          Tranh được in trên vải canvas, cố định vào tấm nền và được viền bằng
          khung gỗ thông dày 3cm, bản mỏng 0.5cm. Ưu điểm của tranh canvas là
          không bị phản chiếu, an toàn trong vận chuyển xa, viền khung mỏng đồng
          thời nhẹ và dễ lắp đặt. Do đặc thù của dòng tranh canvas nên tác phẩm
          không được bảo vệ bằng kính, Cyantific đề xuất bạn không nên tiếp xúc
          trực tiếp hoặc lau chùi tác phẩm bằng khăn giấy ướt hoặc chất lỏng.
        </p>
        <p className="font-bold mt-4">
          Với thiết kế cập nhật và tính ứng dụng cao, tranh của Cyantific có thể
          dễ dàng kết hợp với các phong cách trang trí hiện nay. Để hiểu thêm về
          khung tranh và kích thước vui lòng xem trang này.
        </p>
        <div className="mt-6 mb-8">
          <img
            src="https://file.hstatic.net/1000340829/file/footer_icons-01-01_c97c09b5e6694b41aef67fbdfe2f7d1c.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ContentProduct;
