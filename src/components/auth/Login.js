import { Button, Form, Image, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import bg from "../../public/imgs/slider.jpg";
import tranh from "../../public/imgs/tranh.jpg";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./style.scss";

const Login = () => {
  const { dispatch, state } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const componentClicked = () => {};

  const responseFacebook = async (res) => {
    console.log(res);
    try {
      setDisabled(true);
      const response = await axios.post(
        "http://localhost:8080/api/login/facebook",
        {
          userName: res.id,
        }
      );
      console.log(response);
      const { token, userName, id } = response.data;
      localStorage.setItem("DucMinhTokenStore", token);
      dispatch({
        type: "CURRENT_USER",
        payload: { userName: userName, isLogin: true, id: id },
      });
      navigate("/");
    } catch (error) {
      setErrorMessage(true);
      setDisabled(false);
    }
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      setDisabled(true);
      const response = await axios.post(
        "http://localhost:8080/api/login",
        values
      );
      const { token, userName, id } = response.data;
      localStorage.setItem("DucMinhTokenStore", token);
      dispatch({
        type: "CURRENT_USER",
        payload: { userName: userName, isLogin: true, id: id },
      });
      navigate("/");
    } catch (error) {
      setErrorMessage(true);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (state.user?.isLogin) {
      navigate("/");
    }
  }, [navigate, state.user]);

  return (
    <div
      style={{
        marginTop: 60,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `url(${bg})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="w-[300px] h-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      >
        <div className="flex item-center justify-center mt-10">
          <Image alt="" src={tranh} preview={false} width={100} />
        </div>
        {errorMessage && (
          <div className="text-white text-center mt-14">
            Tài khoản hoặc mật khẩu không đúng!
          </div>
        )}
        <Form className="mt-14" onFinish={onFinish}>
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Tài khoản là bắt buộc",
              },
            ]}
          >
            <Input
              className="customInput"
              prefix={<UserOutlined />}
              placeholder="Tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu là bắt buộc",
              },
            ]}
          >
            <Input.Password
              className="customInput"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <div className="px-3">
            <Form.Item>
              <Button
                loading={disabled}
                shape="round"
                htmlType="submit"
                className="!bg-[#FF3366] !w-full !h-[40px] !text-white !text-[15px] !border-none"
              >
                Đăng nhập
              </Button>
              <div className="flex flex-col gap-3 mt-3">
                <FacebookLogin
                  appId="676132227305276"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook}
                  textButton={
                    <span className="flex items-center justify-center gap-2 bg-blue-500 w-full h-[40px] text-white text-[15px] border-none rounded-[20px]">
                      <FacebookOutlined className="!text-[28px]" />{" "}
                      <span>Đăng nhập bằng Facebook</span>
                    </span>
                  }
                  cssClass="w-full"
                />
              </div>
            </Form.Item>
          </div>
          <div className="text-xs text-white flex items-center justify-center gap-2 mt-5">
            <span className="text-[#ABA8AE]">Bạn chưa có tài khoản</span>
            <Link to="/auth/register">Đăng ký</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
