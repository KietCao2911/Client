import { BASE_URL } from "~/const"

const URLConvert=(arr,maSanPham)=>
{
    const result =arr&&arr.map(img=>
        {
          return {
            uid:img?.idHinhAnh,
            name:img?.idHinhAnhNavigation?.fileName.trim(),
            status:"done",
            url:BASE_URL+"\wwwroot\\res\\SanPhamRes\\Imgs\\" + maSanPham.trim() + "\\" + img?.idMaMau?.trim() + "\\" + img?.idHinhAnhNavigation?.fileName?.trim(),
            idMaMau:img.idMaMau,
          }
        })
        return result||[];
}

export default URLConvert