import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
import { UserOutlined } from "@ant-design/icons";
import { LogIn, User, UserX } from "react-feather";
const UserHeader = () => {
  const { user } = useSelector((state) => state.XacThuc);
  return (
    <div className="UserHeader">
      {Object.keys(user).length > 0 ? (
        <Link to="/me" className="icon User">
         <User/>
        </Link>
      ) : (
        <Link to="/dang-nhap" className="icon NonUser">
          <UserX />
        </Link>
      )}
    </div>
  );
};

export default UserHeader;
