import React from "react";
import "./Button.scss";
const MyButton = ({ children, ...props }) => {
  const { icon } = props;
  return (
    <button className="MyButton" {...props}>
      <div className="Icon">{icon}</div>
      <div className="Content">{children}</div>
    </button>
  );
};

export default MyButton;
