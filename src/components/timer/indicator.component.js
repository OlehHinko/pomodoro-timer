import React from "react";
import { connect } from "react-redux";
import {TimerIndicator} from "./indicator.styled";

function Indicator(props) {
      return (
        <TimerIndicator>
            <div className="layout">
                <div className="indicator" style={{ width: props.indicatorWidth}}></div>
            </div>
        </TimerIndicator>
      );
  }
  
  export default connect(state => {
      return {
          indicatorWidth: state.timer.indicatorWidth,
      };
    }
  )(Indicator);