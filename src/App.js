import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Forgot from "./pages/auth/forgot";
import Account from "./pages/auth/account";
import Search from "antd/lib/input/Search";
import Product from "./pages/products";
import Cart from "./pages/cart";
import Collections from "./pages/collections";
import Payment from "./pages/payment";
import AppReducer from "./reducer/AppReducer";
import { createContext, useCallback, useEffect, useReducer } from "react";
import axios from "axios";

export const AppContext = createContext();

function App() {
  const initialState = { user: null, products: [] };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const checkCurrentUser = useCallback(async () => {
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
      }
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app overflow-x-hidden">
        <NavBar />
        <div className="mt-16 px-2 lg:hidden mb-1">
          <Search placeholder="Tìm kiếm sản phẩm" className="!bg-[#f5f5f5]" />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/forgot" element={<Forgot />} />
          <Route path="auth/account" element={<Account />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="collections/:type" element={<Collections />} />
          <Route path="payment/:id" element={<Payment />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
