import * as request from "~/axiosRequest/request";

export const getALLSize = async () => {
  try {
    const res = await request.Get("/api/Sizes");
    return res;
  } catch (error) {
    return error;
  }
};
export const getGetQty =  async (maSanPham,maMau,idSize) => {
  try {
    const res = await request.Get(`/api/SoLuongDetail/GetQty/${maSanPham}/${maMau}/${idSize}`);
    return res;
  } catch (error) {
    return error;
  }
};
