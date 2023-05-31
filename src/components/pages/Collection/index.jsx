import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MyCollapse from "~/components/commomComponents/Collapse";
import * as BstAPI from "~/redux/slices/BoSuuTap";
import ReactHtmlParser from "react-html-parser";
import { BASE_URL } from "~/const";
import ListProducts from "~/components/commomComponents/ListProducts";
import Filter from "~/components/pages/Products/components/FilterComponent";
const CollectionPage = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { boSuuTaps, products, loading,productsLoading, boSuuTap } = useSelector(
    (state) => state.BoSuuTap
  );
  const { slug } = useParams();
  document.title = boSuuTap?.tenBoSuuTap || "";
  useEffect(() => {
    dispatch(BstAPI.fetchBySlugBST({ slug }));
  }, [slug]);
  const fetchFnc = (params) => {
    dispatch(BstAPI.fetchGetProductByBST({ id: slug, params: { ...params } }));
  };
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <img src={BASE_URL + "wwwroot/res/BstImgs/" + boSuuTap?.img || ""} />
      <Space style={{ width: "100%" }} direction="vertical">
        <Filter fetchFnc={fetchFnc} />
        <ListProducts loading={productsLoading} items={products || []}></ListProducts>
      </Space>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ textTransform: "uppercase" }}>
          {boSuuTap && boSuuTap?.tenBoSuuTap}
        </h1>
      </div>
      <MyCollapse defaultOpen={true}>
        {ReactHtmlParser((boSuuTap && boSuuTap?.mota) || "")}
      </MyCollapse>
    </Space>
  );
};

export default CollectionPage;
