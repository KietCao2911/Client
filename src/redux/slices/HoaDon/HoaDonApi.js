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
export const fetchPutXuatKho = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang/XuatKho", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPutDaGiaoHang = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang/DaGiaoHang", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchThanhToan = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang/ThanhToan", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPUTHoanTien = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang/HoanTien", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchCancelOrder = async (body) => {
  try {
    const res = await Method.Put("/api/admin/DonHang/TraHang", body);
    return res;
  } catch (error) {
    throw error;
  }
};
