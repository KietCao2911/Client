import * as Method from "~/axiosRequest/request";

export const fetchGetAllHoaDon = async () => {
  try {
    const res = await Method.Get("api/admin/DonHang");
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchGetOrderDetails = async (id) => {
  try {
    const res = await Method.Get("/api/admin/DonHang/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPutOrderDetails = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchCancelOrder = async (id) => {
  try {
    const res = await Method.Delete("/api/admin/DonHang/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
