import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as DanhMucAPI from "~/redux/slices/DanhMuc";
import "./CategoryTag.scss"
const CategoryTag = () => {
  const dispatch = useDispatch();
  const {itemsArr} =useSelector(state=>state.DanhMuc)
  useEffect(()=>
  {
    dispatch(DanhMucAPI.fetchCategoryAll({order:"most-view"}))
  }
  ,[])
  return (
    <Row gutter={[10,10]} className="CategoryTag">
      {
       

itemsArr&&itemsArr.map(link=>
  {
    return <Col className="Link" xxl={6} md={8} xs={12}>
    <Link to={`/category/${link?.slug}`}>
    {link?.tenDanhMuc}
  </Link>
    </Col>
  })
      }
      
    </Row>
  );
};

export default CategoryTag;
