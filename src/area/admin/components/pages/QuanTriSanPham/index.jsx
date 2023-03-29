import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SmileOutlined,
  IssuesCloseOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import ThemSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/ThemSanPham";
import CapNhatSanPham from "~/area/admin/components/pages/QuanTriSanPham/components/CapNhatSanPham";
import { Delete, Get } from "~/area/admin/components/api/SanPham/";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
import { v4 } from "uuid";
import TrangChinh from "./pages/TrangChinh";
import CreateProduct from "./pages/ThemSanPham";
import UpdateProduct from "./pages/CapNhat";
import ChiTiet from "./pages/ChiTiet"
import "./TrangSanPham.scss"
import MyButton from "~/components/commomComponents/Button";

const QuanTriSanPham = () => {
  const dispatch = useDispatch();
  const { products, product, loading, totalRow } = useSelector(
    (state) => state.SanPham
  );

  return (
    <div className="TrangSanPham">

          <Routes>
            <Route path="" element={<TrangChinh/>}></Route>
            <Route path="tao-moi" element={<CreateProduct/>}></Route>
            <Route path="/:maSP/*" element={<ChiTiet/>}></Route>
          </Routes>
    </div>
  );
};

export default QuanTriSanPham;
