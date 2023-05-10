import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "~/components/commomComponents/ListProducts";
import * as SanPhamUserAPI from "~/redux/slices/SanPham/Users/index";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const { productsLatest, loading, trendingsProduct } = useSelector(
    (state) => state.SanPham
  );
  useEffect(() => {
    dispatch(
      SanPhamUserAPI.fetchGetAllProductsUser({ params: { sort: "most-view" } })
    );
  }, []);
  return (
    <div>
      <ListProducts       
          // type={"slider"}
 loading={loading} items={trendingsProduct} />
    </div>
  );
};

export default TrendingProducts;
