import { uuidv4 } from "@firebase/util";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.scss";
const Breadcrumb = (props) => {
  const { slug } = useParams();
  const location = useLocation();

  const renderBreadItem = () => {
    let currentLink = "";
    const arrEle = location.pathname
      .split("/")
      .filter((x) => x !== "")
      .map((re) => {
        currentLink = +`/${re}`;
        return (
          <Link key={uuidv4()} to={currentLink}>
            {re}
          </Link>
        );
      });
    return arrEle;
  };

  return (
    <div className="Breadcrumb" {...props}>
      <Link to="/">Home </Link>
      {/* <Link to={`/${slug}`}>{slug}</Link> */}
      {renderBreadItem()}
    </div>
  );
};

export default Breadcrumb;
