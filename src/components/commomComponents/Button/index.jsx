import React from "react";
import "./Button.scss";
import LoadingElement from "../LoadingElement";
const MyButton = ({ children, ...props }) => {
  const { icon ,type,loading} = props;
  return (
    <button  disabled={loading} className={`MyButton ${type=="primary"?"primary":""}`} {...props}>
      {icon&&!loading&&      <div className="Icon">{icon}</div>
}
    {loading&&<div className="Icon"><LoadingElement/></div>
}
      <div className="Content">{children}</div>
    </button>
  );
};

export default MyButton;
