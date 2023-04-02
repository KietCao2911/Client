import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  FloatButton,
  Form,
  Input,
  Menu,
  message,
  Modal,
  notification,
  Popover,
  Row,
  Select,
  Space,
  Steps,
  Table,
} from "antd";
import React, { useCallback, useEffect, useMemo, useTransition } from "react";
import { useState } from "react";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
import convertVND from "~/components/utils/ConvertVND";
import "./TrangTaoDonNhap.scss";
import * as NCCAPI from "~/redux/slices/NCC/index";
import * as SanPhamAPI from "~/redux/slices/SanPham/index";
import FormCreateNCC from "~/components/Forms/CreateNCCForm";
import { useDispatch, useSelector } from "react-redux";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import { useFormik } from "formik";
import ThemSanPham from "../../../QuanTriSanPham/pages/ThemSanPham";
import ProductsTable from "./components/ProductsTable";
import convertNumberToWords from "~/components/utils/NumberToWord";
import * as BranchAPI from "~/redux/slices/Branch/BranchSlice";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
import * as PhieuNhapAPI from "~/redux/slices/PhieuNhap/PhieuNhap";
import { Link, useParams } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  ArrowDown,
  FilePlus,
  Plus,
  Truck,
  DollarSign,
  Settings,
} from "react-feather";
import { SaveTwoTone } from "@ant-design/icons";
import CustomSpin from "~/components/CustomSpin";
import { BASE_URL } from "~/const";
const TrangTaoDonNhap = (props) => {
  const [step, setStep] = useState(0);
  const [description, setDesciption] = useState("");
  const [openAddNCC, setOpenAddNCC] = useState(false);
  const { nccs } = useSelector((state) => state.NCC);
  const { isCreated, isUpdated, isReadOnly } = props;
  const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
  const { item, loading } = useSelector((state) => state.PhieuNhap);
  const { branchs } = useSelector((state) => state.Branch);
  const dispatch = useDispatch();
  const [nccSearchText, setNccSearchText] = useState("");
  const [productSearchText, setproductSearchText] = useState("");
  const [isPending, startTransition] = useTransition();
  const { id } = useParams();

  const Form = useFormik({
    initialValues: {
      tongSoLuong: 0,
      thanhTien: 0,
      chietKhau: 0,
      thanhToan: 0,
      daNhapHang: false,
      daThanhToan: false,
      nhaCungCapNavigation: {},
      chiTietNhapXuats: [],
      loaiPhieu: "PHIEUNHAP",
      maChiNhanh: "CN01",
    },
  });
  const handleOnChangeBranch = (e) => {
    const ncc = Form.values.nhaCungCapNavigation;
    Form.setValues({
      tongSoLuong: 0,
      thanhTien: 0,
      chietKhau: 0,
      thanhToan: 0,
      nhaCungCapNavigation: ncc || {},
      chiTietNhapXuats: [],
      loaiPhieu: "PHIEUNHAP",
      maChiNhanh: e || "CN01",
    });
    setproductSearchText("");
  };
  const handleSubmit = (steps) => {
    if (
      Form.values.nhaCungCapNavigation &&
      Object.keys(Form.values.nhaCungCapNavigation).length <= 0
    ) {
      message.open({
        content: "Vui lòng chọn nhà cung cấp",
        type: "error",
      });
    } else if (
      Form.values.chiTietNhapXuats &&
      Form.values.chiTietNhapXuats.length <= 0
    ) {
      message.open({
        content: "Vui lòng chọn ít nhất một sản phẩm",
        type: "error",
      });
    } else {
      let formValueTemp = { ...Form.values, steps };
      let ctnxs = formValueTemp?.chiTietNhapXuats?.map((pn) => {
        return {
          ...pn,
          sanPhamNavigation: null,
        };
      });
      if (ctnxs) {
        formValueTemp.chiTietNhapXuats = ctnxs;
        let body = {
          ...formValueTemp,
          IDNCC: Form.values.nhaCungCapNavigation.id,
        };
        if (isCreated && !isReadOnly) {
          dispatch(PhieuNhapAPI.fetchPostPhieuNhaps({ body }));
          console.log({ CreatedBody: body });
        } else {
          console.log({ CreatedBody: body });
          dispatch(PhieuNhapAPI.fetchPutPhieuNhaps({ body }));
        }
      }
    }
  };
  const handleSubmitThanhToan = () => {
    const body = { ...Form.values };
    dispatch(PhieuNhapAPI.fetchPutThanhToan({ body }));
  };
  const handleSubmitNhapKho = () => {
    const body = { ...Form.values };
    dispatch(PhieuNhapAPI.fetchPutNhapKho({ body }));
  };
  const callBackSetForm = useMemo(() => {
    if (isReadOnly || isUpdated) {
      Form.setValues({ ...item });
    }
  }, [item]);
  useEffect(() => {
    dispatch(BranchAPI.fetchGetBranch());
    if (isReadOnly || isUpdated) {
      dispatch(PhieuNhapAPI.fetchGetPhieuNhapID({ id }));
    }
  }, []);

  const handleChangeNccSearchText = (e) => {
    startTransition(() => {
      dispatch(NCCAPI.fetchGetNCC({ s: e.target.value }));
    });
  };
  const handleChangeProductSearchText = (e) => {
    startTransition(() => {
      setproductSearchText(e.target.value);
      dispatch(
        KhoHangAPI.fetchGetProducts({
          maChiNhanh: Form.values.maChiNhanh,
          query: { s: e.target.value },
        })
      );
    });
  };
  const onClickProduct = (value) => {
    const fncCheck = (ele) => ele.maSanPham == value.maSanPham;
    console.log({ values: Form.values });
    let check = Form.values.chiTietNhapXuats?.some(fncCheck);
    if (!check) {
      const props = {
        maSanPham: value.maSanPham,
        soLuong: 1,
        thanhTien: value.giaNhap * 1,
        donGia: Number(value.giaNhap) || 0,
        sanPhamNavigation: { tenSanPham: value.tenSanPham },
        logText: "Nhập hàng",
      };
      const arrs = [...Form.values.chiTietNhapXuats];
      Form.setFieldValue("tongSoLuong", Form.values.tongSoLuong + 1);
      Form.setFieldValue("thanhTien", Form.values.thanhTien + value?.giaNhap);
      Form.setFieldValue("chiTietNhapXuats", [...arrs, props]);
      message.open({
        content: "Thêm thành công  sản phẩm " + value?.maSanPham,
        type: "success",
      });
    } else {
      message.open({
        content: "Sản phẩm này đã được chọn",
        type: "error",
      });
    }
  };
  const handleApplyCoupon = (value) => {
    Form.setFieldValue("chietKhau", Number(value));
    const totalPrices = Form.values.chiTietNhapXuats.reduce((x, y) => {
      return x + y.thanhTien;
    }, 0);
    if (value == 0) {
      Form.setFieldValue("thanhTien", totalPrices);
    } else {
      Form.setFieldValue("thanhTien", totalPrices * (1 - value / 100));
    }
  };

  return loading ? (
    <CustomSpin />
  ) : (
    <>
      {(isUpdated || isCreated) && (
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ right: 94 }}
          icon={<Save />}
        >
          {isCreated && (
            <FloatButton
              onClick={() => handleSubmit(1)}
              tooltip={<p>Đặt hàng</p>}
            />
          )}
          <FloatButton
            onClick={() => handleSubmit(2)}
            tooltip={<p>{isCreated ? "Đặt hàng và duyệt" : "Xác nhận sửa"}</p>}
          />
        </FloatButton.Group>
      )}
      <div className="TrangTaoDonNhap">
        <div className="mainContent">
          <Row gutter={[20, 20]}>
            <Col md={24}>
              <Row gutter={[20, 20]}>
                <Col md={12}>
                  {" "}
                  <Space.Compact>
                    <Space>
                      {" "}
                      <ArrowLeft />
                    </Space>
                    <Space>
                      {" "}
                      <a href={"./"}>Quay lại</a>{" "}
                    </Space>
                  </Space.Compact>{" "}
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row justify={"space-between"} align="middle">
                <Col md={12}>
                  {isUpdated || isReadOnly ? (
                    item.steps <= 1 ? (
                      <Popover
                        content={
                          <>
                            <Menu
                              items={[
                                {
                                  key: "Edit",
                                  label: <Link to="cap-nhat">Chỉnh sửa</Link>,
                                  type: "group",
                                },
                                {
                                  key: "Cancel",
                                  label: (
                                    <Link
                                      to={
                                        "/admin/trang-quan-tri-nhap-hang/" +
                                          id || 0
                                      }
                                    >
                                      Hủy
                                    </Link>
                                  ),
                                  type: "group",
                                },
                                {
                                  key: "Delete",
                                  label: <a>Xóa</a>,
                                  type: "group",
                                },
                              ]}
                            />
                          </>
                        }
                      >
                        <h1 style={{ display: "inline" }}>
                          <a>
                            {"#" + id} <Settings />
                          </a>{" "}
                        </h1>
                      </Popover>
                    ) : (
                      <h1>{"#" + id}</h1>
                    )
                  ) : (
                    <h1>Tạo Trang Nhập Hàng</h1>
                  )}
                </Col>
                <Col>
                  <Steps
                    current={
                      item.daThanhToan && item.daNhapHang ? 4 : item.steps
                    }
                    items={[
                      {
                        title: "Đặt hàng",
                        description,
                      },
                      {
                        title: "Duyệt",
                        description,
                      },
                      {
                        title: "Nhập kho",
                        description,
                      },
                      {
                        title: "Hoàn thành",
                        description,
                      },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col md={24}>
              <Row gutter={20}>
                <Col md={16}>
                  <Card title="Thông tin nhà cung cấp">
                    {(isCreated || isUpdated) && (
                      <InputText
                        label="Nhà cung cấp"
                        onChange={(e) => handleChangeNccSearchText(e)}
                        textAdd="Thêm nhà cung cấp"
                        iconAdd={<FilePlus />}
                        type="search"
                      />
                    )}

                    {(isCreated || isUpdated) && (
                      <List
                        AddNewField={{
                          icon: <FilePlus />,
                          text: "Thêm nhà cung cấp",
                          onClick: () => {
                            setOpenAddNCC(true);
                            setNccSearchText("");
                          },
                        }}
                      >
                        {nccs &&
                          nccs.map((ncc) => (
                            <ItemResult
                              value={ncc}
                              onItemClick={(ncc) =>
                                Form.setFieldValue("nhaCungCapNavigation", ncc)
                              }
                              labelProps={{ name: ncc.name }}
                            />
                          ))}
                      </List>
                    )}
                    {Form.values.nhaCungCapNavigation &&
                      Object.keys(Form.values.nhaCungCapNavigation).length >
                        0 && (
                        <Descriptions layout="vertical">
                          <Descriptions.Item label="Tên nhà cung cấp">
                            {Form.values.nhaCungCapNavigation?.name || "--"}
                          </Descriptions.Item>
                          <Descriptions.Item label="Số điện nhà cung cấp">
                            {Form.values.nhaCungCapNavigation?.phone || "--"}
                          </Descriptions.Item>
                          <Descriptions.Item label="Email nhà cung cấp">
                            {Form.values.nhaCungCapNavigation?.email || "--"}
                          </Descriptions.Item>
                          <Descriptions.Item label="Địa chỉ giao hàng">
                            {`${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.wardName || "--"
                            } - ${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.districtName || "--"
                            } - ${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.provinceName || "--"
                            }`}
                          </Descriptions.Item>
                          <Descriptions.Item label="Địa chỉ xuất hóa đơn">
                            {`${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.wardName
                            } - ${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.districtName
                            } - ${
                              Form.values.nhaCungCapNavigation?.diaChiNavigation
                                ?.provinceName || "--"
                            }`}
                          </Descriptions.Item>
                        </Descriptions>
                      )}
                  </Card>
                  <Card title="Thông tin sản phẩm">
                    {(isCreated || isUpdated) && (
                      <InputText
                        type="search"
                        value={productSearchText}
                        onChange={(e) => handleChangeProductSearchText(e)}
                        label="Tìm kiếm sản phẩm"
                      />
                    )}
                    {isCreated ||
                    (isUpdated && productSearchText.length > 0) ? (
                      <List onItemClick={(e) => console.log(e)}>
                        {sanPhamTrongKho.length > 0 &&
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
                                  onClickProduct(productInfo)
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
                    ) : null}
                    <Card title="Thông tin sản phẩm">
                      <ProductsTable
                        Form={Form}
                        isEdit={isCreated ? true : false}
                      />
                    </Card>
                    <div className="summary">
                      <Row gutter={[20, 20]}>
                        <Col md={12} xs={0}></Col>
                        <Col md={12} xs={24}>
                          {Form.values.chiTietNhapXuats && (
                            <>
                              {" "}
                              <div className="summaryItem">
                                <div>Số lượng:</div>
                                <div>{Form.values.tongSoLuong}</div>
                              </div>
                              <div className="summaryItem">
                                <div>Thành tiền:</div>
                                <div>
                                  {" "}
                                  {convertVND(
                                    Form.values.chiTietNhapXuats.reduce(
                                      (x, y) => x + y.thanhTien,
                                      0
                                    )
                                  ) || 0}
                                </div>
                              </div>
                              <div className="summaryItem">
                                {isCreated || isUpdated ? (
                                  <Popover
                                    trigger="click"
                                    content={
                                      <Space.Compact direction="vertical">
                                        <Space>
                                          Chiết khấu từ nhà sản xuất (%) :
                                        </Space>
                                        <Space.Compact>
                                          <Input
                                            style={{ width: "100%" }}
                                            value={Form.values.chietKhau}
                                            onChange={(e) =>
                                              handleApplyCoupon(e.target.value)
                                            }
                                            placeholder="Giá trị %"
                                            type="number"
                                            min={0}
                                            max={100}
                                          />{" "}
                                        </Space.Compact>
                                      </Space.Compact>
                                    }
                                  >
                                    <div className="linkColor">
                                      Chiết khấu từ nhà sản xuất <Plus /> :
                                    </div>
                                  </Popover>
                                ) : (
                                  <Space>Chiết khấu từ nhà sản xuất</Space>
                                )}
                                <div>
                                  {Form.values.chietKhau != 0 ? (
                                    <>
                                      <b>(-{Form.values.chietKhau}%) </b>-
                                      {convertVND(
                                        Form.values.chiTietNhapXuats.reduce(
                                          (x, y) => x + y.thanhTien,
                                          0
                                        ) -
                                          (Form.values.chiTietNhapXuats.reduce(
                                            (x, y) => x + y.thanhTien,
                                            0
                                          ) *
                                            (1 -
                                              (Form.values.chietKhau / 100 < 1
                                                ? Form.values.chietKhau / 100
                                                : 0)) || 0)
                                      )}
                                    </>
                                  ) : (
                                    convertVND(0)
                                  )}{" "}
                                </div>
                              </div>
                              <div className="summaryItem">
                                <div>
                                  <b>Tiền cần trả:</b>
                                </div>
                                <div> {convertVND(Form.values.thanhTien)}</div>
                              </div>
                              {/* <p> {convertNumberToWords(Form.values.thanhTien)} </p> */}
                            </>
                          )}
                        </Col>
                        <Col md={24}>
                          {isUpdated ||
                            (isReadOnly && (
                              <Card
                                title={
                                  <>
                                    <DollarSign /> Thanh toán
                                  </>
                                }
                                extra={
                                  <>
                                    {isCreated || isUpdated ? (
                                      <Checkbox
                                        checked={Form.values.daThanhToan}
                                        disabled={
                                          isCreated || isUpdated ? false : true
                                        }
                                        onChange={() =>
                                          Form.setFieldValue(
                                            "daThanhToan",
                                            !Form.values.daThanhToan
                                          )
                                        }
                                      >
                                        Thanh toán với nhà cung cấp
                                      </Checkbox>
                                    ) : Form.values.daThanhToan ? null : (
                                      <Button onClick={handleSubmitThanhToan}>
                                        Thanh toán
                                      </Button>
                                    )}
                                  </>
                                }
                              ></Card>
                            ))}
                        </Col>
                        <Col md={24}>
                          {(isReadOnly || isUpdated) && (
                            <Card
                              title={
                                <>
                                  <Truck /> Nhập kho
                                </>
                              }
                              extra={
                                <>
                                  {isCreated || isUpdated ? (
                                    <Checkbox
                                      checked={Form.values.daNhapHang}
                                      disabled={
                                        isCreated || isUpdated ? false : true
                                      }
                                      onChange={() =>
                                        Form.setFieldValue(
                                          "daNhapHang",
                                          !Form.values.daNhapHang
                                        )
                                      }
                                    >
                                      Nhập kho
                                    </Checkbox>
                                  ) : item?.daNhapHang ? null : (
                                    <Button
                                      onClick={() => handleSubmitNhapKho()}
                                    >
                                      Nhập kho
                                    </Button>
                                  )}
                                </>
                              }
                            ></Card>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
                <Col md={8}>
                  <Card title="Thông tin đơn nhập">
                    <Card title="Chi nhánh">
                      <Select
                        disabled={isReadOnly || isUpdated ? true : false}
                        value={Form.values?.maChiNhanh?.trim()}
                        onChange={(e) => handleOnChangeBranch(e)}
                        style={{ width: "100%" }}
                      >
                        {branchs &&
                          branchs.map((branch) => {
                            return (
                              <Select.Option value={branch?.maChiNhanh.trim()}>
                                {branch?.tenChiNhanh}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Card>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <FormCreateNCC open={openAddNCC} onCancel={setOpenAddNCC} />
        {/* <Modal style={{width:"100%"}} open={true}>
      <ThemSanPham/>
    </Modal> */}
      </div>
    </>
  );
};

export default TrangTaoDonNhap;
