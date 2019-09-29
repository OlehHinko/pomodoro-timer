import React, {Component} from "react";
import {connect} from "react-redux";
import Actions from "../../redux/actions";

import {Theme} from "../../api/constants"
import {checkTranslation, getTranslations} from "../translation/i18n"
import Timer from "./timer.component";

class TimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {setDefaultSetting} = this.props;
    setDefaultSetting();
    checkTranslation();
    getTranslations();
  }

  UNSAFE_componentWillUpdate(prevProps) {
    const {
      seconds,
      setCounterSkip,
      title,
      pomodoroDurations,
      shortBreakDurations,
      longBreakDurations,
      setSeconds,
     } = this.props;

    if (seconds !== prevProps.seconds) {
      this.handleIndicatorCalculationWidth(seconds, title);
    }

    if(title !== prevProps.title) {
      this.handleChangeThemeTimer(prevProps.title);
    }

    if (seconds === 1) {
      clearInterval(this.interval);
      setCounterSkip();
      this.handleCheckCounterSkip();
      this.setState({timerStart: false});
    }

   /* if(pomodoroDurations !== prevProps.pomodoroDurations) {
      clearInterval(this.interval);
      this.setState({timerStart: false});
      setSeconds(prevProps.pomodoroDurations);
    } else if(shortBreakDurations !== prevProps.shortBreakDurations) {
      clearInterval(this.interval);
      this.setState({timerStart: false});
      setSeconds(prevProps.shortBreakDurations);
    } if(longBreakDurations !== prevProps.longBreakDurations) {
      clearInterval(this.interval);
      this.setState({timerStart: false});
      setSeconds(prevProps.longBreakDurations);
    }*/
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleTimerStart = () => {
    const {tick} = this.props;
    this.interval = setInterval(() => tick(), 1000);
    this.setState({timerStart: true});
  }

  handleTimerReset = () => {
    const {resetTimer, setPomodoroDurations} = this.props;
    clearInterval(this.interval);
    this.setState({timerStart: false});
    resetTimer();
    localStorage.setItem('pomodoroDuration', 1500);
    setPomodoroDurations(1500);
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

    if (counterSkip === 8 || counterSkip === 16 ) {
      setSeconds(longBreakDurations);
      setTimerTitle("long_break")
    } else if (counterSkip % 2 === 0) {
      setSeconds(shortBreakDurations);
      setTimerTitle("short_break");
    } else {
      setSeconds(pomodoroDurations);
      setTimerTitle("pomodoro")
    }
  }

  handleIndicatorCalculationWidth = (seconds, title) => {
    const {setTimerIndicatorWidth, pomodoroDurations, longBreakDurations, shortBreakDurations,} = this.props;
    let duration;
    if (title === "pomodoro") {
      duration = pomodoroDurations;
    } else if (title === "long_break") {
      duration = longBreakDurations;
    } else if (title === "short_break") {
      duration = shortBreakDurations;
    }

    const width = (((seconds * 100) / duration) * 592) / 100;
    setTimerIndicatorWidth(width)
  }

  handleChangeThemeTimer = (title) => {
    let {theme} = this.props;
    const {setThemeTimer} = this.props;

    if(theme === "black") {
      return false;
    }
    let newTheme;
    if(title === "pomodoro") {
      console.log(Theme.pomodoro);
      newTheme = Theme.pomodoro;
    } else if( title === "short_break") {
      newTheme = Theme.shoptBreak;
    } else if( title === "long_break") {
      newTheme = Theme.longBreak;
    }

    setThemeTimer(newTheme);
  }

  render() {
    const {seconds, title, theme} = this.props;
    const { timerStart } = this.state;

    return <Timer 
        seconds={seconds}
        title={title}
        theme={theme}
        timerStart={timerStart}
        handleTimerStart={this.handleTimerStart}
        handleTimerReset={this.handleTimerReset}
        handleTimerPause={this.handleTimerPause}
        handleTimerSkip={this.handleTimerSkip}
        />
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
    setPomodoroDurations: Actions.timerSetting.setPomodoroDurations,
  }
)(TimerContainer);