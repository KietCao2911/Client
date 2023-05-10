import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BranchsAPI from "~/redux/slices/Branch/BranchSlice";
import { SelectInput } from "../SelectInput";
import { v4 } from "uuid";
import SelectCustom, { Option } from "../SelectCustom";
const Location = ({visiabe,setVisiable}) => {
  const { branchs } = useSelector((state) => state.Branch);
  const dispatch = useDispatch();
  const [Loc, setLoc] = useState(() => {
    return JSON.parse(window.localStorage.getItem("location")) || {};
  });
  const handleChangeLocation = (id, name) => {
    const params = { maChiNhanh: id, tenChiNhanh: name };
    window.localStorage.removeItem("cart")
    setLoc({ ...params });
    const localString = JSON.stringify(params);
    window.localStorage.setItem("location", localString);
    window.location.reload();
  };
  useEffect(() => {
    dispatch(BranchsAPI.fetchGetBranch());
  }, []);
  return (
    <Modal
      cancelButtonProps={{
        style: {
          display: "none",
        },
      }}
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      title="Vui lòng chọn chi nhánh gần bạn"
      open={visiabe}
      onCancel={()=>setVisiable(false)}
    >
      <SelectCustom value={Loc?.maChiNhanh?.trim()||""} setValue={setLoc}>
        {branchs &&
          branchs.map((branch) => {
            return (
                   <Option
                key={v4()}
                onClick={() =>
                  handleChangeLocation(branch?.maChiNhanh.trim(), branch?.tenChiNhanh)
                }
                value={branch?.maChiNhanh.trim()}
              >
                {branch?.tenChiNhanh}{" "}
              </Option>
            );
          })}
      </SelectCustom>
    </Modal>
  );
};

export default Location;
