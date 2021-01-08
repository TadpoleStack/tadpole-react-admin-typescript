import React, { Component } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface propsType {
  style: object;
}
export default class LazyLoading extends Component<propsType, object> {
  state = {
    defaultStyle: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
  };
  render() {
    return (
      <div style={{ ...this.state.defaultStyle, ...this.props.style }}>
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          size={"large"}
        />
      </div>
    );
  }
}
