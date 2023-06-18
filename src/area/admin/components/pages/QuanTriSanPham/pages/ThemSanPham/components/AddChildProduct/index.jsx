import { Col, Modal, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as KichCoAPI from "~/redux/slices/KichCoSlice"
import * as MauSacAPI  from "~/redux/slices/MauSacSlice"
import * as BranchAPI from "~/redux/slices/Branch/BranchSlice"
import * as SanPhamAPI from "~/redux/slices/SanPham"
import ItemVersion from "../../../../components/ItemVersion/ItemVersion"
import MyButton from "~/components/commomComponents/Button"
import generateRandomCode from "~/components/utils/RandomCode"
const AddChildProduct=(props)=>
{
  const {openModalAddChild,setOpenModalChild} = props; 
    const { sizes } = useSelector((state) => state.KichCo);
    const { colors } = useSelector((state) => state.MauSac);
    const {loading, product } = useSelector((state) => state.SanPham);
    const { branchs } = useSelector((state) => state.Branch);
    const [versions,setVersions] =useState([])
    const dispatch = useDispatch()
    const handleAddField=()=>
    {
        const { giaBanLe, giaVon, giaBanSi, soLuongTon, tenSanPham, giaNhap,parenID,maSanPham } =
        product;
        console.log({product})
      setVersions([
        ...versions,
        [
          {
            IDColor: null,
            giaBanLe,
            giaVon,
            giaBanSi,
            giaNhap,
            soLuongTon,
            tenSanPham: tenSanPham + "-",
            parenID:maSanPham,
          },
        ],
      ]);
    }
    useEffect(()=>
    {
        dispatch(KichCoAPI.fetchALLSize())
        dispatch(BranchAPI.fetchGetBranch())
        dispatch(MauSacAPI.fetchALLColors())
    },[])
    const paramsQty = {
        soLuongTon: 0,
        giaBanSi: product.giaBanSi,
        giaBanLe: product.giaBanLe,
        giaNhap: product.giaNhap,
        giaVon: product.giaVon,
        tenSanPham: product.tenSanPham,
        parentID:product.maSanPham
      };
      const handleSubmit=()=>
      {
        const body =[...versions]
        const items=[]
        body.forEach(x=>
            {
                x.map(item=>
                    {
                        item.maSanPham = "SKU"+generateRandomCode(4)
                        items.push(item)
                    })
            })
            dispatch(SanPhamAPI.PostChildProduct(items))
            setVersions([])
      }

    return <Modal onOk={handleSubmit} open={openModalAddChild} onCancel={()=>setOpenModalChild(false)}>
    <Row gutter={[10,10]} >
        {versions&&versions.map((version,index)=>
            {
                return <Col span={24}>
                <ItemVersion 
                colors={colors}
                sizes={sizes}
                item={version}
                branchs={branchs}
                {...paramsQty}
                index={index}
                versions={versions}
                setVersions={setVersions}
                />
                </Col>
            })}
            <Col  span={24}>
            <Space>
            <MyButton onClick={handleAddField}>Thêm trường</MyButton>
            {versions&&versions.length>0&& <MyButton>Xem trước</MyButton>}
            </Space>
                        </Col>
          
    </Row>
    </Modal>
}
export default AddChildProduct