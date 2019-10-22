import React, { useState, useEffect} from "react";
import {connect} from "react-redux";
import Actions from "../../redux/actions";
import {Theme} from "../../api/constants"
import Timer from "./timer.component";
import {usePrevious} from "../../utils"

const TimerContainer = (props) => {
  const [timerStart, toggleTimerStart] = useState(false);
  const [seconds, setSeconds] = useState(localStorage.getItem('pomodoroDuration') || 1500);
  const [indicatorWidth, setIndicatorWidth] = useState(100);
  const [counterSkip, setCounterSkip] = useState(0);
  const [unResetTimer, setUnResetTimer] = useState(true);
  const [workSession, setWorkSession] = useState("1/4");
  const { theme, title, i18n, pomodoroDurations, longBreakDurations, shortBreakDurations  } = props;

  const prevTitle = usePrevious(title);
  const prevPomodoroDurations = usePrevious(pomodoroDurations);
  const prevLongBreakDurations = usePrevious(longBreakDurations);
  const prevShortBreakDurations = usePrevious(shortBreakDurations);
  const prevUnResetTimer = usePrevious(unResetTimer);

  useEffect(() => {
    const {setDefaultSetting} = props;
    let interval;
   
    if (timerStart) {
     interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        handleIndicatorCalculationWidth(seconds, title)
      }, 1000);
    } else if (!timerStart && seconds !== 0) {
      clearInterval(interval);
    }

    if(title !== prevTitle || title === prevTitle ) {
      handleChangeThemeTimer(title);
    }

    if (seconds === 0) {
      handleCheckCounterSkip();
      toggleTimerStart(false);
      setIndicatorWidth(100);
    }

    if (title === "pomodoro" && pomodoroDurations !== prevPomodoroDurations && unResetTimer) {
        const difference =  pomodoroDurations - parseInt(prevPomodoroDurations);
        if(parseInt(seconds) + difference < 0 ){
          handleCheckCounterSkip();
          clearInterval(interval);
          toggleTimerStart(false);
        } else {
          setSeconds(parseInt(seconds) + difference);
        }
    } else if(title === "long_break" && longBreakDurations !== prevLongBreakDurations && unResetTimer ) {
        const difference =  longBreakDurations - parseInt(prevLongBreakDurations);
        if(parseInt(seconds) + difference < 0 ){
          handleCheckCounterSkip();
          clearInterval(interval);
          toggleTimerStart(false);;
        } else {
          setSeconds(parseInt(seconds) + difference );
        }
    } else if (title === "short_break" && shortBreakDurations !== prevShortBreakDurations && unResetTimer) {
        const difference =  shortBreakDurations - parseInt(prevShortBreakDurations);
        if(parseInt(seconds) + difference < 0 ){
          handleCheckCounterSkip();
          clearInterval(interval);
          toggleTimerStart(false);
        } else {
          setSeconds(parseInt(seconds) + difference );
        }
    }

    if(unResetTimer !== prevUnResetTimer) {
      setUnResetTimer(true);
    }

    setDefaultSetting();
    i18n.changeLanguage(localStorage.getItem("language"));
   
    return function cleanup() {
      clearInterval(interval);
    };

  }, [
    title,
    timerStart, 
    seconds, 
    indicatorWidth, 
    i18n, 
    counterSkip, 
    prevTitle, 
    workSession,
    unResetTimer,
    pomodoroDurations,
    longBreakDurations,
    shortBreakDurations, 
    prevPomodoroDurations,
    prevLongBreakDurations,
    prevShortBreakDurations,
    prevUnResetTimer,
    theme,
   ]);

  const handleTimerStart = () => {
    toggleTimerStart(true);
  }

  const handleTimerReset = () => {
    const {resetTimer, setPomodoroDurations} = props;
    toggleTimerStart(false);
    setSeconds(1500);
    setCounterSkip(0);
    setUnResetTimer(false);
    setWorkSession("1/4")
    resetTimer();
    setPomodoroDurations(1500);
    localStorage.setItem('pomodoroDuration', 1500);
  }

  const handleTimerPause = () => {
    toggleTimerStart(false);
  }

  const handleTimerSkip = async () => {
    handleCheckCounterSkip();
  }

  const handleCheckCounterSkip = async () => {
    const {
      pomodoroDurations,
      longBreakDurations,
      shortBreakDurations,
      setTimerTitle,
    } = props;

    if(counterSkip === 7 || counterSkip === 17  || counterSkip === 27 || counterSkip === 37){
      setCounterSkip(counterSkip + 2)
    } else {
      setCounterSkip(counterSkip + 1);
    }
    

    if(counterSkip === 1 || counterSkip === 11 || counterSkip === 21 || counterSkip === 31 ) {
      setWorkSession("2/4");
    } else if ( counterSkip === 3 || counterSkip === 13 || counterSkip === 23 || counterSkip === 33 ) {
      setWorkSession("3/4");
    } else if ( counterSkip === 5 || counterSkip === 15 || counterSkip === 25 || counterSkip === 35 ) {
      setWorkSession("4/4");
    } else if(counterSkip === 9 || counterSkip === 19 || counterSkip === 29 || counterSkip === 39 ) {
      setWorkSession("1/4");
    } 

    if (counterSkip === 7 || counterSkip === 17 || counterSkip === 27 || counterSkip === 37 ) {
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

  const handleIndicatorCalculationWidth = (seconds, title) => {
    const {
      pomodoroDurations, 
      longBreakDurations, 
      shortBreakDurations,
    } = props;

    let duration;
    if (title === "pomodoro") {
      duration = pomodoroDurations;
    } else if (title === "long_break") {
      duration = longBreakDurations;
    } else if (title === "short_break") {
      duration = shortBreakDurations;
    }

    const width = ((seconds * 100) / duration);
    setIndicatorWidth(width);
  }

  const handleChangeThemeTimer = (title) => {
    let {theme} = props;
    const {setThemeTimer} = props;

    if(theme === "black") {
      return false;
    }
    let newTheme;
    if(title === "pomodoro") {
      newTheme = Theme.pomodoro;
    } else if( title === "short_break") {
      newTheme = Theme.shortBreak;
    } else if( title === "long_break") {
      newTheme = Theme.longBreak;
    }

    setThemeTimer(newTheme);
  }

  const { t } = props;
  console.log( seconds);
  return <Timer 
        seconds={seconds}
        title={title}
        theme={theme}
        timerStart={timerStart}
        handleTimerStart={handleTimerStart}
        handleTimerReset={handleTimerReset}
        handleTimerPause={handleTimerPause}
        handleTimerSkip={handleTimerSkip}
        indicatorWidth={indicatorWidth}
        t={t}
        workSession={workSession}
        />
}

export default connect(
  state => {
    return {
      title: state.timer.title,
      pomodoroDurations: state.timerSetting.pomodoroDurations,
      shortBreakDurations: state.timerSetting.shortBreakDurations,
      longBreakDurations: state.timerSetting.longBreakDurations,
      theme: state.timerSetting.theme,
    };
  },
  {
    setDefaultSetting: Actions.timer.setDefaultSetting,
    resetTimer: Actions.timer.resetTimer,
    setTimerTitle: Actions.timer.setTimerTitle,
    setThemeTimer: Actions.timerSetting.setThemeTimer,
    setPomodoroDurations: Actions.timerSetting.setPomodoroDurations,
  }
)(TimerContainer);