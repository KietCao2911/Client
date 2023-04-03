import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BranchsAPI from "~/redux/slices/Branch/BranchSlice";
import { SelectInput } from "../SelectInput";
import { v4 } from "uuid";
import SelectCustom, { Option } from "../SelectCustom";
const Location = () => {
  const { branchs } = useSelector((state) => state.Branch);
  const dispatch = useDispatch();
  const [Loc, setLoc] = useState(() => {
    return window.localStorage.getItem("location");
  });
  const [visiabe, setVisiable] = useState(() => {
    const location = window.localStorage.getItem("location");

    return location ? false : true;
  });
  console.log({ Loc });

  const handleChangeLocation = (e) => {
    setLoc(e);
    window.localStorage.setItem("location", e);
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
      <SelectCustom value={Loc} setValue={setLoc}>
        {branchs &&
          branchs.map((branch) => {
            return (
              <Option
                onClick={() => handleChangeLocation(branch?.maChiNhanh)}
                value={branch?.maChiNhanh}
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
