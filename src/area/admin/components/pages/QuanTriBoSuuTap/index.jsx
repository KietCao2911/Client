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
const QuanTriBST = () => {
  document.title = "Quản lý  bộ sưu tập";

  return (
    <Routes>
      <Route path="" element={<TrangChinh />}></Route>
      <Route
        path=":id"
        element={<BSTForm isEdit={false} isUpdate={true} />}
      ></Route>
      <Route
        path=":id/chinh-sua"
        element={<BSTForm isUpdate={true} isEdit={true} />}
      ></Route>
      <Route
        path="tao-moi"
        element={<BSTForm isUpdate={false} isEdit={true} />}
      ></Route>
    </Routes>
  );
};

export default QuanTriBST;
