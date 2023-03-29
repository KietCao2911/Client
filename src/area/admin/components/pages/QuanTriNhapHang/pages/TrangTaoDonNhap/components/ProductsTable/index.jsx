import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import convertVND from "~/components/utils/ConvertVND";

const ProductsTable = (props) => {
  const { Form, isEdit } = props;
  useEffect(() => {}, [Form.values]);
  const columns = [
    {
      title: "Mã CTK",
      render: (_, record) => {
        return <a>{record?.maSanPham}</a>;
      },
    },
    {
      title: "Tên sản phẩm",
      render: (_, record) => {
        return <p>{record?.sanPhamNavigation?.tenSanPham}</p>;
      },
    },
    {
      title: "Đơn giá",
      render: (_, record) => {
        return isEdit ? (
          <Input
            onChange={(e) => onChangeDonGia(record.maSanPham, e.target.value)}
            value={record?.donGia || 0}
          />
        ) : (
          <p>{convertVND(record?.donGia || 0)} </p>
        );
      },
    },
    {
      title: "Số lượng ",
      render: (_, record) => {
        return isEdit ? (
          <Input
            type="number"
            min={1}
            onChange={(e) => onChangeSoLuong(record.maSanPham, e.target.value)}
            value={record?.soLuong}
          />
        ) : (
          <p>{record?.soLuong}</p>
        );
      },
    },
    {
      title: "Thành tiền",
      render: (_, record) => {
        return <p>{convertVND(record?.thanhTien)}</p>;
      },
    },
    {
      title: "",
      render: (_, record) => {
        return (
          isEdit && (
            <DeleteOutlined onClick={() => handleDelete(record.maSanPham)} />
          )
        );
      },
    },
  ];
  const onChangeDonGia = (key, value) => {
    const obj = Form.values.chiTietNhapXuats.find(
      (x) => x.maSanPham.trim() == key.trim()
    );
    const index = Form.values.chiTietNhapXuats.indexOf(obj);
    const ctpns = [...Form.values.chiTietNhapXuats];
    const ctpn = { ...Form.values.chiTietNhapXuats[index] };
    if (index > -1) {
      ctpn.donGia = Number(value);
      ctpn.thanhTien = value * ctpn.soLuong;
      ctpns[index] = ctpn;
      let prices = ctpns.reduce((x, y) => {
        return x + Number(y.thanhTien);
      }, 0);
      if (Form.values.chietKhau > 0) {
        prices = prices * (1 - Form.values.chietKhau / 100);
      }
      const phiship = Form.values?.phiship || 0;
      Form.setFieldValue("chiTietNhapXuats", ctpns);
      Form.setFieldValue("thanhTien", prices + phiship);
    }
  };
  const onChangeSoLuong = (key, value) => {
    const obj = Form.values.chiTietNhapXuats.find(
      (x) => x.maSanPham.trim() == key.trim()
    );
    const index = Form.values.chiTietNhapXuats.indexOf(obj);
    const ctpns = [...Form.values.chiTietNhapXuats];
    const ctpn = { ...Form.values.chiTietNhapXuats[index] };

    if (index > -1) {
      ctpn.soLuong = Number(value);
      ctpn.thanhTien = Number(value * ctpn.donGia);
      ctpns[index] = ctpn;
      let prices = ctpns.reduce((x, y) => {
        console.log({ x, y });
        return x + Number(y.thanhTien);
      }, 0);
      console.log({ prices });
      if (Form.values.chietKhau > 0) {
        prices = prices * (1 - Form.values.chietKhau / 100);
      }
      let totalQty = ctpns.reduce((x, y) => {
        return x + Number(y.soLuong);
      }, 0);
      const phiship = Form.values?.phiship || 0;
      Form.setFieldValue("chiTietNhapXuats", ctpns);
      Form.setFieldValue("thanhTien", prices + phiship);
      Form.setFieldValue("tongSoLuong", totalQty);
    }
  };
  const handleDelete = (key) => {
    const temp = [...Form.values.chiTietNhapXuats];
    const obj = temp.find((x) => x.maSanPham.trim() == key.trim());
    const index = temp.indexOf(obj);
    if (index > -1) {
      temp.splice(index, 1);
      if (temp.length <= 0) {
        Form.setFieldValue("phiship", 0);
        Form.setFieldValue("thanhTien", 0);
        Form.setFieldValue("chietKhau", 0);
        Form.setFieldValue("tongSoLuong", 0);
      } else {
        Form.setFieldValue(
          "tongSoLuong",
          Form.values.tongSoLuong - obj?.soLuong
        );
        Form.setFieldValue("thanhTien", Form.values.thanhTien - obj?.thanhTien);
      }
      Form.setFieldValue("chiTietNhapXuats", temp);
    }
  };
  return (
    <>
      <Table
        bordered
        scroll={{ x: 400 }}
        columns={columns}
        dataSource={Form.values.chiTietNhapXuats || []}
      ></Table>
    </>
  );
};

export default memo(ProductsTable);
