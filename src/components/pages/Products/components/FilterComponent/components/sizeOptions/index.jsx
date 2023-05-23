import { Select, Checkbox, Menu, Row, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MyCollapse from "~/components/commomComponents/Collapse";
import "./sizeOptions.scss";
import { useCallback } from "react";
import { v4 } from "uuid";
const Radio = (props) => {
  const { value, checked, onChange } = props;
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <div className="Radio" key={v4()}>
      <input
        onChange={(e) => handleChange(e.target.value)}
        checked={value == checked}
        type="radio"
        name={value}
        value={value}
        id={value}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
};
const SizeOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size");
  const handleChange = (e) => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    params.size = e;
    setSearchParams({ ...params });
  };
  const constSizeNumber=useCallback(()=>
  {
    let arrEles = []
    for(let i =24;i<=47;i++)
    {
      arrEles.push( <Col xs={6} md={4} key={v4()}>
        <Radio value={i} checked={size} onChange={handleChange} />
      </Col>)
    }
    return arrEles
  },[size])
  return (
    <div className="SizeOptions">
      <MyCollapse label="Kích cỡ">
        <Row>
          {constSizeNumber().map(size=>
            {
              return size;
            })}         
          <Col xs={6} md={4}>
            <Radio value={"S"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"M"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"L"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"XL"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"2XL"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"3XL"} checked={size} onChange={handleChange} />
          </Col>
          <Col xs={6} md={4}>
            <Radio value={"4XL"} checked={size} onChange={handleChange} />
          </Col>
          
        </Row>
      </MyCollapse>
    </div>
  );
};

export default SizeOptions;
