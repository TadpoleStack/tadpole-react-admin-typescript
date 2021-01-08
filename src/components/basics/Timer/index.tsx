import React, { Component } from "react";
import { TimerWrap } from "./style";
interface propType {
  width?: number;
  height?: number;
  position?: string;
}
export default class Timer extends Component<propType> {
  state: any = {};
  constructor(props: propType) {
    super(props);
    this.state = {
      style: {
        width: this.props.width || window.innerWidth / 2,
        height: this.props.height || window.innerHeight,
        position: this.props.position || "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        color: "#ffffff",
        fontSize: (this.props.width || window.innerWidth / 2) / 8,
      },
      timer: null,
      formatTime: [0, 0, 0, 0, 0, 0],
      opacity: [
        "1",
        "0.6",
        "0.5",
        "0.4",
        "0.3",
        "0.2",
        "0.1",
        "0.05",
        "0.025",
        "0",
      ],
      cell: {
        width: (this.props.width || window.innerWidth / 2) / 6,
        timeScale: [
          [0, 1, 2],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 1, 2, 3, 4, 5],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [0, 1, 2, 3, 4, 5],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ],
      },
    };
  }
  computedOpacity = (curr: number, index: number): string | number => {
    return this.state.opacity[Math.abs(curr - index)] || 0;
  };
  computedTimeArray = (): Array<string> => {
    return Array.from(new Date().toTimeString().slice(0, 8).replace(/:/g, ""));
  };
  componentDidMount() {
    let timer = setInterval((): void => {
      this.setState({ formatTime: this.computedTimeArray() });
    }, 1000);
    this.setState({ timer: timer });
  }
  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({ timer: null });
  }
  render() {
    return (
      <TimerWrap style={this.state.style} cell={this.state.cell}>
        {this.state.cell.timeScale.map((v: Array<number>, k: number) => (
          <div
            className="column"
            key={k}
            style={{
              transform: `translateY(-${
                this.state.formatTime[k] * this.state.cell.width
              }px)`,
            }}
          >
            {v.map((v2: number) => (
              <div
                className="cell"
                key={v2}
                style={{
                  opacity: this.computedOpacity.bind(
                    this,
                    this.state.formatTime[k],
                    v2
                  )(),
                }}
              >
                {v2}
              </div>
            ))}
          </div>
        ))}
      </TimerWrap>
    );
  }
}
