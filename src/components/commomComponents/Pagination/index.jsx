import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import "./Pagination.scss";
const itemLink = (props) => {
  return (
    <li>
      <Link to="">{props?.value}</Link>
    </li>
  );
};
const CustomPagination = (props) => {
  const { pageSize, current, total } = props;
  const [items, setItems] = useState(pageSize || 5);
  const itemsUI = () => {
    let elements = [];
    for (let i = 0; i < items; i++) {
      elements.push(<itemLink value={i} />);
    }
    return elements;
  };
  useEffect(() => {
    console.log({ items: itemsUI() });
  }, [props]);
  return (
    <div className="Pagination">
      <ul>
        <li>
          {" "}
          <Link to="">
            {" "}
            <ArrowLeft />{" "}
          </Link>
        </li>
        {itemsUI &&
          itemsUI.length > 0 &&
          itemsUI().map((item) => {
            return item;
          })}
        <li>
          <Link to="">
            {" "}
            <ArrowRight />{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomPagination;
