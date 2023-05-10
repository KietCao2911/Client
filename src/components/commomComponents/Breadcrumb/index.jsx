import { uuidv4 } from "@firebase/util";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.scss";
import toSlug from "~/components/utils/ToSlug";
const Breadcrumb = (props) => {
  const { slug } = useParams();
  const location =  useLocation();
  const params =props?.location||location?.pathname
  const renderBreadItem = (props) => {
    let currentLink = "";
    const arrEle =params
      .split("/")
      .filter((x) => x !== "")
      .map((re) => {
        currentLink +="/"+toSlug(re);
        
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
      {/* <Link to={`/${slug}`}>{slug}</Link> */}
      {renderBreadItem()}
    </div>
  );
};

export default Breadcrumb;
