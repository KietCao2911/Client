import { Space, Input, Table } from "antd"
import { useState, useTransition } from "react";
import { Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import { BASE_URL } from "~/const";
import * as  BranchAPI from "~/redux/slices/Branch/BranchSlice";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
const BuyXGiveY=(props)=>
{
    const {CouponForm,index} = props;
    const [searchTextX,setSearchTextX] = useState("");
    const [searchTextY,setSearchTextY] = useState("");
    const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
    const [isPending, startTransition] = useTransition();                                              
    const dispatch = useDispatch();
    const onClickDeleteX =(maSanPhamX)=>
    {
        let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
        const obj = chiTietCoupon.find(x=>x.maSanPhamX.trim()==maSanPhamX.trim());
        chiTietCoupon[index].maSanPhamX=""
        CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
    }
    const onClickDeleteY =(maSanPhamY)=>
    {
        let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
        const obj = chiTietCoupon.find(x=>x.maSanPhamY.trim()==maSanPhamY.trim());
        chiTietCoupon[index].maSanPhamY=""
        CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
    }
    const onClickProductX=(product,urlImg)=>{
        let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
        let check  =(chiTietCoupon.length>0? chiTietCoupon?.some(x=>x.maSanPhamX.trim()==product.maSanPham.trim()):false)
        if(product.soLuongTon<=0)
        {
          alert("Sản phẩm này đã hết hàng")
          return ;
        }
        if(check)
        {
          alert("Sản phẩm này đã được thêm")
          return ;

        }
        const params = 
        {...chiTietCoupon[index],imgX:urlImg,maSanPhamX:product.maSanPham,tenSanPham:product?.sanPhamNavigation?.tenSanPham}
        chiTietCoupon[index] = {...params};
        CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
}
const onClickProductY=(product,urlImg)=>{
    let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
    let check  = chiTietCoupon.some(x=>x.maSanPhamY.trim()==product.maSanPham.trim())
    if(product.soLuongTon<=0)
    {
      alert("Sản phẩm này đã hết hàng")
      return ;
    }
    if(check)
        {
          alert("Sản phẩm này đã được thêm")
          return ;

        }
         
    const params = 
    {...chiTietCoupon[index],imgY:urlImg,maSanPhamY:product.maSanPham,tenSanPham:product?.sanPhamNavigation?.tenSanPham}
    chiTietCoupon[index] = {...params};
    CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
}
    let columnsX=[{
        title:"Mã sản phẩm",
        render:(_,record)=>
        {
            return <p>{record?.maSanPhamX}</p>
        }
    },
    {
        title:"Tên sản phẩm",
        render:(_,record)=>
        {
            return <p>{record?.tenSanPham}</p>
        }
    },
    {
        render:(_,record)=>
        {
            return <img style={{width:"10rem",height:"10rem"}} src={record?.imgX} alt="" />
        }
    },
    {
        render:(_,record)=>
        {
            return <Trash2 onClick={()=>onClickDeleteX(record?.maSanPhamX)} className="icon deleteHover"/>
        }
    }
]
let columnsY=[{
    title:"Mã sản phẩm",
    render:(_,record)=>
    {
        return <p>{record?.maSanPhamY}</p>
    }
},
{
    title:"Tên sản phẩm",
    render:(_,record)=>
    {
        return <p>{record?.tenSanPham}</p>
    }
},
{
    render:(_,record)=>
    {
        return <img style={{width:"10rem",height:"10rem"}} src={record?.imgY} alt="" />
    }
},
{
    render:(_,record)=>
    {
        return <Trash2 onClick={()=>onClickDeleteY(record?.maSanPhamY)} className="icon deleteHover"/>
    }
}
]
const onChangeSearchX =(e)=>
{
    startTransition(() => {
        setSearchTextX(e.target.value);
        dispatch(
          KhoHangAPI.fetchGetProducts({
            maChiNhanh:CouponForm.values?.maChiNhanh,
             s: e.target.value ,
             onlyVersion:true,
          })
        );
      });
}
const onChangeSearchY =(e)=>
{
    startTransition(() => {
        setSearchTextY(e.target.value);
        dispatch(
          KhoHangAPI.fetchGetProducts({
            maChiNhanh:CouponForm.values?.maChiNhanh,
             s: e.target.value ,
             onlyVersion:true,
          })
        );
      });
}
    return ( <Space.Compact style={{width:"100%"}}>
    <Space style={{width:"100%"}} direction="vertical">
    <Input 
     value={searchTextX}
     onChange={(e) => onChangeSearchX(e)}
    placeholder="Tìm kiểm sản phẩm tặng"/>
    <List>
    {searchTextX &&
                  sanPhamTrongKho.length > 0 &&
                  sanPhamTrongKho.map((item) => {
                    const productInfo = item.sanPhamNavigation;
                    const url =
                      BASE_URL +
                        "wwwroot/res/SanPhamRes/Imgs/" +
                        productInfo?.parentID?.trim() +
                        "/" +
                        productInfo?.idColor?.trim() +
                        "/" +
                        productInfo?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
                      "";
                    return (
                      <ItemResult
                        value={productInfo}
                        onItemClick={(productInfo) =>
                          onClickProductX(item,url)
                        }
                        labelProps={{
                          img: url,
                          name: productInfo.tenSanPham,
                          code: productInfo.maSanPham,
                          price: productInfo.giaNhap,
                          qty: item.soLuongTon,
                        }}
                      />
                    );
                  })}
    </List>
{    CouponForm.values.chiTietCoupons[index].maSanPhamX&& <Table columns={columnsX} dataSource={[CouponForm.values.chiTietCoupons[index]]}/>}
</Space>
<Space style={{width:"100%"}} direction="vertical">
<Input placeholder="Tìm kiểm sản phẩm Y"  value={searchTextY} onChange={(e) => onChangeSearchY(e)}/>
<List>
    {searchTextY &&
                  sanPhamTrongKho.length > 0 &&
                  sanPhamTrongKho.map((item) => {
                    const productInfo = item.sanPhamNavigation;
                    const url =
                      BASE_URL +
                        "wwwroot/res/SanPhamRes/Imgs/" +
                        productInfo?.parentID?.trim() +
                        "/" +
                        productInfo?.idColor?.trim() +
                        "/" +
                        productInfo?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
                      "";
                    return (
                      <ItemResult
                        value={productInfo}
                        onItemClick={(productInfo) =>
                        onClickProductY(item,url)
                        }
                        labelProps={{
                          img: url,
                          name: productInfo.tenSanPham,
                          code: productInfo.maSanPham,
                          price: productInfo.giaNhap,
                          qty: item.soLuongTon,
                        }}
                      />
                    );
                  })}
    </List>
{    CouponForm.values.chiTietCoupons[index].maSanPhamY &&<Table columns={columnsY} dataSource={[CouponForm.values.chiTietCoupons[index]]}/>}
</Space>
</Space.Compact>)
}
export default BuyXGiveY