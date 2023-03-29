import { Card, Col, Form, Row } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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

const AddressForm = (props) => {
  const [Provinces, setProvinces] = useState([]);
  const [Districts, setDistricts] = useState([]);
  const [Wards, setWards] = useState([]);
  const { setLoading, orderForm, isUpdated, isReadOnly, isCreated } = props;
  console.log({ props });
  const handleChangeProvince = async (e) => {
    orderForm.setFieldValue(
      "diaChiNavigation.provinceName",
      e.target.options[e.target.selectedIndex].text
    );
    orderForm.setFieldValue("diaChiNavigation.provinceID", e.target.value);
    const res = await fetchGetDistrict(e.target.value);
    setDistricts(res);
  };
  const handleChangeDistrict = async (e) => {
    orderForm.setFieldValue(
      "diaChiNavigation.districtName",
      e.target.options[e.target.selectedIndex].text
    );
    orderForm.setFieldValue("diaChiNavigation.districtID", e.target.value);
    const res = await fetchGetWard(e.target.value);
    setWards(res);
  };
  const CalFee = async (e) => {
    if (e.target.value == null) {
      return;
    } else {
      orderForm.setFieldValue(
        "diaChiNavigation.wardName",
        e.target.options[e.target.selectedIndex].text
      );
      orderForm.setFieldValue("diaChiNavigation.wardID", e.target.value);

      const fee = await getFeeGHN({
        from_district_id: 1572,
        service_type_id: 2,
        to_district_id: Wards.data[0].DistrictID,
        to_ward_code: e.target.value,
        height: 50,
        length: 20,
        weight: 200,
        width: 20,
        insurance_value: 0,
        coupon: null,
      });
      orderForm.setFieldValue("phiship", fee?.data?.total || 0);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const provinces = await fetchGetProvince();
      const districts = await fetchGetDistrict(
        orderForm.values.diaChiNavigation.provinceID
      );
      const wards = await fetchGetWard(
        orderForm.values.diaChiNavigation.districtID
      );
      setProvinces(provinces);
      setDistricts(districts);
      setWards(wards);
    };
    const con = async () => {
      if (isUpdated || isReadOnly) {
        fetch();
      } else {
        const provinces = await fetchGetProvince();
        setProvinces(provinces);
      }
    };
    con();
  }, [
    orderForm.values.diaChiNavigation?.districtID,
    orderForm.values.diaChiNavigation?.provinceID,
    orderForm.values.diaChiNavigation?.wardID,
  ]);
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
          <SelectInput
            disabled={isReadOnly ? true : false}
            value={orderForm.values.diaChiNavigation?.provinceID || null}
            onChange={handleChangeProvince}
            name={"diaChiNavigation.provinceID"}
          >
            <option value={""}>Vui lòng chọn Tỉnh/Thành phố</option>
            {Provinces.data &&
              Provinces.data.map((item) => {
                return (
                  <option key={item.ProvinceID} value={item.ProvinceID}>
                    {item.ProvinceName}
                  </option>
                );
              })}
          </SelectInput>
          {orderForm.touched.diaChiNavigation?.provinceID &&
            orderForm.errors.diaChiNavigation?.provinceID && (
              <span className="error">
                {orderForm.errors.diaChiNavigation?.provinceID}
              </span>
            )}
        </Col>
        <Col span={24}>
          <SelectInput
            disabled={isReadOnly ? true : false}
            value={orderForm.values.diaChiNavigation?.districtID || null}
            onChange={handleChangeDistrict}
            name="diaChiNavigation.districtID"
            defaultLabel="Quận/Huyện"
          >
            <option value={""}>Vui lòng chọn Quận/Huyện</option>
            {Districts.data &&
              Districts?.data?.map((item) => {
                return (
                  <option key={item.DistrictID} value={item.DistrictID}>
                    {item.DistrictName}
                  </option>
                );
              })}
          </SelectInput>
          {orderForm.touched.diaChiNavigation?.districtID &&
            orderForm.errors.districtID && (
              <span className="error">{orderForm.errors.districtID}</span>
            )}
        </Col>
        <Col span={24}>
          <SelectInput
            disabled={isReadOnly ? true : false}
            value={orderForm.values.diaChiNavigation?.wardID || null}
            onChange={(e) => CalFee(e)}
            defaultLabel="Xã/Phường"
            name="diaChiNavigation.wardId"
          >
            <option value={""}>Vui lòng chọn Xã/Phường</option>
            {Wards.data &&
              Wards?.data?.map((item) => {
                return <option value={item.WardCode}>{item.WardName}</option>;
              })}
          </SelectInput>
          {orderForm.touched.diaChiNavigation?.wardID &&
            orderForm.errors.wardID && (
              <span className="error">{orderForm.errors.wardId}</span>
            )}
        </Col>
      </Row>
    </div>
  );
};

export default AddressForm;
