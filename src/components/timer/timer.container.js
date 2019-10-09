import React, {Component} from "react";
import {connect} from "react-redux";
import Actions from "../../redux/actions";
import {Theme} from "../../api/constants"
import Timer from "./timer.component";

class TimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      seconds: localStorage.getItem('pomodoroDuration') || 1500,
      indicatorWidth: 100,
      counterSkip: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const {setDefaultSetting, i18n} = this.props;
    setDefaultSetting();
    i18n.changeLanguage(localStorage.getItem("language"));
  }

   componentDidUpdate = async (prevProps) => {
    const { title, pomodoroDurations, longBreakDurations, shortBreakDurations } = this.props;
    const { seconds }  = this.state;

    if(title !== prevProps.title) {
      this.handleChangeThemeTimer(title);
    }

    if (seconds === 0) {
      clearInterval(this.interval);
      this.handleCheckCounterSkip();
      this.setState({timerStart: false, indicatorWidth: 100});
    }

    if (title === "pomodoro") {
      if(pomodoroDurations !== prevProps.pomodoroDurations) {
        const difference =  pomodoroDurations - prevProps.pomodoroDurations;
        this.setState({seconds: seconds + difference })
      } 
    } else if(title === "long_break") {
      if(longBreakDurations !== prevProps.longBreakDurations) {
        const difference =  longBreakDurations - prevProps.longBreakDurations;
        this.setState({seconds: seconds + difference })
      }
    } else if (title === "short_break") {
      if(shortBreakDurations !== prevProps.shortBreakDurations) {
        const difference =  shortBreakDurations - prevProps.shortBreakDurations;
        this.setState({seconds: seconds + difference })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { title } = this.props;
    const { seconds } = this.state;
    this.handleIndicatorCalculationWidth(seconds, title);

    this.setState(state => ({
      seconds: state.seconds - 1, 
    }));
  }

  handleTimerStart = () => {
    this.interval = setInterval(() => this.tick(), 1000);
    this.setState({timerStart: true});
  }

  handleTimerReset = () => {
    const {resetTimer, setPomodoroDurations} = this.props;
    clearInterval(this.interval);
    this.setState({timerStart: false, seconds: 1500});
    resetTimer();
    setPomodoroDurations(1500);
    localStorage.setItem('pomodoroDuration', 1500);
  }

  handleTimerPause = () => {
    clearInterval(this.interval);
  }

  handleTimerSkip = async () => {
    this.handleCheckCounterSkip();
  }

  handleCheckCounterSkip = async () => {
    const {
      pomodoroDurations,
      longBreakDurations,
      shortBreakDurations,
      setTimerTitle,
    } = this.props;

    const {counterSkip} = this.state;

    this.setState(() => ({
      counterSkip: this.state.counterSkip + 1
    }));

    if (counterSkip === 8 || counterSkip === 16 ) {
      this.setState({ seconds: longBreakDurations});
      setTimerTitle("long_break")
    } else if (counterSkip % 2 === 0) {
      this.setState({ seconds: shortBreakDurations});
      setTimerTitle("short_break");
    } else {
      this.setState({ seconds: pomodoroDurations});
      setTimerTitle("pomodoro")
    }
  }

  handleIndicatorCalculationWidth = (seconds, title) => {
    const {
      pomodoroDurations, 
      longBreakDurations, 
      shortBreakDurations,
    } = this.props;

    let duration;
    if (title === "pomodoro") {
      duration = pomodoroDurations;
    } else if (title === "long_break") {
      duration = longBreakDurations;
    } else if (title === "short_break") {
      duration = shortBreakDurations;
    }

    const width = ((seconds * 100) / duration);
    this.setState({indicatorWidth: width})
  }

  handleChangeThemeTimer = (title) => {
    let {theme} = this.props;
    const {setThemeTimer} = this.props;

    if(theme === "black") {
      return false;
    }
    let newTheme;
    if(title === "pomodoro") {
      newTheme = Theme.pomodoro;
    } else if( title === "short_break") {
      newTheme = Theme.shoptBreak;
    } else if( title === "long_break") {
      newTheme = Theme.longBreak;
    }

    setThemeTimer(newTheme);
  }

  render() {
    const { title, theme, t } = this.props;
    const { timerStart, seconds, indicatorWidth } = this.state;
    
    return <Timer 
        seconds={seconds}
        title={title}
        theme={theme}
        timerStart={timerStart}
        handleTimerStart={this.handleTimerStart}
        handleTimerReset={this.handleTimerReset}
        handleTimerPause={this.handleTimerPause}
        handleTimerSkip={this.handleTimerSkip}
        indicatorWidth={indicatorWidth}
        t={t}
        />
  }
}

export default connect(
  state => {
    return {
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
    setCounterSkip: Actions.timer.setCounterSkip,
    resetTimer: Actions.timer.resetTimer,
    setTimerTitle: Actions.timer.setTimerTitle,
    setThemeTimer: Actions.timerSetting.setThemeTimer,
    setPomodoroDurations: Actions.timerSetting.setPomodoroDurations,
  }
)(TimerContainer);