import * as Method from "~/axiosRequest/request";
export const GetAllProducts = async (params) => {
  try {
    const res = await Method.Get("/api/admin/SanPham", {params});
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetCTNXs = async (maSanPham) => {
  try {
    const res = await Method.Get("/api/admin/SanPham/GetCTNX/"+maSanPham);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetProductById = async (maSanPham) => {
  try {
    const res = await Method.Get(`/api/admin/SanPham/${maSanPham}`);
    return res;
  } catch (error) {
    throw error;
  }
};
export const PostProduct = async (body, config) => {
  try {
    const res = await Method.Post("/api/admin/SanPham", body, config);
    return res;
  } catch (error) {
    throw error;
  }
};
export const PostChildProduct = async (body, config) => {
  try {
    const res = await Method.Post("/api/admin/SanPham/PostChildSanPham", body, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const PutProduct = async (body, config) => {
  try {
    console.log({ body });
    const res = await Method.Put(`/api/admin/SanPham`, body, config);
    return res;
  } catch (error) {
    throw error;
  }
};
export const DeleteProduct = async (id) => {
  try {
    const res = await Method.Delete(`/api/admin/SanPham/${id}`);
  } catch (error) {
    throw error;
  }
};

export const DeleteChildSanPham = async (id) => {
  try {
    const res = await Method.Delete(`/api/admin/SanPham/DeleteChildSanPham/${id}`);
  } catch (error) {
    throw error;
  }
};
export const GetAllLatestProducts = async () => {
  try {
    const res = await Method.Get("/api/Home/ProductsLatesUpdate");
    return res;
  } catch (err) {
    throw err;
  }
};
export const PutCategoryProduct = async (maSP, body) => {
  try {
    const res = await Method.Post("/api/DanhMucDetails/" + maSP, body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const PostAddQty = async (body) => {
  try {
    const res = await Method.Post("/api/admin/SoLuongDetail", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const DeleteQty = async (id) => {
  try {
    const res = await Method.Delete("/api/SoLuongDetail/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};
export const Uploads = async (MaSP, MaMau, body, config) => {
  try {
    const res = await Method.Post(
      `/api/admin/SanPham/Upload/${MaSP}/${MaMau}`,
      body,
      config
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const DeleteImg = async (fileName, _id, maSP, maMau) => {
  try {
    const res = await Method.Delete(
      `/api/admin/SanPham/RemoveImg?fileName=${fileName}&_id=${_id}&maSP=${maSP}&maMau=${maMau}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const HotProducts = async () => {
  try {
    const res = await Method.Get("/api/Home/ProductsHot");
    return res;
  } catch (error) {
    throw error;
  }
};
export const SearchProducts = async (params) => {
  console.log({ params });
  try {
    const res = await Method.Get("/api/san-pham/undefined", { params });
    return res;
  } catch (error) {
    throw error;
  }
};
