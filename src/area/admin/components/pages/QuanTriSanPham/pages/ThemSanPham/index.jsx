import {
  BarcodeOutlined,
  CloseOutlined,
  FileAddFilled,
  FileAddOutlined,
  RestFilled,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Switch,
} from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
import * as Yup from "yup";
import convertVND from "~/components/utils/ConvertVND";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ItemVersion from "../../components/ItemVersion/ItemVersion";
import { v4 } from "uuid";
import ChildProduct from "../../components/ChildProduct";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as KichCoAPI from "~/redux/slices/KichCoSlice";
import * as MauSacAPI from "~/redux/slices/MauSacSlice";
import * as TypeAPI from "~/redux/slices/Type/TypeSlice";
import * as BranchAPI from "~/redux/slices/Branch/BranchSlice";
import * as BrandAPI from "~/redux/slices/Brand/BrandSlice";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import * as VatAPI from "~/redux/slices/Vat/VatSlice";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const [khoiTaoKho, setKhoiTaoKho] = useState(false);
  const [initStyles, setInitStyle] = useState(false);
  const [versions, setVersions] = useState([]);
  const [openDes, setOpenDsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const { sizes } = useSelector((state) => state.KichCo);
  const { colors } = useSelector((state) => state.MauSac);
  const { types } = useSelector((state) => state.Type);
  const { brands } = useSelector((state) => state.Brand);
  const { branchs } = useSelector((state) => state.Branch);
  const { vats } = useSelector((state) => state.Vat);
  const [Vat, setVat] = useState(false);
  const [modalAddNewBrand, setmodalAddNewBrand] = useState({
    stateModal: false,
    name: "",
    logoLink: "",
  });
  const [modalAddNewType, setmodalAddNewType] = useState({
    stateModal: "",
    value: "",
  });
  const nav = useNavigate();
  console.log({ branchs });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(KichCoAPI.fetchALLSize());
    dispatch(MauSacAPI.fetchALLColors());
    dispatch(TypeAPI.fetchGetTypes());
    dispatch(BranchAPI.fetchGetBranch());
    dispatch(BrandAPI.fetchGetBrand());
    dispatch(VatAPI.fetchGetAllVats());
  }, []);
  const form = useFormik({
    initialValues: {
      product: {
        tenSanPham: "",
        maSanPham: "",
        IDType: null,
        IDBrand: null,
        IDVat: null,
        giaNhap: 0,
        giaBanLe: 0,
        giaBanSi: 0,
        giaVon: 0,
        soLuongTon: 0,
        status: true,
        mota: "",
        SanPhams: [],
        IDVat: null,
        khoHangs: [...branchs],
      },
    },

    validationSchema: Yup.object({
      product: Yup.object().shape({
        tenSanPham: Yup.string().required("Trường này là bắt buộc"),
        giaNhap: Yup.number(),
      }),
    }),
  });
  const paramsQty = {
    soLuongTon: form.values.product.soLuongTon,
    giaBanSi: form.values.product.giaBanSi,
    giaBanLe: form.values.product.giaBanLe,
    giaNhap: form.values.product.giaNhap,
    giaVon: form.values.product.giaVon,
    tenSanPham: form.values.product.tenSanPham,
  };
  console.log({ modalAddNewBrand, modalAddNewType });
  const handleAddNewType = () => {
    const body = {
      name: modalAddNewType.value,
    };
    dispatch(TypeAPI.fetchPostTypes({ body }));
  };
  const handleAddNewBrand = () => {
    const body = {
      ...modalAddNewBrand,
    };
    dispatch(BrandAPI.fetchPostBrand({ body }));
  };
  function isNumeric(str) {
    return !isNaN(str);
  }
  const handleChangePrice = (props) => {
    const { e, fieldName } = props;
    let value = e.target.value;
    if (value.length > 0 && !isNumeric(value)) {
      //  alert("Wrog")
    } else {
      form.setFieldValue(`product.${fieldName}`, value);
      const res = versions.map((item) => {
        return item.map((child) => {
          return {
            ...child,
            [fieldName]: value,
          };
        });
      });
      startTransition(() => {
        setVersions([...res]);
      });
    }
  };
  const handleSubmt = async () => {
    const temp = [];
    versions.forEach((item) => {
      item.map((c) => {
        if (c.IDColor && c.IDSize) {
          temp.push(c);
        }
      });
    });
    const branchsTemp = branchs.map((item) => {
      return {
        maChiNhanh: item.maChiNhanh,
      };
    });
    let params = {
      ...form.values.product,
      SanPhams: temp,
      khoHangs: branchsTemp,
    };
    if (form.values.product.tenSanPham) {
      try {
        console.log({ body: params });
        dispatch(SanPhamAPI.fetchPostProduct({ body: params }));
        // const {payload} = res;
        // nav(`/admin/trang-quan-tri-san-pham/${payload?.slug.trim()+"/versions/"+payload?.sanPhams[0]?.maSanPham?.trim()}`)
      } catch (error) {}
    }
  };
  const onSwitchKho = (status) => {
    if (!status) {
      form.setFieldValue("product.soLuongTon", 0);
      form.setFieldValue("product.giaVon", 0);
      const res = versions.map((item) => {
        return item.map((child) => {
          return {
            ...child,
            soLuongTon: 0,
            giaVon: 0,
          };
        });
      });
      setVersions([...res]);
    }
    setKhoiTaoKho(status);
  };
  const handleClickAddFieldChild = () => {
    const { giaBanLe, giaVon, giaBanSi, soLuongTon, tenSanPham, giaNhap } =
      form.values.product;
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
        },
      ],
    ]);
  };
  return (
    <Form>
      <Row gutter={[10, 20]}>
        <Col xl={16} md={{ span: 24, order: 1 }} xs={{ span: 24, order: 2 }}>
          <div className="left">
            <Row gutter={[0, 20]}>
              <Col md={24}>
                <Card title="Thông tin sản phẩm" style={{ width: "100%" }}>
                  <Row gutter={[20, 20]}>
                    <Col md={12} xs={24}>
                      <InputText
                        placeHolder="Mã sản phẩm (Có thể bỏ trống)"
                        label="Mã sản phẩm"
                        name="product.maSanPham"
                        value={form.values.product.maSanPham}
                        onChange={form.handleChange}
                      ></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText
                        label="Tên sản phẩm "
                        name={"product.tenSanPham"}
                        placeHolder={"Tên sản phẩm (Không thể bỏ trống)"}
                        value={form.values.product.tenSanPham}
                        onChange={form.handleChange}
                      />
                      {form.errors?.product?.tenSanPham && (
                        <span className="error">
                          {form.errors?.product?.tenSanPham}
                        </span>
                      )}
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText
                        label="Giá bán lẻ"
                        name="product.giaBanLe"
                        value={form.values.product.giaBanLe}
                        onChange={(e) =>
                          handleChangePrice({ e, fieldName: "giaBanLe" })
                        }
                      ></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText
                        label="Giá nhập"
                        name="product.giaNhap"
                        value={form.values.product.giaNhap}
                        onChange={(e) =>
                          handleChangePrice({ e, fieldName: "giaNhap" })
                        }
                      ></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText
                        name="product.giaBanSi"
                        value={form.values.product.giaBanSi}
                        label="Giá sỉ"
                        onChange={(e) =>
                          handleChangePrice({ e, fieldName: "giaBanSi" })
                        }
                      ></InputText>
                    </Col>
                    <Col md={24} xs={24}>
                      <Card
                        title="Mô tả"
                        extra={
                          <Switch
                            defaultChecked={false}
                            onChange={() => setOpenDsc(!openDes)}
                          />
                        }
                      >
                        {!openDes ? (
                          "Thêm mô tả cho sản phẩm"
                        ) : (
                          <CKEditor
                            onChange={(e, editor) =>
                              form.setFieldValue(
                                "product.mota",
                                editor.getData()
                              )
                            }
                            editor={ClassicEditor}
                          >
                            Mô tả sản phẩm
                          </CKEditor>
                        )}
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  style={{ width: "100%" }}
                  title="Khởi tạo kho hàng"
                  extra={<Switch onChange={(e) => onSwitchKho(e)} />}
                >
                  <p>Ghi nhận số lượng tồn ban đầu</p>
                  {khoiTaoKho && (
                    <Row gutter={[20, 20]}>
                      <Col md={12} xs={24}>
                        <InputText
                          label="Tồn kho ban đầu"
                          value={form.values.product.soLuongTon}
                          onChange={(e) =>
                            handleChangePrice({ e, fieldName: "soLuongTon" })
                          }
                        ></InputText>
                      </Col>
                      <Col md={12} xs={24}>
                        <InputText
                          label="Giá vốn"
                          placeHolder="Giá vốn"
                          value={form.values.product.giaVon}
                          onChange={(e) =>
                            handleChangePrice({ e, fieldName: "giaVon" })
                          }
                        ></InputText>
                      </Col>
                    </Row>
                  )}
                </Card>
              </Col>
              <Col xs={24} md={24}>
                <Card
                  style={{ width: "100%" }}
                  title="Khởi tạo phiên bản"
                  extra={<Switch onChange={(e) => setInitStyle(e)} />}
                >
                  <p>Thêm các phiên bản cho sản phẩm</p>
                  <Row gutter={[0, 40]}>
                    {" "}
                    {initStyles &&
                      versions.map((i, index) => (
                        <ItemVersion
                          colors={colors}
                          sizes={sizes}
                          item={i}
                          branchs={branchs}
                          {...paramsQty}
                          index={index}
                          versions={versions}
                          setVersions={setVersions}
                        />
                      ))}
                  </Row>
                  {initStyles && (
                    <MyButton
                      style={{ width: "20rem" }}
                      onClick={() => handleClickAddFieldChild()}
                    >
                      Thêm trường
                    </MyButton>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={8} md={{ span: 24, order: 2 }} xs={{ span: 24, order: 1 }}>
          <div className="right">
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  title="Loại hàng"
                  style={{ minWidth: "100%" }}
                  extra={
                    <a
                      onClick={() =>
                        setmodalAddNewType({
                          value: modalAddNewType.value,
                          stateModal: true,
                        })
                      }
                    >
                      Thêm mới loại hàng <FileAddOutlined />{" "}
                    </a>
                  }
                >
                  <Select
                    value={form.values.product.IDType}
                    style={{ minWidth: "100%" }}
                    onChange={(e) => form.setFieldValue("product.IDType", e)}
                  >
                    <Select.Option value={null}>
                      Chọn loại sản phẩm
                    </Select.Option>

                    {types &&
                      types.map((type) => (
                        <Select.Option key={v4()} value={type.id}>
                          {type.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Card>
                <Card
                  title="Nhãn hàng"
                  extra={
                    <a
                      onClick={() =>
                        setmodalAddNewBrand({
                          value: modalAddNewBrand.value,
                          stateModal: true,
                        })
                      }
                    >
                      Thêm mới nhãn hàng <FileAddOutlined />
                    </a>
                  }
                >
                  <Select
                    style={{ minWidth: "100%" }}
                    value={form.values.product.IDBrand}
                    onChange={(e) => form.setFieldValue("product.IDBrand", e)}
                  >
                    <Select.Option value={null}>Chọn nhãn hàng</Select.Option>

                    {brands &&
                      brands.map((brand) => (
                        <Select.Option value={brand.id}>
                          {brand.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  style={{ width: "100%" }}
                  title="Cho phép bán"
                  extra={
                    <Switch
                      defaultChecked={form.values.product.status ? true : false}
                      onChange={(s) => form.setFieldValue("product.status", s)}
                    ></Switch>
                  }
                >
                  {form.values.product.status ? "Cho" : "Không"} phép bán sản
                  phẩm này.
                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card
                  style={{ width: "100%" }}
                  title="Thuế"
                  extra={
                    <Switch
                      defaultChecked={Vat}
                      onChange={(s) => setVat(s)}
                    ></Switch>
                  }
                >
                  {Vat && (
                    <>
                      <Select
                        style={{ width: "100%" }}
                        value={form.values.product.IDVat}
                      >
                        <Select.Option value={null}>
                          Chọn thuế đầu vào
                        </Select.Option>
                        {vats &&
                          vats.map((vat) => {
                            return (
                              <Select.Option
                                value={vat.id || null}
                              >{`${vat.name} - thuế đầu vào ${vat?.giaTriThueDauVao}%`}</Select.Option>
                            );
                          })}
                      </Select>
                      <Select
                        style={{ width: "100%" }}
                        value={form.values.product.IDVat}
                      >
                        <Select.Option value={null}>
                          Chọn thuế đầu ra
                        </Select.Option>
                        {vats &&
                          vats.map((vat) => {
                            return (
                              <Select.Option
                                value={vat.id || null}
                              >{`${vat.name} - thuế đầu ra ${vat?.giaTriThueDauRa}%`}</Select.Option>
                            );
                          })}
                      </Select>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={{ span: 24, order: 3 }}>
          {versions.length > 0 && (
            <Card title="Phiên bản">
              <Row gutter={[0, 20]}>
                {versions &&
                  versions.map(
                    (item, parentIndex) =>
                      item &&
                      item.map((child, index) => {
                        if (child.IDColor && child.IDSize) {
                          return (
                            <Col xl={24}>
                              <ChildProduct
                                versions={versions}
                                setVersions={setVersions}
                                parentIndex={parentIndex}
                                index={index}
                                value={child}
                              />
                            </Col>
                          );
                        }
                      })
                  )}
              </Row>
            </Card>
          )}
        </Col>
      </Row>
      <div className="actions">
        <Row>
          <MyButton
            style={{ backgroundColor: "red", width: "15rem" }}
            icon={loading ? <Spin /> : <CloseOutlined />}
          >
            Thoát
          </MyButton>
          <MyButton
            style={{ backgroundColor: "green", width: "15rem" }}
            icon={<SaveOutlined />}
            onClick={handleSubmt}
          >
            Tạo
          </MyButton>
          <MyButton style={{ width: "15rem" }} icon={<BarcodeOutlined />}>
            In mã vạch
          </MyButton>
        </Row>
      </div>
      <Modal
        onOk={() => handleAddNewType()}
        title="Thêm mới loại hàng"
        okText="Tạo mới"
        cancelText="Hủy"
        open={modalAddNewType.stateModal}
        onCancel={() => setmodalAddNewType(false)}
      >
        <Form.Item label="Tên loại hàng">
          <Input
            placeholder="Nhập tên loại hàng..."
            value={modalAddNewType.value}
            onChange={(e) =>
              setmodalAddNewType({ ...modalAddNewType, value: e.target.value })
            }
          />
        </Form.Item>
      </Modal>
      <Modal
        onOk={() => handleAddNewBrand()}
        title="Thêm mới nhãn hàng"
        okText="Tạo mới"
        cancelText="Hủy"
        open={modalAddNewBrand.stateModal}
        onCancel={() =>
          setmodalAddNewBrand({ ...modalAddNewBrand, stateModal: false })
        }
      >
        <Form.Item label="Tên nhãn hàng">
          <Input
            placeholder="Nhập tên nhãn hàng..."
            value={modalAddNewBrand.name}
            onChange={(e) =>
              setmodalAddNewBrand({
                ...modalAddNewBrand,
                name: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label="URL">
          <Input
            placeholder="URL LOGO"
            value={modalAddNewBrand.logoLink}
            onChange={(e) =>
              setmodalAddNewBrand({
                ...modalAddNewBrand,
                logoLink: e.target.value,
              })
            }
          ></Input>
        </Form.Item>
      </Modal>
    </Form>
  );
};

export default CreateProduct;
