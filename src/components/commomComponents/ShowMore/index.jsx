import React, { useState } from "react";
import "./ShowMore.scss";

const ShowMore = ({ children, height }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="Showmore">
      <div className={`content ${show ? "active" : ""}`}>{children}</div>
      <div className="showMoreBtn" onClick={() => setShow(!show)}>
        {!show ? "Xem thêm" : "Ẩn bớt"}
      </div>
    </div>
  );
};

export default ShowMore;
