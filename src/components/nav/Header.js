import React, { useEffect, useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";

const centerStyle = {
  position: "relative",
  display: "block",
};

const linkStyle = {
  textDecoration: "none",
};

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, cart } = useSelector((state) => ({ ...state }));

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={centerStyle}
      className="mb-4"
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
      </Item>

      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop" style={linkStyle}>
          Shop
        </Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart" style={linkStyle}>
          <Badge count={cart && cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          key="submenu"
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item key="setting:1">
              <Link to="/user/history" style={linkStyle}>
                Dashboard
              </Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item key="setting:1">
              <Link to="/admin/dashboard" style={linkStyle}>
                Dashboard
              </Link>
            </Item>
          )}

          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <Search />
    </Menu>
  );
};

export default Header;
