import React, { useEffect, useState } from "react";
import { Post, Delete } from "~/area/admin/components/api/SanPham";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
function UploadSingleFile({ maSP, fileInit, setFileInit, fieldValue }) {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    setDefaultFileList(fileInit || []);
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
    fmData.append("file", file);
    try {
      const res = await Post(
        "/api/admin/SanPham/Upload-Single?maSP=" + maSP,
        fmData,
        config
      );
      fieldValue({
        img: res.img,
      });
      setFileInit([
        {
          uid: res.img,
          name: res.img,
          status: "done",
          // custom error message to show
          url: `https://localhost:44328/wwwroot/res/SanPhamRes/Thumb/${res.img.trim()}`,
        },
      ]);
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      setFileInit([
        {
          uid: "1",
          name: "1",
          status: "error",
          // custom error message to show
          url: "#",
        },
      ]);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setFileInit(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };
  const handleOnRemove = async (f) => {
    try {
      const res = await Delete(
        `/api/admin/SanPham/Remove-Single?fileName=${f.name}&_id=${maSP}`
      );
      fieldValue({
        img: null,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Upload
      accept="image/*"
      customRequest={uploadImage}
      onChange={handleOnChange}
      onRemove={handleOnRemove}
      listType="picture-card"
      fileList={fileInit}
      className="image-upload-grid"
    >
      {defaultFileList.length < 1 && (
        <div>
          <UploadOutlined />
          Thêm ảnh
        </div>
      )}
    </Upload>
  );
}

export default UploadSingleFile;
