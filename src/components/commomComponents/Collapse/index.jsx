import React from "react";
import "./Collapse.scss";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
const MyCollapse = (props) => {
  const { Icon, children, label, defaultOpen } = props;
  const [open, setOpen] = useState(defaultOpen ? true : false);
  return (
    <section className="MyCollapse">
      <div className="labelGroup" onClick={() => setOpen(!open)}>
        <h3 className="label">{label}</h3>
        <div className="Icon Icon-Down">
          {open ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
      <div className={`Content ${open ? "active" : ""}`}>{children}</div>
    </section>
  );
};

export default MyCollapse;
