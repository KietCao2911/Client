import React from "react";
import { Upload } from "antd";
import MyButton from "../Button";
import { UploadCloud } from "react-feather";
const UploadCustom = (props) => {
  const { fetchUpload, fileList, onUpload, onRemove } = props;
  const handleRemove = (file) => {
    onRemove(file);
  };
  const handleUpload = (props) => {
    const { onSuccess, onError, file, onProgress } = props;
    console.log({ file });
    const fmData = new FormData();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        if (percent === 100) {
          //   setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      fmData.append("file", file);
      console.log({ FNC: onUpload });
      onUpload(fmData);
      onSuccess();
    } catch (err) {
      onError({ err });
    }
  };
  return (
    <Upload
      onRemove={(e) => handleRemove(e)}
      fileList={fileList || []}
      multiple
      listType="picture-card"
      customRequest={handleUpload}
    >
      <UploadCloud />
    </Upload>
  );
};

export default UploadCustom;
