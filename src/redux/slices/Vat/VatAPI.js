import * as Method from "~/axiosRequest/request";
export const fetchGetAllVats = async ()=>
{
    try {
        const res = await Method.Get("/api/admin/Vat");
        return res; 
    
    } catch (error) {
    throw error        
    }
}
export const fetchPostVat = async (body)=>
{
    try {
        const res = await Method.Post("/api/admin/Vat",body);
        return res; 
    
    } catch (error) {
    throw error        
    }
}