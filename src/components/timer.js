import React, {Component} from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import Actions from "../redux/actions";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { withTranslation } from 'react-i18next';
import Indicator from "./indicator"


const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Card = styled.div`
  width: 500px;
  height: 300px;
  position: fixed;
  top: 150px;
  left: calc(50% - 250px);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
`;

const Time = styled.div`
  color: white;
  font-size: 100px;
  font-weight: bold;
`;

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        timerStart: false,
       };
    }
  
    componentDidMount() {
      const { setDefaultSetting } = this.props;
      setDefaultSetting();
      
    }
  
    componentWillUpdate(preProps) {
      const { seconds, setCounterSkip, title } = this.props;
      if(seconds !== preProps.seconds) {
        this.handleIndicatorCalculationWidth(seconds, title);

      }
      if(seconds === 1) {
        clearInterval(this.interval);
        setCounterSkip();
        this.handleCheckCounterSkip();
        this.setState({ timerStart: false });
      }
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    handleTimerStart = () => {
      const {tick, title, seconds } = this.props;
      this.interval = setInterval(() => tick(seconds, title), 1000);
      this.setState({timerStart: true})
    }

    handleTimerReset = () => {
      const {resetTimer} = this.props;
      resetTimer()
    }

    handleTimerPause = () => {
      clearInterval(this.interval);
    }

    handleTimerSkip = () => {
      const { setCounterSkip } = this.props; 
      setCounterSkip();
      this.handleCheckCounterSkip();
    }

    handleCheckCounterSkip = () => {
      const {
        counterSkip, 
        setSeconds, 
        pomodoroDurations, 
        longBreakDurations, 
        shortBreakDurations,
        setTimerTitle,
      } = this.props;

      if ( counterSkip === 8 ) {
        setSeconds(longBreakDurations);
        setTimerTitle("long break")
      } else if (counterSkip % 2 === 0 ) {
        setSeconds(shortBreakDurations);
        setTimerTitle("short break");
      } else {
        setSeconds(pomodoroDurations);
        setTimerTitle("pomodoro")
      }
    }

     handleIndicatorCalculationWidth = (indicatorWidth, title) => {
      const {setTimerIndicatorWidth} = this.props;
      let duration;
      if(title === "pomodoro") {
        duration = 1500;
      } else if (title === "long break") {
        duration = 1200;
      } else if (title === "short break") {
        duration = 300;
      }

      const width = (((indicatorWidth * 100)/duration) * 592) /100;
      setTimerIndicatorWidth(width)
    }

    render() {
      const { seconds, title, t} = this.props;

      return (
        <Card>
            <Title>{t(title)}</Title>
            <Indicator indicatorWidth={this.state.indicatorWidth}/>
            <Time>
                {Math.floor(seconds / 60)  + ': ' + seconds % 60}
            </Time>
            { !this.state.timerStart && <button onClick={() => this.handleTimerStart()}>start</button> }
            { this.state.timerStart && <button onClick={() => this.handleTimerPause()}>pause</button> }
            <button onClick={() => this.handleTimerReset()}>reset</button>
            { this.state.timerStart && <button onClick={() => this.handleTimerSkip()}>skip</button> }
        </Card>
      );
    }
  }
  
  export default connect(
    state => {
      return {
        seconds: state.timer.seconds,
        title: state.timer.title,
        counterSkip: state.timer.counterSkip,
        pomodoroDurations: state.timerSetting.pomodoroDurations,
        shortBreakDurations: state.timerSetting.shortBreakDurations,
        longBreakDurations: state.timerSetting.longBreakDurations,
        indicatorWidth: state.timer.indicatorWidth,
      };
    },
    {
      setDefaultSetting: Actions.timer.setDefaultSetting,
      tick: Actions.tick.tick,
      setSeconds: Actions.timer.setSeconds,
      setCounterSkip: Actions.timer.setCounterSkip,
      resetTimer: Actions.timer.resetTimer,
      setTimerTitle: Actions.timer.setTimerTitle,
      setTimerIndicatorWidth: Actions.timer.setTimerIndicatorWidth,
    }
  )(withTranslation()(Timer));