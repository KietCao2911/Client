import React from "react";
import { Input, notification } from "antd";

import XacThucSlice, * as ApiXacThuc from "~/redux/slices/XacThuc";
import { Route, Routes } from "react-router-dom";
import PhoneForm from "./components/PhoneForm/PhoneForm";
import Verify from "./components/Verify";
const { Search } = Input;
const PhoneOPT = () => {
  return (
    <div >
      <Routes>
        <Route path="" element={<PhoneForm/>}></Route>
      </Routes>
    </div>
  );
};

export default PhoneOPT;
