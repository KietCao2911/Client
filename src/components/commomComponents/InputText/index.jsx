import React, { memo, useMemo } from "react";
import { useState } from "react";
import "./InputText.scss";
import {
  AlertOutlined,
  CloseCircleFilled,
  CloseOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import CustomSpin from "~/components/CustomSpin";
import { Spin, Tooltip } from "antd";
import MyButton from "../Button";
import convertVND from "~/components/utils/ConvertVND";
import { AlertCircle, AlertTriangle, Search, User, X } from "react-feather";
import LoadingElement from "../LoadingElement";

export const InputText = (props) => {
  const {
    label,
    icon,
    onChange,
    type,
    loading
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <div
      className="InputText"
      onMouseLeave={type == "search" ? () => setOpen(false) : null}
    >
      {/* <div className="icon icon--remove"> <X onClick={onClickClear}/> </div> */}
      {/* <div className="icon icon--error"> <AlertTriangle/> </div> */}
      <input
      disabled={loading}
        autoComplete="off"
        type={"text"}
        placeholder=" "
        onChange={() => onChange && onChange()}
        {...props}
        onMouseEnter={type == "search" ? () => setOpen(true) : null}
      />

      <label htmlFor="#">
        {label || "Tên"}
        {/* <Tooltip title="Làm này làm kia"><ExclamationCircleOutlined /></Tooltip> */}
      </label>
    {icon&&!loading&&  <div className="icon"> 
    {icon}
       </div>}
       {loading&& <div className="loading">
      <LoadingElement/>

      </div>}
     
      {/* {icon&&!loading&&icon} */}
    </div>
  );
};
export default memo(InputText);
