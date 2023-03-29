import { request } from "~/axiosRequest/request";

export const Get = async (path, params) => {
  const res = await request.get(path, { params });
  return res.data;
};
export const Post = async (path, body, config) => {
  const res = await request.post(path, body, config);
  return res.data;
};
export const Delete = async (path, body, config) => {
  const res = await request.delete(path, body, config);
  return res.data;
};
export const Put = async (path, config) => {
  const res = await request.put(path, config);
  return res.data;
};