import * as Method from "~/axiosRequest/request";

export const OrderWithVNPAY = async (body) => {
  try {
    const res = await Method.Post("/api/HoaDon/OrderWithVNPAY", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const OrderWithStripe = async(body)=>
{
  try {
    const res = await Method.Post("/api/HoaDon/StripePayment", body);
    return res;
  } catch (error) {
      throw error;
  } 
}
export const OrderWithCOD = async (body) => {
  try {
    const res = await Method.Post("api/HoaDon/OrderWithCOD", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const fetchPostApplyCoupon = async (body) => {
  try {
    const res = await Method.Post("api/HoaDon/ApplyCoupon", body);
    return res;
  } catch (error) {
    throw error;
  }
};
