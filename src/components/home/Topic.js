import { Button, Col, Row } from "antd";
import React from "react";
import TopicItem from "./TopicItem";

const Topic = () => {
  return (
    <Row>
      {new Array(4).fill(null).map((_, i) => (
        <TopicItem key={i} />
      ))}
    </Row>
  );
};

export default Topic;
