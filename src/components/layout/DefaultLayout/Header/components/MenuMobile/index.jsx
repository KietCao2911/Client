import { UserOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import UserHeader from "../UserHeader";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuMobile = ({ menuMobileOpen, setMenuMobileOpen }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.DanhMuc);
  const { user } = useSelector((state) => state.XacThuc);
  const [data, setData] = useState([]);
  const handleRenderItems = (arr) => {
    const temp =
      arr &&
      arr.map((item) => {
        return getItem(
          <Link to={`/category/${item.slug.trim()}`}>{item?.tenDanhMuc}</Link>,
          item.id,
          null,
          handleRenderItems(item.children || []),
          null
        );
      });
    return temp;
  };

  return (
    <Drawer
      open={menuMobileOpen}
      onClose={() => setMenuMobileOpen(false)}
      placement="left"
      className="MenuMobile"
      getContainer={false}
    >
      <Menu items={handleRenderItems(items) || []} mode={"inline"} />
      {Object.keys(user).length > 0 && (
        <Link to={"/me"}>
          {" "}
          <MyButton style={{ border: "unset" }} Icon={<UserOutlined />}>
            Người dùng : {user.userName}
          </MyButton>
        </Link>
      )}
    </Drawer>
  );
};

export default MenuMobile;
