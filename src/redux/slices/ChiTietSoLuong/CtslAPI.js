import * as Method from "~/axiosRequest/request";

export const fetchPutCTSL =async(id,body)=>
{
    try {
        const res =await Method.Put("/api/admin/SoLuongDetail/"+id,body)
        return res;
    } catch (error) {
        throw error
    }
}
export const fetchGetQTY =async(maSP,maMau,maSize)=>
{
    try {
        const res =await Method.Get(`/api/admin/SoLuongDetail/GetQty/${maSP}/${maMau}/${maSize}`)
        return res;
    } catch (error) {
        throw error
    }
}