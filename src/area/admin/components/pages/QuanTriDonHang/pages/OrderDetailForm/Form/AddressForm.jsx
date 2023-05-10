import { Card, Col, Form, Row } from "antd";
import { useFormik } from "formik";
import React, { memo, useCallback, useContext, useEffect, useState } from "react";
import InputText from "~/components/commomComponents/InputText";
import * as Yup from "yup";
import { SelectInput } from "~/components/commomComponents/SelectInput";
import * as ThanhToanApi from "~/redux/slices/ThanhToanSlice";
import { useDispatch, useSelector } from "react-redux";
import * as GiaoHangNhanhApi from "~/redux/slices/GioHang/GioHangSlice";
import {
  getFeeGHN,
  fetchGetProvince,
  fetchGetDistrict,
  fetchGetWard,
} from "~/redux/slices/GHNAPI/GhnApi";
import SelectCustom,{Option} from "~/components/commomComponents/SelectCustom";
const AddressForm = (props) => {

  const dispatch = useDispatch();
  const { ghnAPI, chiTietNhapXuats, thanhTien, tongSoLuong, phiShip } =
    useSelector((state) => state.GioHang);
 const { Provinces, Districts, Wards, FeeInfo, DistrictID, Loading } = ghnAPI;
  const { setLoading,orderForm, isUpdated, isReadOnly, isCreated } = props;
  const handleChangeProvince = (id, name) => {
    orderForm.setFieldValue("diaChiNavigation.ProvinceName", name);
    orderForm.setFieldValue("diaChiNavigation.ProvinceID", id);
    orderForm.setFieldValue("diaChiNavigation.DistrictName", "");
    orderForm.setFieldValue("diaChiNavigation.DistrictID", null);
    orderForm.setFieldValue("diaChiNavigation.WardName", "");
    orderForm.setFieldValue("diaChiNavigation.WardID", null);
    dispatch(GiaoHangNhanhApi.fetchGetDistrict(id));
  };
  const handleChangeDistrict = (id, name) => {
    orderForm.setFieldValue("diaChiNavigation.DistrictName", name);
    orderForm.setFieldValue("diaChiNavigation.DistrictID", id);
    orderForm.setFieldValue("diaChiNavigation.WardName", "");
    orderForm.setFieldValue("diaChiNavigation.WardID", null);
    dispatch(GiaoHangNhanhApi.fetchGetWard(id));
  };
  const CalFee = (id, name) => {
    if (id == null) {
      return;
    } else {
      orderForm.setFieldValue("diaChiNavigation.WardName", name);
      orderForm.setFieldValue("diaChiNavigation.WardID", id);
      dispatch(
        GiaoHangNhanhApi.fetchPostCalFee({
          from_district_id: 1572,
          service_type_id: 2,
          to_district_id: Wards.data[0].DistrictID,
          to_ward_code: id,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: thanhTien,
          coupon: null,
        })
      );
    }
  };
  useEffect(() => {
    dispatch(GiaoHangNhanhApi.fetchGetProvinces());
  }, []);
  return (
    <div title="Địa chỉ giao hàng">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputText
            className={`${
              orderForm.touched.diaChiNavigation?.name &&
              orderForm.errors.diaChiNavigation?.name &&
              "error"
            } `}
            name={"diaChiNavigation.name"}
            label="Tên"
            value={orderForm.values.diaChiNavigation?.name}
            onChange={(e) => {
              orderForm.setFieldValue("diaChiNavigation.name", e.target.value);
              orderForm.setFieldTouched("diaChiNavigation.name", true);
            }}
            disabled={isReadOnly ? true : false}
          />
          {orderForm.touched.diaChiNavigation?.name &&
            orderForm.diaChiNavigation?.errors.name && (
              <span className="error">
                {orderForm.errors.diaChiNavigation?.name}
              </span>
            )}
        </Col>
        <Col span={24}>
          <InputText
            disabled={isReadOnly ? true : false}
            className={`${
              orderForm.touched.diaChiNavigation?.phone &&
              orderForm.errors.diaChiNavigation?.phone &&
              "error"
            } `}
            name={"diaChiNavigation.phone"}
            label="Số điện thoại"
            value={orderForm.values.diaChiNavigation?.phone}
            onChange={(e) => {
              orderForm.setFieldTouched("diaChiNavigation.phone", true);
              orderForm.setFieldValue("diaChiNavigation.phone", e.target.value);
            }}
          />
          {orderForm.touched.diaChiNavigation?.phone &&
            orderForm.errors.diaChiNavigation?.phone && (
              <span className="error">
                {orderForm.errors.diaChiNavigation?.phone}
              </span>
            )}
        </Col>
        <Col span={24}>
          <InputText
            disabled={isReadOnly ? true : false}
            className={`${
              orderForm.touched.diaChiNavigation?.email &&
              orderForm.errors.diaChiNavigation?.email &&
              "error"
            } `}
            name={"diaChiNavigation.email"}
            label="email"
            value={orderForm.values.diaChiNavigation?.email?.trim()}
            onChange={(e) => {
              orderForm.setFieldValue("diaChiNavigation.email", e.target.value);
              orderForm.setFieldTouched("diaChiNavigation.email", true);
            }}
          />
          {orderForm.touched.diaChiNavigation?.email &&
            orderForm.errors.diaChiNavigation?.email && (
              <span className="error">
                {orderForm.errors.diaChiNavigation?.email}
              </span>
            )}
        </Col>
        <Col span={24}>
          <InputText
            disabled={isReadOnly ? true : false}
            name={"diaChiNavigation.addressDsc"}
            label="Chi tiết địa chỉ"
            value={orderForm.values.diaChiNavigation?.addressDsc}
            className={`${
              orderForm.touched.diaChiNavigation?.addressDsc &&
              orderForm.errors.diaChiNavigation?.addressDsc &&
              "error"
            } `}
            onChange={(e) => {
              orderForm.setFieldValue(
                "diaChiNavigation.addressDsc",
                e.target.value
              );
              orderForm.setFieldTouched("diaChiNavigation.addressDsc", true);
            }}
          />
          {orderForm.touched.diaChiNavigation?.addressDsc &&
            orderForm.errors.diaChiNavigation?.addressDsc && (
              <span className="error">
                {orderForm.errors.diaChiNavigation?.addressDsc}
              </span>
            )}
        </Col>
        <Col span={24}>
        <SelectCustom
                  value={orderForm.values?.diaChiNavigation?.ProvinceID || ""}
                  onChange={handleChangeProvince}
                  name={"ProvinceID"}
                >
                  <Option value={null}>Vui lòng chọn Tỉnh/Thành phố</Option>
                  {Provinces.data &&
                    Provinces.data.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeProvince(
                              item.ProvinceID,
                              item.ProvinceName
                            )
                          }
                          key={item.ProvinceID}
                          value={item.ProvinceID}
                        >
                          {item.ProvinceName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors?.ProvinceID && (
                  <span className="error">{orderForm.errors?.ProvinceID}</span>
                )}
        </Col>
        <Col span={24}>
        <SelectCustom
                  value={orderForm.values.diaChiNavigation?.DistrictID || ""}
                  onChange={handleChangeDistrict}
                  loading={Loading.Districts}
                  name="DistrictID"
                  defaultLabel="Quận/Huyện"
                >
                  <Option value={""}>Vui lòng chọn Quận/Huyện</Option>
                  {Districts.data &&
                    Districts?.data?.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeDistrict(
                              item.DistrictID,
                              item.DistrictName
                            )
                          }
                          key={item.DistrictID}
                          value={item.DistrictID}
                        >
                          {item.DistrictName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors?.DistrictID && (
                  <span className="error">{orderForm.errors?.DistrictID}</span>
                )}
        </Col>
        <Col span={24}>
        <SelectCustom
                  value={orderForm.values?.diaChiNavigation?.WardID || ""}
                  onChange={(e) => CalFee(e)}
                  loading={Loading.Wards}
                  defaultLabel="Xã/Phường"
                  name="WardID"
                >
                  <Option value={""}>Vui lòng chọn Xã/Phường</Option>
                  {Wards.data &&
                    Wards?.data?.map((item) => {
                      return (
                        <Option
                          onClick={() => CalFee(item.WardCode, item.WardName)}
                          value={item.WardCode}
                        >
                          {item.WardName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors?.WardID && (
                  <span className="error">{orderForm.errors?.WardID}</span>
                )}
        </Col>
      </Row>
    </div>
  );
};

export default memo(AddressForm);
