import React, {Component} from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import Actions from "../redux/actions";
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";
import {withTranslation} from 'react-i18next';
import Indicator from "./indicator"


const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: palevioletred;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  z-index: 1;
`;
const TimeContainer = styled.div`
  position: fixed;
  top: 150px;
  left: calc(50% - 250px);
  width: 500px;
  height: 300px;
  color: white;
  font-size: 100px;
  font-weight: bold;
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
      theme: "red",
    };
  }

  componentDidMount() {
    const {setDefaultSetting} = this.props;
    setDefaultSetting();

  }

  componentWillUpdate(preProps) {
    const {seconds, setCounterSkip, title} = this.props;
    if (seconds !== preProps.seconds) {
      this.handleIndicatorCalculationWidth(seconds, title);
    }

    if(title !== preProps.title) {
      this.handleChangeThemeTimer(preProps.title);
    }

    if (seconds === 1) {
      clearInterval(this.interval);
      setCounterSkip();
      this.handleCheckCounterSkip();
      this.setState({timerStart: false});
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTimerStart = () => {
    const {tick, title, seconds} = this.props;
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
    const {setCounterSkip} = this.props;
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

    if (counterSkip === 8) {
      setSeconds(longBreakDurations);
      setTimerTitle("long break")
    } else if (counterSkip % 2 === 0) {
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
    if (title === "pomodoro") {
      duration = 1500;
    } else if (title === "long break") {
      duration = 1200;
    } else if (title === "short break") {
      duration = 300;
    }

    const width = (((indicatorWidth * 100) / duration) * 592) / 100;
    setTimerIndicatorWidth(width)
  }

  handleChangeThemeTimer = (title) => {
    const {setThemeTimer} = this.props;
    let theme;

    if(title === "pomodoro") {
      theme = "red"
    } else if( title === "short break") {
      theme = "purple"
    } else if( title === "long break") {
      theme = "green"
    }

    setThemeTimer(theme);

  }

  render() {
    const {seconds, title, t} = this.props;

    return (
      <Card style={{backgroundColor: this.props.theme}}>
        <TimeContainer>
          <Title>{t(title)}</Title>
          <Indicator indicatorWidth={this.state.indicatorWidth}/>
          <Time>
            {Math.floor(seconds / 60) + ': ' + seconds % 60}
          </Time>
          {!this.state.timerStart && <button onClick={() => this.handleTimerStart()}>{t('pause')}</button>}
          {this.state.timerStart && <button onClick={() => this.handleTimerPause()}>pause</button>}
          <button onClick={() => this.handleTimerReset()}>reset</button>
          {this.state.timerStart && <button onClick={() => this.handleTimerSkip()}>skip</button>}
        </TimeContainer>
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
      theme: state.timerSetting.theme,
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
    setThemeTimer: Actions.timerSetting.setThemeTimer,
  }
)(withTranslation()(Timer));