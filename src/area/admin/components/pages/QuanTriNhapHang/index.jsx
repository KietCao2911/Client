import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import TrangChinh from "./pages/TrangChinh";
import TrangTaoDonNhap from "./pages/TrangTaoDonNhap";
import ChiTietDonNhap from "./pages/ChiTietDonNhap";
const QuanTriNhapHang = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<TrangChinh />}></Route>
        <Route
          path="tao-moi"
          element={<TrangTaoDonNhap isCreated={true} />}
        ></Route>
        <Route
          path="/:id"
          element={<TrangTaoDonNhap isReadOnly={true} />}
        ></Route>
        <Route
          path="/:id/cap-nhat"
          element={<TrangTaoDonNhap isUpdated={true} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default QuanTriNhapHang;
