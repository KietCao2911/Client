import * as Method from "~/axiosRequest/request";
export const getMemebers = async(params)=>
{
    try {
        const res = await Method.Get("api/admin/TaiKhoan/GetMembers",{params})
        return res;
    } catch (error) {
        throw error
    }
}