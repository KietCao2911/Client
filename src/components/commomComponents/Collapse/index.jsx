import React from "react";
import "./Collapse.scss";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Rate, Space } from "antd";
import { Star } from "react-feather";
const MyCollapse = (props) => {
  const { Icon, children, label, defaultOpen } = props;
  const [open, setOpen] = useState(defaultOpen ? true : false);
  return (
    <section className="MyCollapse" {...props}>
      <div className="labelGroup" onClick={() => setOpen(!open)}>
        <h3 className="label">{label}</h3>
        <div className="Icon Icon-Down">
          {/* <Rate style={{color:"black"}} value={5}/> */}
         <Space style={{width:"100%"}}>
        <>
        {Icon&&Icon}
          {open ? <UpOutlined /> : <DownOutlined />}
          
          </>
         </Space>
        </div>
      </div>
      <div className={`Content ${open ? "active" : ""}`}>{children}</div>
    </section>
  );
};

export default MyCollapse;
