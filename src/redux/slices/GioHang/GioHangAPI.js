import * as Method from "~/axiosRequest/request"

export const CheckCart=async(body)=>
{
    try {
            const res  =await Method.Post("/api/Cart",body)
            return res;
    } catch (error) {
        throw error
    }
}