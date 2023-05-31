import * as Method from "~/axiosRequest/request"
export const getAllMembers=async(params)=>
{
    try {
        const res = await Method.Get("api/admin/Member/",{params});
        return res;
    } catch (error) {
        throw error
    }
}
export const getMemberByID =async (id)=>
{
    try {
        
        const res =await Method.Get("api/admin/Member/"+id);
        return res;
    } catch (error) {
        
    }
}