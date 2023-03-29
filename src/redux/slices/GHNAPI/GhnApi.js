import * as Method from "~/axiosRequest/request";
import {GHN_CONFIG} from "~/const"
export const fetchGetProvince=async ()=>
{
    try {
        const res = await Method.Get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{
            headers:{
                token:GHN_CONFIG.TOKEN
            }
        })
        return res;
    } catch (error) {
        throw error;
    }
}
export const fetchGetDistrict=async(id)=>
{
    try {
        const res = await Method.Post("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",{province_id:parseInt(id)},{
            headers:{
                Token:GHN_CONFIG.TOKEN
            },
            
        })
        return res;
    } catch (error) {
        throw error;
    }
}
export const fetchGetWard=async(id)=>
{
    try {
        const res = await Method.Get("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id="+id,{
            headers:{
                token:GHN_CONFIG.TOKEN
            }
        })
        return res;
    } catch (error) {
        throw error;
    }
}
export const getFeeGHN =async(body)=>
{
    try {
        const res = await Method.Post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",body,{
            headers:{
                token:GHN_CONFIG.TOKEN,
                ShopId:GHN_CONFIG.SHOP_ID
            }
        })
        return res;
    } catch (error) {
        throw error;
    }
}