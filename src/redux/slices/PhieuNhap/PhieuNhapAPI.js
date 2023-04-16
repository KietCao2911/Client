import * as Method from "~/axiosRequest/request";
//Hoàn tiền
export const fetchPutHoanTien = async (body) => {
  try {
    const res = await Method.Put("/api/admin/PhieuNhaps/HoanTien", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Thanh toán
export const fetchPutThanhToan = async (body) => {
  try {
    const res = await Method.Put("/api/admin/PhieuNhaps/ThanhToan", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Trả hàng
export const fetchPutTraHang = async (body) => {
  try {
    const res = await Method.Put("/api/admin/PhieuNhaps/TraHang", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Nhập kho
export const fetchPutNhapKho = async (body) => {
  try {
    const res = await Method.Put("/api/admin/PhieuNhaps/NhapKho", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Phiếu nhập
export const fetchGetAllPhieuNhap = async () => {
  try {
    const res = await Method.Get("/api/admin/PhieuNhaps");
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchGetPhieuNhapID = async (id) => {
  try {
    const res = await Method.Get("/api/admin/PhieuNhaps/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPostPhieuNhap = async (body) => {
  try {
    const res = await Method.Post("/api/admin/PhieuNhaps", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPutPhieuNhap = async (body) => {
  try {
    const res = await Method.Put("/api/admin/PhieuNhaps/ChinhSuaPhieuNhap", body);
    return res;
  } catch (error) {
    throw error;
  }
};
//Chi tiết phiếu nhập
export const fetchGetAllCTPN = async (id) => {
  try {
    const res = await Method.Get("/api/admin/admin/ChiTietNhapHang/" + id);
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
