import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import TrangChu from "./pages/TrangChu"
const QuanTriDanhMuc = () => {


  return (
    <>
    <Outlet/>
  <Routes>
    <Route path="" element={<TrangChu/>}></Route>
  </Routes>
    </>
  );
};

export default QuanTriDanhMuc;
