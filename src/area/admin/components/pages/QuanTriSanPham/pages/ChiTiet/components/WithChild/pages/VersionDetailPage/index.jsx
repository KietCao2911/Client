import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
} from "antd";
import React, { useTransition } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import convertVND from "~/components/utils/ConvertVND";
import LichSuKho from "./components/LichSuKho";
import TonKho from "./components/TonKho";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import InputText from "~/components/commomComponents/InputText";
import { UploadFile, DeleteFile } from "~/redux/slices/SanPham";
import { useMemo } from "react";
import CustomSpin from "~/components/CustomSpin";
import { memo } from "react";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import AddChildProduct from "../../../../../ThemSanPham/components/AddChildProduct";
const { Dragger } = Upload;

const VersionDetailPage = (props) => {
  const params = useParams();
  const { khohangs } = useSelector((state) => state.KhoHang);
  const { product,ctnxs } = useSelector((state) => state.SanPham);
  const { isEdit, version, form } = props;
  const [isPending, startTransition] = useTransition();
  const [fileList, setFileList] = useState(() => {
    let imgs =
      product?.colorGrouped?.filter(
        (x) => x[0]?.idColor?.trim() == version?.idColor?.trim()
      )[0] || [];
    return imgs[0]?.chiTietHinhAnhs || [];
  });
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const getImgs = useMemo(() => {
    let imgs =
      product?.colorGrouped?.filter(
        (x) => x[0]?.idColor?.trim() == version?.idColor?.trim()
      )[0] || [];
    setFileList(imgs[0]?.chiTietHinhAnhs || []);
  }, [version?.idColor, product?.colorGrouped]);
  useEffect(() => {
    dispatch(
      KhoHangAPI.fetchGetKhoHang({ maSP: params["*"].split("/")[1] || "" })
      
    );
    dispatch(SanPhamAPI.fetchGetCTNXs({maSanPham:params["*"].split("/")[1] || ""}));
  }, [params.maSP]);
  const handleChangeFieldValue = (value, fieldName) => {
    let tempValue = { ...version };
    let arr = [...form?.values?.sanPhams];
    const index = form?.values?.sanPhams.indexOf(version);
    if (index > -1) {
      tempValue[fieldName] = value;
      arr[index] = tempValue;
      form.setFieldValue("sanPhams", arr);
    } else {
    }
  };
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
      const payload={
        maSP: product.maSanPham.trim(),
        maMau: version.idColor.trim(),
        body: fmData,
        config,
      }
      console.log({payload})
      dispatch(
        UploadFile(payload)
      );
      onSuccess("Ok");
    } catch (err) {
      const error = new Error("Some error");
      onError({ err });
    }
  };
  const handleDeleteImg = (e) => {
    dispatch(
      DeleteFile({
        fileName: e.name.trim(),
        _id: e.uid,
        maSP: product.maSanPham.trim(),
        maMau: version.idColor,
      })
    );
  };
  if (!version) {
    return <CustomSpin />;
  }

  const itemsTab = [
    {
      key: "1",
      label: "Kho hàng",
      children: <TonKho khohangs={khohangs || []} />,
    },
    {
      key: "2",
      label: "Lịch sử nhập xuất kho",
      children: <LichSuKho khohangs={ctnxs?.filter(x=>x.deletedAT==null&&x?.phieuNhapXuatNavigation?.steps>2) || []} />,
    },
  ];
  return (
    <>
      <Col xl={14}>
        <Row gutter={[20, 20]}>
          <Col xl={24} xs={24}>
            <Card title="Thông tin chi tiết phiên bản">
              <Col xl={12}>
                <Space direction="vertical">
                  <Space>
                    <Space>
                      <i>Mã CTK</i>:
                    </Space>
                    <Space>{version?.maSanPham?.trim()}</Space>
                  </Space>
                  <Space>
                    {isEdit ? (
                      <InputText
                        label="Tên phiên bản"
                        onChange={(e) =>
                          handleChangeFieldValue(e.target.value, "tenSanPham")
                        }
                        value={version?.tenSanPham}
                      />
                    ) : (
                      <>
                        <Space>
                          <i>Tên phiên bản của sản phẩm</i>:
                        </Space>
                        <Space>{version?.tenSanPham?.trim()}</Space>
                      </>
                    )}
                  </Space>

                  <Space>
                    <Space>
                      <i>Màu sắc</i>:
                    </Space>
                    <Space>{version?.idColor}</Space>
                  </Space>
                  <Space>
                    <Space>
                      <i>Kích thước</i>:
                    </Space>
                    <Space>{version?.idSize}</Space>
                  </Space>
                </Space>
              </Col>
              <Col xl={12}></Col>
            </Card>
          </Col>
          <Col xl={24} xs={24}>
            <Card title="Giá sản phẩm">
              <Row gutter={[0, 20]}>
                <Col xl={12}>
                  <Space>
                    <Space>
                      <i>Giá bán lẻ:</i>
                    </Space>
                    {isEdit ? (
                      <InputText
                        label="Giá bán lẻ"
                        onChange={(e) =>
                          handleChangeFieldValue(e.target.value, "giaBanLe")
                        }
                        value={parseFloat(version.giaBanLe)}
                      />
                    ) : (
                      <Space>{convertVND(version.giaBanLe || 0)}</Space>
                    )}
                  </Space>
                </Col>
                <Col xl={12}>
                  <Space>
                    <Space>
                      <i>Giá bán sỉ:</i>
                    </Space>
                    {isEdit ? (
                      <InputText
                        label="Giá bán sỉ"
                        onChange={(e) =>
                          handleChangeFieldValue(e.target.value, "giaBanSi")
                        }
                        value={version.giaBanSi}
                      />
                    ) : (
                      <Space>{convertVND(Number(version.giaBanSi) || 0)}</Space>
                    )}
                  </Space>
                </Col>
                <Col xl={12}>
                  <Space>
                    <Space>
                      <i>Giá nhập:</i>
                    </Space>
                    {isEdit ? (
                      <InputText
                        label="Giá nhập"
                        onChange={(e) =>
                          handleChangeFieldValue(e.target.value, "giaNhap")
                        }
                        value={version.giaNhap}
                      />
                    ) : (
                      <Space>{convertVND(version.giaNhap || 0)}</Space>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={24} xs={24}>
            <Card title="Ảnh phiên bản">
              {
                <Upload
                  onRemove={(e) => handleDeleteImg(e)}
                  maxCount={5}
                  progress={progress}
                  fileList={fileList || []}
                  customRequest={uploadImage}
                  multiple
                  listType="picture-card"
                >
                  <InboxOutlined />
                </Upload>
              }
            </Card>
          </Col>
          <Col xl={24} xs={24}>
            <Card title="Thông tin thêm">
              <Space>
                <Space>
                  <Form.Item label="Cho phép bán">
                    <Checkbox checked disabled />
                  </Form.Item>
                </Space>
                <Space>
                  <Space>
                    <Form.Item label="Áp dụng thuế">
                      <Space>
                        <Checkbox checked disabled />
                      </Space>
                      <Space></Space>
                      <Space></Space>
                    </Form.Item>
                  </Space>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card title="Kho hàng">
          <Tabs defaultActiveKey="1" items={itemsTab}></Tabs>
        </Card>
      </Col>
      
    </>
  );
};

export default memo(VersionDetailPage);
