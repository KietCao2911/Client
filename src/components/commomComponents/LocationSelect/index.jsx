import { Modal, notification } from "antd";
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
    return JSON.parse(window.localStorage.getItem("location")) || {};
  });
  const [visiabe, setVisiable] = useState(() => {
    const location = window.localStorage.getItem("location");

    return location ? false : true;
  });
  const handleChangeLocation = (id, name) => {
    const params = { maChiNhanh: id, tenChiNhanh: name };
    setLoc({ ...params });
    const localString = JSON.stringify(params);
    window.localStorage.setItem("location", localString);
    window.location.reload();
  };
  useEffect(() => {
   if(Object.keys(Loc).length>0)
   {
    notification.open({
      message: "Bạn đang mua sắm tại  " + Loc?.tenChiNhanh || "",
      type: "info",
    });
   }
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
    >
      <SelectCustom value={Loc} setValue={setLoc}>
        {branchs &&
          branchs.map((branch) => {
            return (
              <div key={v4()}>
                   <Option
                
                onClick={() =>
                  handleChangeLocation(branch?.maChiNhanh, branch?.tenChiNhanh)
                }
                value={branch?.maChiNhanh}
              >
                {branch?.tenChiNhanh}{" "}
              </Option>
              </div>
            );
          })}
      </SelectCustom>
    </Modal>
  );
};

export default Location;
