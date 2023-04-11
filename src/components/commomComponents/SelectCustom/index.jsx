import React, { useEffect, useRef, useState } from "react";
import "./SelectCustom.scss";
import { ArrowDown, ChevronDown } from "react-feather";
import { v4 } from "uuid";
export const Option = (props) => {
  return (
    <li {...props} key={v4()} className="option">
      {props?.children || ""}
    </li>
  );
};
const SelectCustom = (props) => {
  const { value, setValue, children } = props;
  const optionsRef = useRef();
  const [active, setActive] = useState(false);
  const [label, setSetLabel] = useState("Lựa chọn của bạn");
  useEffect(() => {
    const nodeLists = optionsRef.current.childNodes;
    nodeLists &&
      nodeLists.forEach((el) => {
        const label = el?.innerHTML || "";
        const valueChild = el.getAttribute("value") || "";
        console.log({ label, value, valueChild });
        if (value == valueChild) {
          setSetLabel(label);
          setActive(false);
        }
      });
  }, [value, children]);
  return (
    <div
      {...props}
      className="select-menu"
      onMouseLeave={() => setActive(false)}
    >
      <div className="select-btn" onClick={() => setActive(!active)}>
        <span> {label}</span>
        <div className="icon iconDown">
          {" "}
          <ChevronDown />{" "}
        </div>
      </div>
      <ul ref={optionsRef} className={`options ${active ? "active" : ""}`}>
        {children}
      </ul>
    </div>
  );
};

export default SelectCustom;
