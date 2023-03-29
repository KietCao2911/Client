import * as Method from "~/axiosRequest/request";
const location = window.localStorage.getItem("location") || "CN01";
export const GetAllProducts = async (params) => {
  try {
    const res = await Method.Get(`/api/SanPham/GetAll`, { params });
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetProduct = async (slug) => {
  try {
    const res = await Method.Get(`/api/SanPham/Get/${slug}`);
    return res;
  } catch (error) {
    throw error;
  }
};
