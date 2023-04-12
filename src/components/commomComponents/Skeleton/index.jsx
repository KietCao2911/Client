import { Col, Row } from "antd";
import { useState } from "react";
import { v4 } from "uuid";
import "./Skeleton.scss";
const Skeleton = () => {
  return (
    <div className="Skeleton">
      <div className="container">
        <div className="img"></div>
        <div className="content">
          <div className="title"></div>
          <div className="brand"></div>
        </div>
      </div>
    </div>
  );
};

const Skeletons = ({ itemsSize }) => {
  const renderSkeleton = () => {
    let arr = [];
    for (let i = 0; i < itemsSize; i++) {
      arr.push(<Skeleton />);
    }
    return arr;
  };
  return (
    <Row gutter={[20, 20]}>
      {renderSkeleton().map((item) => {
        return (
          <Col key={v4()} xs={24} md={8} xxl={6}>
            <Skeleton />
          </Col>
        );
      })}
    </Row>
  );
};

export default Skeletons;
