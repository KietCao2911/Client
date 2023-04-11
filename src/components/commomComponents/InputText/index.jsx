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
import { AlertCircle, AlertTriangle, X } from "react-feather";

export const InputText = (props) => {
  const {
    label,
    textAdd,
    iconAdd,
    handleClickAdd,
    listResult,
    onChange,
    type,
    children,
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
      {/* {error&& <span className='error'>{error}</span>} */}
      {/* {!loading? <CloseOutlined className='IconClose' onClick={onClickClear}/>: <div className='IconClose'><Spin /></div>} */}
    </div>
  );
};
export default InputText;
