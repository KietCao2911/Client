import React from "react";
import { Checkbox, Col, Dropdown, Menu, Radio, Row, Space } from "antd";
import "./colorOptions.scss";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidv4, v4 } from "uuid";
import { useEffect } from "react";
import { fetchALLColors } from "~/redux/slices/MauSacSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyCollapse from "~/components/commomComponents/Collapse";
export const Item = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get("color");
  const { checked, value, label } = props;
  const handleChange = (e) => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    params.color = e.target.value;
    setSearchParams({ ...params });
  };
  return (
    <div className="ColorCheckboxGroup" style={{ display: "inline" }}>
      <input
        onChange={(e) => handleChange(e)}
        checked={defaultValue == value || null}
        name="colorOptions"
        type="radio"
        id={value}
        value={value}
      />
      <label
        className={`${defaultValue == value ? "checked" : ""}`}
        style={{
          backgroundImage: `linear-gradient(to right,${value} ,#9d8e8e)`,
        }}
        htmlFor={value || defaultValue || null}
      ></label>
    </div>
  );
};

const ColorOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { colors } = useSelector((state) => state.MauSac);
  const [items, setItems] = useState([]);
  const params = useParams();
  const query = useSearchParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const Fetch = async () => {
      const arr = [];
      try {
        dispatch(fetchALLColors());
      } catch (error) {
        throw error;
      }
    };
    Fetch();
  }, []);
  // useEffect(()=>
  // {
  //   alert("Slug change")
  // },[])
  return (
    <MyCollapse label="Màu sắc">
      <div className="ColorOptions">
        <Row gutter={[20, 20]}>
          {colors &&
            colors.map((color) => {
              return (
                <Col span={4} key={v4()}>
                  <Item
                    value={color?.maMau?.trim()}
                    label={color?.maMau?.trim()}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </MyCollapse>
  );
};

export default ColorOptions;
