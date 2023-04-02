import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BranchsAPI from "~/redux/slices/Branch/BranchSlice";
import { SelectInput } from "../SelectInput";
import { v4 } from "uuid";
const Location = () => {
  const { branchs } = useSelector((state) => state.Branch);
  const dispatch = useDispatch();
  const [visiabe, setVisiable] = useState(() => {
    const location = window.localStorage.getItem("location");

    return location ? false : true;
  });
  console.log({ branchs });

  const handleChangeLocation = (e) => {
    window.localStorage.setItem("location", e.target.value);
    window.location.replace("/");
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
      title="Vui lòng chọn cửa hàng gần bạn"
      open={visiabe}
    >
      <SelectInput
        defaultValue={null}
        onChange={(e) => handleChangeLocation(e)}
      >
        <option value={null}>Vui lòng chọn chi nhánh</option>
        {branchs &&
          branchs.map((opt) => {
            return (
              <option key={v4()} value={opt?.maChiNhanh?.trim()}>
                {opt?.tenChiNhanh}
              </option>
            );
          })}
      </SelectInput>
    </Modal>
  );
};

export default Location;
