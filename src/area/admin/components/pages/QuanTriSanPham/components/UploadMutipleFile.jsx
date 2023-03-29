import React, { useEffect, useState } from "react";
import { Post, Delete } from "~/area/admin/components/api/SanPham";
import { Upload, Button } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import ItemUpload from "~/components/commomComponents/ItemImgsUpload";
import ModalCustom from "~/components/commomComponents/ModalCustom";
import InputText from "~/components/commomComponents/InputText";
import { SelectInput } from "~/components/commomComponents/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import MauSacSlice, { fetchALLColors } from "~/redux/slices/MauSacSlice";
import SanPhamSlice, { UploadFile, DeleteFile } from "~/redux/slices/SanPham";
import { uuidv4 as v4 } from "@firebase/util";
const { Dragger } = Upload
function UploadMutipleFile(props) {
  const { res, MaSP, product, openModal, setOpenModal } = props;
  // const [openModal,setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [colorSelected, setColorSelected] = useState(null);
  const [resTemp, setResTemp] = useState(res || []);
  const dispatch = useDispatch();
  const { colors } = useSelector(state => state.MauSac)
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {

      fmData.append("file", file);
      dispatch(UploadFile({ maSP: MaSP.trim(), maMau: colorSelected, body: fmData, config }))
      onSuccess("Ok");

    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
    }
  };
  useEffect(() => {
    dispatch(fetchALLColors())
  }, [])

  useEffect(() => {
    const hex = colorSelected;
    var ele = res?.find(x => x.idMaumau.trim() == hex);
    if (ele) {
      var index = res.indexOf(ele);
      var newArr = res[index] || [];
      setResTemp(newArr)
    }
  }, [res])
  const handleOnChangeColor = (e) => {
    const hex = e.target.value.trim();
    setColorSelected(e.target.value.trim())
    var ele = res?.find(x => x.idMaumau.trim() == hex);
    if (ele) {
      var index = res.indexOf(ele);
      var newArr = res[index] || [];
      setResTemp(newArr)
    }
    else {
      setResTemp([])

    }
  }
  const handleDeleteImg = (e) => {
    dispatch(DeleteFile({ fileName: e.name.trim(), _id: e.uid, maSP: MaSP.trim(), maMau: colorSelected }))
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)} >Upload</Button>
      <ModalCustom show={openModal} onCancel={() => setOpenModal(false)}>
        <strong>Cập nhật ảnh sản phẩm</strong>
        <SelectInput value={colorSelected} onChange={(e) => handleOnChangeColor(e)}>
          <option key={v4()} value={null}>Lựa chọn màu sắc</option>
          {colors && colors.map((item) => <option key={v4()} value={item?.maMau.trim()}>{item.tenMau}</option>)}
        </SelectInput>
        <Dragger multiple onRemove={(e) => handleDeleteImg(e)} listType="picture-card" fileList={resTemp && resTemp.hinhAnhInfo || []} customRequest={uploadImage}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
        {/* <Dragger fileList={res&&res[0]?.hinhAnhInfo||[]}></Dragger> */}
      </ModalCustom>
    </>
  );
}

export default UploadMutipleFile;
