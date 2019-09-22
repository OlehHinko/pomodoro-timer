import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";

const TimerIndicator = styled.div`
    width: 600px;
    margin: 0 auto;
    position: fixed;
    top: 100px;
    left: calc(50% - 300px);
    .layout {
        height: 12px;
        border: 1px solid white;
        .indicator {
            margin: 2px;
            height: 8px;
            background-color: gray;
        }
    }
`;


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