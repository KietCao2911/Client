import * as Method from "~/axiosRequest/request";
//Nhập kho
export const fetchPutThanhToan = async (body) => {
  try {
    const res = await Method.Put("/api/PhieuNhaps/ThanhToan", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Nhập kho
export const fetchPutNhapKho = async (body) => {
  try {
    const res = await Method.Put("/api/PhieuNhaps/NhapKho", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Phiếu nhập
export const fetchGetAllPhieuNhap = async () => {
  try {
    const res = await Method.Get("/api/PhieuNhaps");
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchGetPhieuNhapID = async (id) => {
  try {
    const res = await Method.Get("/api/PhieuNhaps/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPostPhieuNhap = async (body) => {
  try {
    const res = await Method.Post("/api/PhieuNhaps", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPutPhieuNhap = async (body) => {
  try {
    const res = await Method.Put("/api/PhieuNhaps/ChinhSuaPhieuNhap", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Chi tiết phiếu nhập
export const fetchGetAllCTPN = async (id) => {
  try {
    const res = await Method.Get("/api/admin/ChiTietNhapHang/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPostCTPN = async (body) => {
  try {
    const res = await Method.Post("/api/admin/ChiTietNhapHang", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const FetchSearch = async (s) => {
  try {
    const res = await Method.Get("/api/admin/ChiTietNhapHang/search/" + s);
    return res;
  } catch (error) {
    throw error;
  }
};
