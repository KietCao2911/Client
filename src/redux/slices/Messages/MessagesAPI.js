import * as Method from "~/axiosRequest/request"

export const fetchGetMessages = async()=>
{
    try {
        const res = await Method.Get("/api/Message");
        return res;
    } catch (error) {
        throw error;
    }
}