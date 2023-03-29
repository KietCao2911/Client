import React, { useState } from "react";
import { X } from "react-feather";
import "./CustomDrawer.scss";
const CustomDrawer = (props) => {
  const { open, onClose, children, setOpen } = props;

  const handleClose = (visiable) => {
    // setVisiable(false);
  };
  return (
    <div className={`Drawer ${open ? "active" : ""}`}>
      <div onClick={() => setOpen(false)} className="icon iconClose">
        <X />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default CustomDrawer;
