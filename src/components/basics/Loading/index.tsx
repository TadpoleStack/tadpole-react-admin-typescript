import React, { Component } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ErrorLoading, PastDelayLoading } from "./style";

interface propsType {
  error: boolean;
  pastDelay: boolean;
  [propName: string]: any;
}
export default class Loading extends Component<propsType> {
  render() {
    if (this.props.error) {
      return <ErrorLoading>页面走丢了！</ErrorLoading>;
    } else if (this.props.pastDelay) {
      return (
        <PastDelayLoading>
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            size={"large"}
          />
        </PastDelayLoading>
      );
    } else {
      return null;
    }
  }
}
