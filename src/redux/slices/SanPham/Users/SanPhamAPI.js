import * as Method from "~/axiosRequest/request";
const location = JSON.parse(window.localStorage.getItem("location")) || {};
export const GetAllProducts = async (params) => {
  try {
    const res = await Method.Get(
      `/api/SanPham/GetAll/` + location?.maChiNhanh?.trim(),
      { params }
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetProduct = async (slug) => {
  try {
    const res = await Method.Get(
      `/api/SanPham/Get/${slug}/` + location?.maChiNhanh?.trim()
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const GetQTY = async (maSanPham) => {
  try {
    const res = await Method.Get(
      `/api/SanPham/GetQTY/` + maSanPham + "/" + location?.maChiNhanh?.trim()
    );
    return res;
  } catch (error) {
    throw error;
  }
};
