import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
const Icon: any = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1883324_2lxdrlbk6en.js",
});
/**
 * iconfont图标
 */
interface propsType{
  [propName: string]: any
}
class IconFont extends React.Component<propsType> {
  render() {
    return <Icon {...this.props}></Icon>;
  }
}
export default IconFont;
