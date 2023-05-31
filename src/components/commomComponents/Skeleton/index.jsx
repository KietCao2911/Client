import { Col, Row } from "antd";
import { useState } from "react";
import { v4 } from "uuid";
import "./Skeleton.scss";
const Skeleton = () => {
  return (
    <div className="Skeleton skeleton">
      <div className="container skeleton">
        <div className="img skeleton"></div>
        <div className="content skeleton">
          <div className="title skeleton"></div>
          <div className="brand skeleton"></div>
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
