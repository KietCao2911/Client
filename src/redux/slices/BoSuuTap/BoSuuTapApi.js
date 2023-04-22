import * as request from "~/axiosRequest/request";

export const GetBSTBySlug = async (slug) => {
  try {
    const res = await request.Get("/api/BoSuuTap/" + slug);
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetAllBSTUSER = async (params) => {
  try {
    const res = await request.Get("/api/BoSuuTap", params);
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetAllBST = async (params) => {
  try {
    const res = await request.Get("/api/admin/BoSuuTap", {params});
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetProductByBST = async (id, params) => {
  try {
    const res = await request.Get("/api/BoSuuTap/" + id + "/products", {
      params,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetBSTById = async (id) => {
  try {
    const res = await request.Get("/api/admin/BoSuuTap/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};
export const PostBST = async (body) => {
  try {
    const res = await request.Post("/api/admin/BoSuuTap", body);
    return res;
  } catch (err) {
    throw err;
  }
};
export const PutBST = async (id, body) => {
  try {
    const res = await request.Put("/api/admin/BoSuuTap/" + id, body);
    return res;
  } catch (err) {
    throw err;
  }
};

export const DeleteBST = async (id) => {
  try {
    const res = await request.Delete("/api/admin/BoSuuTap/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};
export const UploadImgBST = async (id, body, config) => {
  try {
    const res = await request.Post(
      "/api/admin/BoSuuTap/UploadImgBST/" + id,
      body,
      config
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const RemoveImgBST = async (id, fileName) => {
  return await request.Delete(
    `/api/admin/BoSuuTap/RemoveImgBST/${id}?filename=${fileName}`
  );
};
export const RemoveProductsFormBST = async (id, config) => {
  try {
    const res = await request.Delete(
      "/api/admin/BoSuuTap/RemoveProductsFormBST/" + id,
      config
    );
    return res;
  } catch (err) {
    console.log({ err });
    throw err;
  }
};
