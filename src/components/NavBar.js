import React, { useContext, useEffect, useMemo, useState } from "react";
import { Divider, Drawer, Dropdown, Menu, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import "./home/style.scss";
import axios from "axios";
import { AppContext } from "../App";
import {
  openNotificationSuccess,
  openNotificationFail,
} from "../components/notificaction/";

const { Title } = Typography;

const NavBar = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [dataCart, setDataCart] = useState([]);
  const [category, setCategory] = useState([]);

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

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/category/getall`
        );
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const sumPrice = useMemo(() => {
    return dataCart.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
  }, [dataCart]);

  const showDrawer = (key) => {
    setOpen(true);
    switch (key) {
      case "menu":
        setOpenMenu(true);
        break;
      case "cart":
        setOpenCart(true);
        break;
      case "search":
        setOpenSearch(true);
        break;
      default:
        break;
    }
  };

  const onClose = () => {
    setOpen(false);
    setOpenMenu(false);
    setOpenCart(false);
    setOpenSearch(false);
  };
  return (
    <div className="flex items-center justify-between h-15 fixed w-full shadow-cyan-500/50 z-10 bg-slate-300 top-0 px-4 lg:px-0">
      <Title
        className="!m-0 lg:!ml-15 !w-[265px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Tranh Dân Gian
      </Title>
      <div className="uppercase hidden lg:flex items-center justify-center gap-12 text-base font-bold">
        {category.map((data) => (
          <Link
            to={`/collections/${data.id}`}
            state={{
              id: data.id,
              name: data.name,
            }}
            key={data.id}
          >
            {data.name}
          </Link>
        ))}
      </div>

      <Space className="lg:mr-15 text-2xl flex items-center h-full">
        <span className="hover:text-blue-500 cursor-pointer hidden lg:flex items-center">
          <UserOutlined
            onClick={() => {
              if (state.user?.isLogin) {
                navigate("/auth/account");
              } else {
                navigate("/auth/login");
              }
            }}
          />
        </span>
        <span
          className="hover:text-blue-500 cursor-pointer hidden lg:flex items-center"
          onClick={() => showDrawer("search")}
        >
          <SearchOutlined />
        </span>
        <span
          className="hover:text-blue-500 cursor-pointer flex items-center"
          onClick={() => {
            if (state.user?.isLogin) {
              showDrawer("cart");
            } else {
              navigate("/auth/login");
            }
          }}
        >
          <ShoppingCartOutlined />
        </span>
        <span
          className="hover:text-blue-500 cursor-pointer flex items-center lg:hidden"
          onClick={() => showDrawer("menu")}
        >
          <MenuOutlined />
          <span className="ml-2 text-[13px] opacity-60">MENU</span>
        </span>
      </Space>
      <Drawer
        title={
          openMenu
            ? "MENU"
            : openCart
            ? "GIỎ HÀNG"
            : openSearch
            ? "TÌM KIẾM"
            : ""
        }
        placement="right"
        drawerStyle={{
          textAlign: "center",
        }}
        onClose={onClose}
        open={open}
      >
        {openSearch ? (
          <Search
            className="!w-full"
            size="large"
            placeholder="Tìm kiếm sản phẩm..."
          />
        ) : openMenu ? (
          <Menu
            mode="inline"
            defaultSelectedKeys={["SubMenu1"]}
            className="uppercase"
          >
            {category.map((data) => (
              <Menu.Item key={data.id}>{data.name}</Menu.Item>
            ))}
          </Menu>
        ) : openCart ? (
          <div>
            {dataCart.length > 0 ? (
              dataCart.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex items-center gap-4 mt-3">
                    <img
                      src={item.productVO.images}
                      alt=""
                      className="w-[70px] h-[70px]"
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-[13px] font-semibold uppercase">
                        {item.productVO.name}
                      </span>
                      <div className="flex gap-2 items-center">
                        <span className="bg-[#ededed] py-[6px] px-3 text-xs">
                          {item.quantity}
                        </span>
                        <span>
                          {new Intl.NumberFormat("vi-VN").format(item.price)}đ
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="cursor-pointer"
                    onClick={async () => {
                      try {
                        const res = await axios.delete(
                          `http://localhost:8080/api/orderitem/delete/${item.id}`
                        );
                        setDataCart((prev) =>
                          prev.filter((data) => data.id !== item.id)
                        );
                        openNotificationSuccess(
                          "Xoá sản phẩm",
                          "Bạn đã xoá sản phẩm khỏi giỏ hàng"
                        );
                      } catch (error) {
                        openNotificationFail("Xoá sản phẩm", "Có lỗi xảy ra");
                      }
                    }}
                  >
                    <CloseOutlined />
                  </span>
                </div>
              ))
            ) : (
              <h5>Hiện chưa có sản phẩm</h5>
            )}
            <Divider />
            <div className="flex justify-between items-center">
              <span>TỔNG TIỀN:</span>
              <span>{new Intl.NumberFormat("vi-VN").format(sumPrice)}đ</span>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button
                className="button-primary"
                onClick={() => {
                  onClose();
                  navigate("/cart");
                }}
              >
                XEM GIỎ HÀNG
              </button>
              <button
                className="button-primary"
                onClick={() => {
                  onClose();
                  navigate("/payment/1");
                }}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};

export default NavBar;
