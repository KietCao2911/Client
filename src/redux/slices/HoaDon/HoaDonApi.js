import * as Method from "~/axiosRequest/request";

export const fetchGetAllHoaDon = async (params) => {
  try {
    const res = await Method.Get("api/admin/DonHang",{params});
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
    const res = await Method.Put("/api/admin/DonHang/HuyDon", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPutHoaDon = async(body)=>
{
  try {
    const res = await Method.Put("/api/admin/DonHang", body);
    return res;
  } catch (error) {
    throw error;
  }
}
export const fetchPutTraHang = async(body)=>
{
  try {
    const res = await Method.Put("/api/admin/DonHang/TraHang", body);
    return res;
  } catch (error) {
    throw error;
  }
}
export const fetchGetStatusOrder = async(orderID,body)=>
{
  try {
    const res = await Method.Post(`/api/HoaDon/CheckStatusOrder/${orderID}`,body);
    return res;
  } catch (error) {
    throw error;
  }
}