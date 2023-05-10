import * as Method from "~/axiosRequest/request"
export const AddProductRating=async(body)=>
{
    try {
        const res = await Method.Post("api/admin/Review/",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const GetOrderRating=async(id,token)=>
{
    try {
        const res = await Method.Post("api/admin/Review/"+id,token)
        return res;
    } catch (error) {
        throw error
    }
}