import React from "react";
import {TimerIndicator} from "./indicator.styled";

export default function Indicator(props) {
      return (
        <TimerIndicator>
            <div className="layout">
                <div className="indicator" style={{ width: `${props.indicatorWidth}%` }}></div>
            </div>
        </TimerIndicator>
      );
  }