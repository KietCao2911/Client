import * as Method from "~/axiosRequest/request"

export const UpdateAddress = async (body)=>
{
    try {
        const res = await Method.Put("/api/Me/AddAddress",body);
        return res;
    } catch (error) {
        throw error;
    }
}
export const ChangeAddressDefault = async (body)=>
{
    try {
        const res = await Method.Put("/api/Me/ChangeDefaultAddress",body);
        return res;
    } catch (error) {
        throw error;
    }
}
export const GetOrders = async (userName)=>
{
    try {
        const res = await Method.Get("/api/Me/GetOrders/"+userName);
        return res;
    } catch (error) {
        throw error;
    }
}
export const setAvatar =async(id,body)=>
{
  try{
    const res = await Method.Post("/api/Me/SetAvatar/"+id,body);
    return res;
  }catch(error)
  {
    throw error;
  }
}
export const updateInfo =async(body)=>
{
  try{
    const res = await Method.Post("/api/Me/UpdateInfo",body);
    return res;
  }catch(error)
  {
    throw error;
  }
}