import * as Method from "~/axiosRequest/request";

export const fetchPostWithGuess = async (body) => {
  try {
    const res = await Method.Post("/api/HoaDon/CreateOrder", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPostWithUser = async (body) => {
  try {
    const res = await Method.Post("api/HoaDon/PostWithUser", body);
    return res;
  } catch (error) {
    throw error;
  }
};
