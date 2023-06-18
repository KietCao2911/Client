import React from "react";
import { Table, Form, Image, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import BSTSlice, { fetchAllBST } from "~/redux/slices/BoSuuTap";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, Route, Routes } from "react-router-dom";
import { BASE_URL } from "~/const/index";
import TrangChinh from "./pages/TrangChinh";
import BSTForm from "./pages/Form/BSTForm";
import CreateBST from "./pages/CreateBST";
const QuanTriBST = () => {
  document.title = "Quản lý  bộ sưu tập";

  return (
    <Routes>
      <Route path="" element={<TrangChinh />}></Route>
      <Route
        path=":id"
        element={<BSTForm isReadOnly={true}  />}
      ></Route>
      <Route
        path=":id/chinh-sua"
        element={<BSTForm isUpdated={true} />}
      ></Route>
      <Route
        path="tao-moi"
        element={<CreateBST />}
      ></Route>
    </Routes>
  );
};

export default QuanTriBST;
